from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os
import re

load_dotenv()

app = Flask(__name__)
CORS(app, origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(","))



OWNER_EMAIL = os.getenv("OWNER_EMAIL")
RESEND_API_KEY = os.getenv("RESEND_API_KEY")


def is_valid_email(email: str) -> bool:
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return re.match(pattern, email) is not None


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

@app.route("/api/test")
def test():
    return {
        "mail_user": bool(os.getenv("MAIL_USERNAME")),
        "mail_pass": bool(os.getenv("MAIL_PASSWORD")),
        "owner": OWNER_EMAIL
    }

def send_email(to_email, subject, html_content):
    response = requests.post(
        "https://api.resend.com/emails",
        headers={
            "Authorization": f"Bearer {RESEND_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "from": "Portfolio Contact <onboarding@resend.dev>",
            "to": [to_email],
            "subject": subject,
            "html": html_content,
        },
        timeout=20,
    )

    response.raise_for_status()

@app.route("/api/contact", methods=["POST"])
def contact():
    #temporary logging for debugging
    app.logger.info(f"MAIL_USERNAME: {os.getenv('MAIL_USERNAME')}")
    app.logger.info(f"OWNER_EMAIL: {OWNER_EMAIL}")

    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    subject = str(data.get("subject", "")).strip()
    message = str(data.get("message", "")).strip()

    # Validation
    errors = {}
    if not name:
        errors["name"] = "Name is required"
    if not email:
        errors["email"] = "Email is required"
    elif not is_valid_email(email):
        errors["email"] = "Invalid email address"
    if not subject:
        errors["subject"] = "Subject is required"
    if not message:
        errors["message"] = "Message is required"
    elif len(message) < 20:
        errors["message"] = "Message must be at least 20 characters"

    if errors:
        return jsonify({"errors": errors}), 422

    try:
        # Email to owner
        owner_msg = Message(
            subject=f"Portfolio Contact: {subject}",
            recipients=[OWNER_EMAIL],
            body=f"""New message from your portfolio website:

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}
""",
        )
        app.logger.info("About to send owner email")
        mail.send(owner_msg)
        app.logger.info("Owner email sent")

        # Confirmation email to sender
        confirm_msg = Message(
            subject="Got your message — Akhil Girish",
            recipients=[email],
            body=f"""Hi {name},

Thanks for reaching out! I've received your message and will get back to you as soon as possible.

Here's a copy of what you sent:

Subject: {subject}
Message: {message}

Best,
Akhil Girish
{os.getenv("MAIL_USERNAME")}
""",
        )
        mail.send(confirm_msg)

        return jsonify({"message": "Email sent successfully"}), 200

    except Exception as e:
        app.logger.error(f"Email send error: {e}")
        return jsonify({"error": "Failed to send email. Please try again later."}), 500


if __name__ == "__main__":
    debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=debug)
