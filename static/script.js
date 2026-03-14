window.addEventListener("load", function () {
    const splash = document.getElementById("splash");
    const chat = document.getElementById("chat");

    if (!splash) return;

    if (sessionStorage.getItem("splashSeen") === "true") {
        splash.style.display = "none";
    } else {
        sessionStorage.setItem("splashSeen", "true");

        setTimeout(function () {
            splash.style.opacity = "0";

            setTimeout(function () {
                splash.style.display = "none";
                if (chat) {
                    chat.scrollTop = chat.scrollHeight;
                }
            }, 1500);
        }, 2000);
    }
});
