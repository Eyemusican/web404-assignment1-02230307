# WEB404 Secure Coding Practices — Assignment 1

**Student:** Tenzin Namgay (Cuney)
**Student ID:** 02230307

## Practicals

| # | Practical | Status |
|---|-----------|--------|
| 1 | Nikto Scan | Not started |
| 2 | Command Injection | Not started |
| 5 | SQL Injection | Not started |
| 6 | CSRF | Not started |

## Folder Structure

```
web404-assignment1/
├── README.md
├── .gitignore
├── practical-1-nikto-scan/
│   └── README.md
├── practical-2-command-injection/
│   └── README.md
├── practical-5-sql-injection/
│   └── README.md
├── practical-6-csrf/
│   └── README.md
├── screenshots/
│   └── README.md
└── docs/
    └── README.md
```

## Approach

Each practical follows the same structure:

1. **Vulnerable version** — a small app or endpoint that deliberately contains the vulnerability being studied.
2. **Attack demo** — a walkthrough showing the vulnerability being exploited.
3. **Fix** — the code changed to remediate the vulnerability, following secure coding best practices.
4. **Re-test** — confirmation that the attack no longer works against the fixed version.

## Tech Stack

- Node.js + Express
- SQLite
