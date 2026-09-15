const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Hardcoded single test user (no real auth — just enough to simulate a logged-in session)
const TEST_USER = { username: 'testuser', password: 'password123' };

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'csrf-demo-secret', // fine for a local demo, not production
    resave: false,
    saveUninitialized: false,
  })
);

// Home page — shows whether a user is "logged in" via session
app.get('/', (req, res) => {
  res.render('home', { user: req.session.user });
});

// Login form
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Handle login against the hardcoded test user
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === TEST_USER.username && password === TEST_USER.password) {
    req.session.user = username;
    return res.redirect('/');
  }

  res.render('login', { error: 'Invalid username or password' });
});

// Logout — clears the session
app.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

app.listen(PORT, () => {
  console.log(`csrf-demo listening at http://localhost:${PORT}`);
});
