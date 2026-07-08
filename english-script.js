// تطبيق اللغة فوراً قبل أي شيء
(function() {
    const savedLang = localStorage.getItem("selectedLang") !== null ? 
                      localStorage.getItem("selectedLang") : "ar";
    
    window.currentLang = savedLang;
    applyLanguageImmediately(savedLang);
})();

function applyLanguageImmediately(lang) {
    lang = lang || "ar";

    // النصوص
    document.querySelectorAll(".lang-key").forEach((el) => {
        if (!el.hasAttribute("data-ar")) {
            el.setAttribute("data-ar", el.innerHTML.trim());
        }
        const text = (lang === "en") ? el.getAttribute("data-en") : el.getAttribute("data-ar");
        if (text) el.innerHTML = text;
    });

    // الصور مع preload
    document.querySelectorAll('.lang-image').forEach(img => {
        const targetSrc = (lang === 'en') ? img.getAttribute('data-en-src') : img.getAttribute('data-ar-src');
        if (targetSrc && targetSrc !== img.src) {
            const temp = new Image();
            temp.onload = () => { img.src = targetSrc; };
            temp.src = targetSrc;
        }
    });

    // Title
    const titleEl = document.querySelector('title[data-ar][data-en]');
    if (titleEl) {
        document.title = (lang === "en") ? titleEl.getAttribute("data-en") : titleEl.getAttribute("data-ar");
    }

    // الاتجاه
    document.documentElement.lang = lang;
    const dir = (lang === "en") ? "ltr" : "rtl";
    document.documentElement.dir = dir;
    document.body.dir = dir;

    localStorage.setItem("selectedLang", lang);
}

// الدالة العامة لتغيير اللغة (عند الضغط على الزر)
window.applyLanguage = function(lang) {
    window.currentLang = lang;
    applyLanguageImmediately(lang);
};

// تحديث الصور فقط عند تغيير اللغة
window.addEventListener('languageChanged', (e) => {
    const lang = e.detail.lang;
    document.querySelectorAll('.lang-image').forEach(img => {
        const targetSrc = (lang === 'en') ? img.getAttribute('data-en-src') : img.getAttribute('data-ar-src');
        if (targetSrc && targetSrc !== img.src) {
            const temp = new Image();
            temp.onload = () => { img.src = targetSrc; };
            temp.src = targetSrc;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem("selectedLang") !== null ? 
                      localStorage.getItem("selectedLang") : "ar";
    window.applyLanguage(savedLang);
});