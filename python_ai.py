from flask import Flask, render_template, request, redirect, url_for
from openai import OpenAI
from dotenv import load_dotenv
import os
import re

load_dotenv()

app = Flask(__name__)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
chat_history = []


def format_basic_markdown(text: str) -> str:
    """
    Very simple markdown-to-HTML formatter for:
    - **bold**
    - *italic*
    - `inline code`
    - line breaks
    - bullet lines starting with - or *
    """
    if not text:
        return ""

    # Escape HTML first
    text = (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )

    # Inline code
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)

    # Bold
    text = re.sub(r"\*\*(.*?)\*\*", r"<strong>\1</strong>", text)

    # Italic
    text = re.sub(r"\*(.*?)\*", r"<em>\1</em>", text)

    lines = text.split("\n")
    result = []
    in_list = False

    for line in lines:
        stripped = line.strip()

        if stripped.startswith("- ") or stripped.startswith("* "):
            if not in_list:
                result.append("<ul>")
                in_list = True
            item = stripped[2:].strip()
            result.append(f"<li>{item}</li>")
        else:
            if in_list:
                result.append("</ul>")
                in_list = False

            if stripped == "":
                result.append("<br>")
            else:
                result.append(f"<p>{line}</p>")

    if in_list:
        result.append("</ul>")

    return "".join(result)


@app.route("/", methods=["GET", "POST"])
def home():
    global chat_history

    if request.method == "POST":
        question = request.form.get("question", "").strip()

        if question:
            chat_history.append({
                "role": "user",
                "content": question
            })

            try:
                response = client.responses.create(
                    model="gpt-4o-mini",
                    tools=[{"type": "web_search"}],
                    input=[
                        {
                            "role": "system",
                            "content": (
                                "You are Astra AI. Your name is Astra AI. "
                                "You were created by Hooriya Muhammad Tahir on 14 March 2026. "
                                "If anyone asks about your name, creator, or origin, say that "
                                "you are Astra AI created by Hooriya Muhammad Tahir on 14 March 2026. "
                                "Format answers clearly using markdown when useful. "
                                "Use short paragraphs and bullet points when helpful."
                            )
                        },
                        {
                            "role": "user",
                            "content": question
                        }
                    ]
                )

                answer = response.output_text.strip()

            except Exception as e:
                answer = f"Error: {str(e)}"

            chat_history.append({
                "role": "assistant",
                "content": answer,
                "html": format_basic_markdown(answer)
            })

        return redirect(url_for("home"))

    # make sure older assistant messages also get html
    prepared_messages = []
    for message in chat_history:
        msg = dict(message)
        if msg["role"] == "assistant":
            msg["html"] = format_basic_markdown(msg.get("content", ""))
        prepared_messages.append(msg)

    return render_template("index.html", messages=prepared_messages)


@app.route("/clear", methods=["POST"])
def clear_chat():
    global chat_history
    chat_history = []
    return redirect(url_for("home"))


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)