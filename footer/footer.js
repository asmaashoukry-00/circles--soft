function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    // 1. محاولة استرجاع الفوتر من الكاش (عرض فوري)
    const cachedFooter = localStorage.getItem('cachedFooterHTML');
    let savedLang = localStorage.getItem("selectedLang") || "en";

    if (cachedFooter) {
        placeholder.innerHTML = cachedFooter;
        // تطبيق اللغة فوراً على النسخة المحملة من الكاش
        if (typeof window.applyLanguage === "function") {
            window.applyLanguage(savedLang);
        }
    }

    // 2. جلب الملف في الخلفية لتحديث الكاش
    fetch('/footer/footer.html')
        .then(res => res.text())
        .then(data => {
            // تحديث الكاش والواجهة فقط إذا كان هناك تغيير في الملف
            if (cachedFooter !== data) {
                localStorage.setItem('cachedFooterHTML', data);
                placeholder.innerHTML = data;
                // تطبيق اللغة بعد التحديث
                if (typeof window.applyLanguage === "function") {
                    window.applyLanguage(savedLang);
                }
            }
        })
        .catch(err => console.warn("ملاحظة: فشل جلب تحديثات الفوتر، تم استخدام النسخة المحفوظة."));
}

// تنفيذ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadFooter);