from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
from dotenv import load_dotenv
import os
import re

load_dotenv()

app = Flask(__name__)
CORS(app, origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(","))

# Flask-Mail configuration
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.getenv("MAIL_USERNAME")

mail = Mail(app)

OWNER_EMAIL = os.getenv("OWNER_EMAIL", os.getenv("MAIL_USERNAME"))


def is_valid_email(email: str) -> bool:
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return re.match(pattern, email) is not None


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/api/contact", methods=["POST"])
def contact():
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
        mail.send(owner_msg)

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
    app.run(host="0.0.0.0", port=5000, debug=debug)
