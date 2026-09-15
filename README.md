# WEB404 Secure Coding Practices — Assignment 1

**Student:** Tenzin Namgay (Cuney)
**Student ID:** 02230307

## Topic

**CSRF (Cross Site Request Forgery)**

## Folder Structure

```
web404-assignment1/
├── README.md
├── .gitignore
├── practical-6-csrf/
│ ├── README.md
│ ├── server.js
│ └── views/
├── screenshots/
│ └── (8 screenshots documenting the vulnerability, attack, and fix)
└── docs/
└── README.md (full report)

```


## Approach

1. **Vulnerable version** — an account page with an email update form that has no CSRF protection.
2. **Attack demo** — a separate malicious page that silently submits a request to change the victim's email.
3. **Fix** — CSRF tokens added using the csrf-csrf package, verified on every state changing request.
4. **Re-test** — confirmed the same attack now fails, and the legitimate form still works normally.

## Tech Stack

- Node.js + Express
- EJS (templating)
- express-session (login state)
- csrf-csrf (CSRF protection)

