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

    // اتجاه الصفحة
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "en") ? "ltr" : "rtl";
    document.body.setAttribute("dir", (lang === "en") ? "ltr" : "rtl");

    localStorage.setItem("selectedLang", lang);

    // إرسال حدث للعناصر الأخرى
    const event = new CustomEvent('languageChanged', { detail: { lang: lang } });
    window.dispatchEvent(event);
};

// تحديث الصور عند تغيير اللغة
window.addEventListener('languageChanged', (e) => {
    const lang = e.detail.lang;
    document.querySelectorAll('.lang-image').forEach(img => {
        const arSrc = img.getAttribute('data-ar-src');
        const enSrc = img.getAttribute('data-en-src');
        if (arSrc && enSrc) {
            img.src = (lang === 'en') ? enSrc : arSrc;
        }
    });
});

// مراقبة ديناميكية لعنوان الصفحة
const listenToTitleAndLangChanges = () => {
    const titleEl = document.querySelector('title[data-ar][data-en]');
    if (!titleEl) return;

    const currentLang = document.documentElement.lang || localStorage.getItem("selectedLang") || "ar";
    const targetTitle = currentLang === "en" ? titleEl.getAttribute("data-en") : titleEl.getAttribute("data-ar");
    
    if (document.title !== targetTitle && targetTitle) {
        document.title = targetTitle;
    }
};

listenToTitleAndLangChanges();

const titleGlobalObserver = new MutationObserver(listenToTitleAndLangChanges);
titleGlobalObserver.observe(document.documentElement, { 
    attributes: true, 
    attributeFilter: ['lang', 'dir'] 
});

let checksCount = 0;
const titleInterval = setInterval(() => {
    listenToTitleAndLangChanges();
    checksCount++;
    if (checksCount > 6) clearInterval(titleInterval);
}, 500);

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem("selectedLang") || "ar";
    window.applyLanguage(savedLang);
});