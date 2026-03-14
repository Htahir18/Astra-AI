const chatBox = document.getElementById("chat-box");
const form = document.getElementById("chat-form");
const typingRow = document.getElementById("typing-row");
const input = document.getElementById("question-input");

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

scrollToBottom();

form.addEventListener("submit", function () {
    const text = input.value.trim();

    if (!text) {
        return;
    }

    typingRow.classList.add("show");

    setTimeout(() => {
        scrollToBottom();
    }, 50);
})