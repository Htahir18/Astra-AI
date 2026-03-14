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

    const splashSeen = sessionStorage.getItem("astraSplashSeen");

    if (!splashSeen && splashScreen) {
        sessionStorage.setItem("astraSplashSeen", "true");

        setTimeout(() => {
            splashScreen.classList.add("fade-out");

            setTimeout(() => {
                splashScreen.style.display = "none";
                scrollToBottom();
            }, 1600);
        }, 2200);
    } else {
        if (splashScreen) {
            splashScreen.style.display = "none";
        }
        scrollToBottom();
    }

    if (form && input && typingRow) {
        form.addEventListener("submit", function () {
            const text = input.value.trim();

            if (!text) {
                return;
            }

            typingRow.classList.add("show");
        });
    }
});
