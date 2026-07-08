window.applyLanguage = function(lang) {
    // 1. Translate normal text elements
    document.querySelectorAll(".lang-key").forEach((el) => {
        if (!el.getAttribute("data-ar")) el.setAttribute("data-ar", el.innerHTML.trim());
        const text = (lang === "en") ? el.getAttribute("data-en") : el.getAttribute("data-ar");
        if (text) el.innerHTML = text;
    });

    // 2. Translate images
    document.querySelectorAll('.lang-image').forEach(img => {
        const arSrc = img.getAttribute('data-ar-src');
        const enSrc = img.getAttribute('data-en-src');
        if (arSrc && enSrc) {
            img.src = (lang === 'en') ? enSrc : arSrc;
        }
    });

    // 3. Translate page title dynamically for all pages
    const pageTitleEl = document.querySelector('title[data-ar][data-en]');
    if (pageTitleEl) {
        document.title = (lang === "en") ? pageTitleEl.getAttribute("data-en") : pageTitleEl.getAttribute("data-ar");
    }

    // 4. Set page direction and language attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "en") ? "ltr" : "rtl";
    document.body.setAttribute("dir", (lang === "en") ? "ltr" : "rtl");
    localStorage.setItem("selectedLang", lang);

    // 5. Dispatch custom language event
    const event = new CustomEvent('languageChanged', { detail: { lang: lang } });
    window.dispatchEvent(event);
};

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

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem("selectedLang") || "ar";
    window.applyLanguage(savedLang);
});

// Dynamic Title Auto-Switcher for all pages
const listenToTitleAndLangChanges = () => {
    const titleEl = document.querySelector('title[data-ar][data-en]');
    if (!titleEl) return;

    // Get current active language from DOM or LocalStorage
    const currentLang = document.documentElement.lang || localStorage.getItem("selectedLang") || "ar";
    const targetTitle = currentLang === "en" ? titleEl.getAttribute("data-en") : titleEl.getAttribute("data-ar");
    
    // Only update if the title is actually different to prevent infinite loops
    if (document.title !== targetTitle && targetTitle) {
        document.title = targetTitle;
    }
};

// Run immediately on script load
listenToTitleAndLangChanges();

// Watch for any background script modifying the <html> tag or localStorage
const titleGlobalObserver = new MutationObserver(() => listenToTitleAndLangChanges());
titleGlobalObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

// Check every 500ms for the first 3 seconds to catch delayed navbar/footer loads
let checksCount = 0;
const titleInterval = setInterval(() => {
    listenToTitleAndLangChanges();
    checksCount++;
    if (checksCount > 6) clearInterval(titleInterval);
}, 500);