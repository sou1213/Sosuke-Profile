const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");

function safeGetStorage(key) {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function safeSetStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {
        // The selected theme still applies to the current page when storage is unavailable.
    }
}

function applyTheme(theme) {
    const isDark = theme !== "light";
    body.classList.toggle("dark", isDark);
    themeToggle.textContent = isDark ? "Light" : "Dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "ライトモードへ切り替える" : "ダークモードへ切り替える");
}

applyTheme(safeGetStorage("dark-mode"));

themeToggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
    safeSetStorage("dark-mode", nextTheme);
});
