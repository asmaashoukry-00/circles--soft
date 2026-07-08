// Language System - Clean & Optimized for Images
window.applyLanguage = function(lang) {
    lang = lang || "ar";

    // 1. النصوص
    document.querySelectorAll(".lang-key").forEach(el => {
        if (!el.hasAttribute("data-ar")) {
            el.setAttribute("data-ar", el.innerHTML.trim());
        }
        const text = (lang === "en") ? 
            el.getAttribute("data-en") : 
            el.getAttribute("data-ar");
        if (text) el.innerHTML = text;
    });

    // 2. الصور - نسخة سريعة ومحسنة
    document.querySelectorAll('.lang-image').forEach(img => {
        const targetSrc = (lang === "en") ? 
            img.getAttribute("data-en-src") : 
            img.getAttribute("data-ar-src");

        if (targetSrc && targetSrc !== img.src) {
            // تبديل مباشر + fallback
            img.style.opacity = "0.6";
            img.src = targetSrc;
            
            // إرجاع الشفافية بعد التحميل
            img.onload = () => {
                img.style.opacity = "1";
            };
        }
    });

    // 3. Title
    const titleEl = document.querySelector('title[data-ar][data-en]');
    if (titleEl) {
        document.title = (lang === "en") ? 
            titleEl.getAttribute("data-en") : 
            titleEl.getAttribute("data-ar");
    }

    // 4. الاتجاه
    document.documentElement.lang = lang;
    const dir = (lang === "en") ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.body.setAttribute("dir", dir);

    localStorage.setItem("selectedLang", lang);

    window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { lang: lang } 
    }));
};

// Listener للصور فقط
window.addEventListener('languageChanged', (e) => {
    const lang = e.detail.lang;
    document.querySelectorAll('.lang-image').forEach(img => {
        const targetSrc = (lang === "en") ? 
            img.getAttribute("data-en-src") : 
            img.getAttribute("data-ar-src");

        if (targetSrc && targetSrc !== img.src) {
            img.style.opacity = "0.6";
            img.src = targetSrc;
            img.onload = () => { img.style.opacity = "1"; };
        }
    });
});