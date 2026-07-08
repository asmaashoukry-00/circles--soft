function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    const cachedFooter = localStorage.getItem('cachedFooterHTML');
    let savedLang = localStorage.getItem("selectedLang");

    if (!savedLang) {
        savedLang = "ar";
        localStorage.setItem("selectedLang", "ar");
    }

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
        .catch(() => console.warn("تم استخدام النسخة المخزنة للفوتر."));
}

document.addEventListener('DOMContentLoaded', loadFooter);