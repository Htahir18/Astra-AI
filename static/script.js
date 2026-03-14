window.addEventListener("load", () => {
    const splashScreen = document.getElementById("splash-screen");
    const mainApp = document.getElementById("main-app");
    const chatBox = document.getElementById("chat-box");
    const form = document.getElementById("chat-form");
    const typingRow = document.getElementById("typing-row");
    const input = document.getElementById("question-input");

    function scrollToBottom() {
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    if (splashScreen && mainApp) {
        setTimeout(() => {
            splashScreen.classList.add("fade-out");
            mainApp.classList.remove("hidden-app");
            mainApp.classList.add("show-app");

            setTimeout(() => {
                splashScreen.style.display = "none";
                scrollToBottom();
            }, 1600);
        }, 2200);
    }

    if (form && input && typingRow) {
        form.addEventListener("submit", function () {
            const text = input.value.trim();

            if (!text) {
                return;
            }

            typingRow.classList.add("show");

            setTimeout(() => {
                scrollToBottom();
            }, 50);
        });
    }
});
