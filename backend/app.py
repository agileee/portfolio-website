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
        "resend_key_exists": bool(RESEND_API_KEY),
        "resend_key_prefix": RESEND_API_KEY[:3] if RESEND_API_KEY else None
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
        send_email(
            OWNER_EMAIL,
            f"Portfolio Contact: {subject}",
            f"""
            <h2>New Portfolio Message</h2>

            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Subject:</strong> {subject}</p>

            <hr>

            <p>{message}</p>
            """
        )

        send_email(
            email,
            "Got your message — Akhil Girish",
            f"""
            <h2>Thanks for reaching out, {name}!</h2>

            <p>I received your message and will get back to you soon.</p>

            <p><strong>Subject:</strong> {subject}</p>

            <p>{message}</p>

            <br>

            <p>Best regards,<br>Akhil Girish</p>
            """
        )

        return jsonify({
            "message": "Email sent successfully"
        }), 200

    except Exception as e:
        app.logger.error(f"Email send error: {str(e)}")
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=debug)
