# Akhil Girish — Personal Portfolio

A production-ready personal portfolio website built with React (Vite) + Tailwind CSS + Framer Motion on the frontend, and Python Flask on the backend for contact form email delivery.

---

## Features

- Premium dark theme with subtle lime accent
- Smooth scroll-triggered animations via Framer Motion
- Fully responsive (mobile → ultra-wide)
- Sections: Hero, About, Skills, Experience, Projects, Education, Certifications, Achievements, Contact
- Contact form with validation, loading state, success/error feedback
- Flask backend sends email via Gmail SMTP using Flask-Mail
- Clean, accessible semantic HTML with keyboard navigation support

---

## Folder Structure

```
portfolio-website/
├── frontend/
│   ├── src/
│   │   ├── components/     # All section components + Navbar + Footer
│   │   ├── data/           # Portfolio content (portfolio.js)
│   │   ├── hooks/          # useScrollAnimation hook
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

---

## Environment Variables

### `backend/.env`

| Variable          | Description                                      |
|-------------------|--------------------------------------------------|
| `MAIL_USERNAME`   | Your Gmail address                               |
| `MAIL_PASSWORD`   | Gmail App Password (not your account password)   |
| `OWNER_EMAIL`     | Where contact form emails are delivered          |
| `ALLOWED_ORIGINS` | Comma-separated frontend URLs (CORS)             |
| `FLASK_DEBUG`     | Set to `true` for development                    |

### `frontend/.env.local`

| Variable       | Description                |
|----------------|----------------------------|
| `VITE_API_URL` | Backend URL (default: `http://localhost:5000`) |

---

## Configuring Gmail SMTP

1. Go to your Google Account → Security → 2-Step Verification → **App passwords**
2. Generate a new app password for "Mail"
3. Copy it into `MAIL_PASSWORD` in your `.env` file
4. Set `MAIL_USERNAME` to your Gmail address

> Never use your actual Gmail password. Always use an App Password.

---

## Running Locally

**Terminal 1 — Backend:**
```bash
cd backend
source venv/bin/activate
python app.py
```
Backend runs at `http://localhost:5000`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs at `http://localhost:5173`

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, Vite, Tailwind CSS v3     |
| Animations | Framer Motion                     |
| Icons    | Lucide React                        |
| Backend  | Python Flask, Flask-Mail, Flask-CORS|
| Email    | Gmail SMTP via App Password         |
