window.applyLanguage = function(lang) {
    // النصوص
    document.querySelectorAll(".lang-key").forEach((el) => {
        if (!el.getAttribute("data-ar")) {
            el.setAttribute("data-ar", el.innerHTML.trim());
        }
        const text = (lang === "en") ? el.getAttribute("data-en") : el.getAttribute("data-ar");
        if (text) el.innerHTML = text;
    });

    // الصور
    document.querySelectorAll('.lang-image').forEach(img => {
        const arSrc = img.getAttribute('data-ar-src');
        const enSrc = img.getAttribute('data-en-src');
        if (arSrc && enSrc) {
            img.src = (lang === 'en') ? enSrc : arSrc;
        }
    });

    // عنوان الصفحة
    const pageTitleEl = document.querySelector('title[data-ar][data-en]');
    if (pageTitleEl) {
        document.title = (lang === "en") ? pageTitleEl.getAttribute("data-en") : pageTitleEl.getAttribute("data-ar");
    }

    // اتجاه الصفحة + حفظ
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "en") ? "ltr" : "rtl";
    document.body.setAttribute("dir", (lang === "en") ? "ltr" : "rtl");
    
    localStorage.setItem("selectedLang", lang);

    const event = new CustomEvent('languageChanged', { detail: { lang: lang } });
    window.dispatchEvent(event);
};

// مراقبة عنوان الصفحة
const updateTitle = () => {
    const titleEl = document.querySelector('title[data-ar][data-en]');
    if (titleEl) {
        const lang = document.documentElement.lang || "ar";
        document.title = lang === "en" ? titleEl.getAttribute("data-en") : titleEl.getAttribute("data-ar");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 🔥 فرض العربية دائمًا في البداية
    let savedLang = localStorage.getItem("selectedLang");
    
    if (!savedLang || savedLang === "en") {
        savedLang = "ar";
        localStorage.setItem("selectedLang", "ar");
    }

    window.applyLanguage(savedLang);
    
    // تحديث إضافي بعد تحميل الناف بار والفوتر
    setTimeout(() => window.applyLanguage(savedLang), 300);
    setTimeout(() => window.applyLanguage(savedLang), 800);
});