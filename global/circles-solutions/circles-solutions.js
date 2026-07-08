// ======================================================================
// ASYNCHRONOUS SOLUTIONS LOADER (OPTIMIZED WITH CACHING)
// ======================================================================
function loadSolutions() {
    const placeholder = document.getElementById('solutions-placeholder');
    if (!placeholder) return;

    // 1. محاولة استرجاع القسم من الكاش (عرض فوري)
    const cachedSolutions = localStorage.getItem('cachedSolutionsHTML');
    
    if (cachedSolutions) {
        placeholder.innerHTML = cachedSolutions;
        // تشغيل التحريك فور ظهور المحتوى من الكاش
        requestAnimationFrame(() => startSVGAnimation());
    }

    // 2. جلب الملف في الخلفية للتأكد من التحديثات
    fetch('/global/circles-solutions/circles-solutions.html')
        .then(res => res.text())
        .then(html => {
            // تحديث الواجهة والكاش فقط في حال تغير المحتوى
            if (cachedSolutions !== html) {
                localStorage.setItem('cachedSolutionsHTML', html);
                placeholder.innerHTML = html;
                
                // تشغيل التحريك بعد التحديث
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => startSVGAnimation());
                });
            }
        })
        .catch(err => console.error("فشل تحميل قسم الحلول الديناميكي:", err));
}

function startSVGAnimation() {
    document.querySelectorAll('.hand-drawn-circle path')
        .forEach(path => {
            path.style.animation = "none";
            path.getBoundingClientRect(); // إجبار المتصفح على إعادة الحساب (Reflow)
            path.style.animation = "drawCircle 5s ease-out infinite";
        });
}

document.addEventListener('DOMContentLoaded', loadSolutions);
