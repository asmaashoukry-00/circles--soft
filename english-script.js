// Language System - Clean & Simple
window.applyLanguage = function(lang) {
    lang = lang || "ar";

    // Translate text elements
    document.querySelectorAll(".lang-key").forEach(el => {
        if (!el.hasAttribute("data-ar")) {
            el.setAttribute("data-ar", el.innerHTML.trim());
        }
        const text = (lang === "en") ? 
            el.getAttribute("data-en") : 
            el.getAttribute("data-ar");
        if (text) el.innerHTML = text;
    });

    // Translate images
    document.querySelectorAll('.lang-image').forEach(img => {
        const targetSrc = (lang === "en") ? 
            img.getAttribute("data-en-src") : 
            img.getAttribute("data-ar-src");
        
        if (targetSrc && targetSrc !== img.src) {
            const preload = new Image();
            preload.onload = () => { img.src = targetSrc; };
            preload.src = targetSrc;
        }
    });

    // Page title
    const titleEl = document.querySelector('title[data-ar][data-en]');
    if (titleEl) {
        document.title = (lang === "en") ? 
            titleEl.getAttribute("data-en") : 
            titleEl.getAttribute("data-ar");
    }

    // Direction & Language
    document.documentElement.lang = lang;
    const dir = (lang === "en") ? "ltr" : "rtl";
    document.documentElement.dir = dir;
    document.body.setAttribute("dir", dir);

    // Save preference
    localStorage.setItem("selectedLang", lang);

    // Dispatch event
    window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { lang: lang } 
    }));
};

// Listen to language changes (for dynamic components)
window.addEventListener('languageChanged', (e) => {
    const lang = e.detail.lang;
    document.querySelectorAll('.lang-image').forEach(img => {
        const targetSrc = (lang === "en") ? 
            img.getAttribute("data-en-src") : 
            img.getAttribute("data-ar-src");
        
        if (targetSrc && targetSrc !== img.src) {
            const preload = new Image();
            preload.onload = () => { img.src = targetSrc; };
            preload.src = targetSrc;
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem("selectedLang") !== null ? 
                      localStorage.getItem("selectedLang") : "ar";
    window.applyLanguage(savedLang);
});