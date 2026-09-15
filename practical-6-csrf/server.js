const express = require("express");
const session = require("express-session");
const { doubleCsrf } = require("csrf-csrf");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

// Hardcoded single test user (no real auth — just enough to simulate a logged-in session)
const TEST_USER = {
  username: "testuser",
  password: "password123",
  email: "testuser@example.com",
};

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "csrf-demo-secret", // fine for a local demo, not production
    resave: false,
    saveUninitialized: false,
  }),
);

const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => "csrf-demo-secret",
  getSessionIdentifier: (req) => req.session.id,
  cookieName: "csrf-token",
  getCsrfTokenFromRequest: (req) => req.body.csrf_csrf,
});

// Home page — shows whether a user is "logged in" via session
app.get("/", (req, res) => {
  res.render("home", { user: req.session.user });
});

// Login form
app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// Handle login against the hardcoded test user
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === TEST_USER.username && password === TEST_USER.password) {
    req.session.user = username;
    req.session.email = TEST_USER.email;
    return res.redirect("/");
  }

  res.render("login", { error: "Invalid username or password" });
});

// Logout — clears the session
app.post("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

// FIXED: CSRF token generated here, required on submit
app.get("/account", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  const csrfToken = generateCsrfToken(req, res);
  res.render("account", { email: req.session.email, csrfToken });
});

app.post("/update-email", doubleCsrfProtection, (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  req.session.email = req.body.email;
  res.redirect("/account");
});


// Handle CSRF errors gracefully instead of crashing the server
app.use((err, req, res, next) => {
  if (err.code === 'ERR_BAD_CSRF_TOKEN' || err.message === 'invalid csrf token') {
    return res.status(403).send('Forbidden: invalid or missing CSRF token. This request was blocked.');
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`csrf-demo listening at http://localhost:${PORT}`);
});
