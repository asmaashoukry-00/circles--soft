function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    const savedLang = localStorage.getItem("selectedLang") !== null ?
                      localStorage.getItem("selectedLang") : "ar";

    const cachedFooter = localStorage.getItem('cachedFooterHTML');
    if (cachedFooter) {
        placeholder.innerHTML = cachedFooter;
        if (typeof window.applyLanguage === "function") {
            window.applyLanguage(savedLang);
        }
    }

    fetch('/footer/footer.html')
        .then(res => res.text())
        .then(data => {
            if (cachedFooter !== data) {
                localStorage.setItem('cachedFooterHTML', data);
                placeholder.innerHTML = data;
                if (typeof window.applyLanguage === "function") {
                    window.applyLanguage(savedLang);
                }
            }
        })
        .catch(err => {
            console.warn("Failed to fetch footer update.");
        });
}

document.addEventListener('DOMContentLoaded', loadFooter);