// ======================================================================
// INTEGRATED DYNAMIC NAV-SYSTEM & BILINGUAL TOGGLE (OPTIMIZED & FAST)
// ======================================================================

const megaMenuData = {
  finance: {
    titleAr: "المنظومة المالية والمحاسبية",
    titleEn: "Financial & Accounting System",
    links: [
      { url: "/services/finance/accounting/accounting.html", ar: "نظام المحاسبة العامة", en: "General Accounting" },
      { url: "/services/finance/banks/banks.html", ar: "إدارة حسابات البنوك والنقدية", en: "Bank & Treasury Management" },
      { url: "/services/finance/receivable/receivable.html", ar: "إدارة الحسابات المدينة", en: "Accounts Receivable" },
      { url: "/services/finance/payable/payable.html", ar: "إدارة الحسابات الدائنة", en: "Accounts Payable" },
      { url: "/services/finance/fixed-assets/fixed-assets.html", ar: "إدارة الأصول الثابتة", en: "Fixed Assets Management" },
      { url: "/services/finance/projects/projects.html", ar: "إدارة المشاريع", en: "Project Management" }
    ]
  },
  hr: {
    titleAr: "إدارة الموارد البشرية والرواتب",
    titleEn: "HR & Payroll Management",
    links: [
      { url: "/services/hr/payroll/payroll.html", ar: "نظام الرواتب وشؤون الموظفين", en: "Payroll & Employee Affairs" },
      { url: "/services/hr/attendance/attendance.html", ar: "نظام مراقبة الدوام", en: "Attendance System" },
      { url: "/services/hr/self-service/self-service.html", ar: "نظام خدمات الموظفين", en: "Employee Self-Service" },
      { url: "/services/hr/mobile-app/mobile-app.html", ar: "تطبيق الهاتف المحمول", en: "Mobile App" }
    ]
  },
  talent: {
    titleAr: "إدارة المواهب والتطوير",
    titleEn: "Talent & Development",
    links: [
      { url: "/services/talent/development/development.html", ar: "نظام إدارة المواهب", en: "Talent Management" },
      { url: "/services/talent/recruitment/recruitment.html", ar: "نظام التوظيف", en: "Recruitment System" },
      { url: "/services/talent/training/training.html", ar: "نظام التدريب", en: "Training System" },
      { url: "/services/talent/performance/performance.html", ar: "نظام التقييم", en: "Performance Evaluation" }
    ]
  },
  operations: {
    titleAr: "المبيعات والمخزون",
    titleEn: "Sales & Inventory",
    links: [
      { url: "/services/operations/sales/sales.html", ar: "إدارة المبيعات", en: "Sales Management" },
      { url: "/services/operations/purchases/purchases.html", ar: "إدارة المشتريات", en: "Procurement Management" },
      { url: "/services/operations/inventory/inventory.html", ar: "إدارة المستودعات والمخزون", en: "Warehouse & Inventory" }
    ]
  }
};

// دالة تحميل الناف بار الذكية فائقة السرعة والتخزين اللحظي
function loadNavbar() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    const cachedNavbar = localStorage.getItem('cachedNavbarHTML');
    let savedLang = localStorage.getItem("selectedLang") || "ar";

    // إذا كان الكود مخزن مسبقاً، يتم عرضه فوراً
    if (cachedNavbar) {
        placeholder.innerHTML = cachedNavbar;
        initNavbarFeatures(savedLang);
    }

    // بالخلفية يتم جلب أحدث نسخة
    fetch('/navbar/navbar.html')
        .then(res => res.text())
        .then(data => {
            if (cachedNavbar !== data) {
                localStorage.setItem('cachedNavbarHTML', data);
                placeholder.innerHTML = data;
                initNavbarFeatures(savedLang);
            }
        })
        .catch(err => {
            console.warn("تم استخدام النسخة المخزنة للناف بار.");
        });
}

function initNavbarFeatures(lang) {
    window.navbarReady = true;
    window.applyLanguage(lang);        // ✅ تم التعديل
    initGlobalListeners();
}

function initGlobalListeners() {
    // إغلاق القائمة عند الضغط على الـ Overlay
    document.addEventListener('click', function(e) {
        const overlay = document.getElementById('mobileOverlay');
        if (overlay && e.target === overlay) {
            closeMobileMenu();
        }
    });

    // إغلاق القائمة عند Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

function toggleLanguage() {
    const currentLang = localStorage.getItem("selectedLang") || "ar";
    const newLang = currentLang === "ar" ? "en" : "ar";
    window.applyLanguage(newLang);     // ✅ تم التعديل
}

// دالة تغيير اللغة (مفعلة ومرفقة على window)
window.applyLanguage = function(lang) {
    const elements = document.querySelectorAll(".lang-key");
    
    elements.forEach((el) => {
        if (!el.getAttribute("data-ar")) {
            el.setAttribute("data-ar", el.innerHTML.trim());
        }

        if (lang === "en") {
            const enText = el.getAttribute("data-en");
            if (enText) el.innerHTML = enText;
        } else {
            const arText = el.getAttribute("data-ar");
            if (arText) el.innerHTML = arText;
        }
    });

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    document.body.setAttribute("dir", lang === "en" ? "ltr" : "rtl");

    localStorage.setItem("selectedLang", lang);
    
    // تحديث القائمة الجانبية إذا كانت مفتوحة
    const sidebar = document.getElementById('mobileMenuSidebar');
    if (sidebar && sidebar.classList.contains('active-level-2')) {
        const activeModule = sidebar.getAttribute('data-current-module');
        if (activeModule) openSubMenu(activeModule);
    }
    
    if (window.AOS) AOS.refresh();
};

// التحكم بقائمة الموبايل
function toggleMobileMenu() {
    const sidebar = document.getElementById('mobileMenuSidebar');
    const overlay = document.getElementById('mobileOverlay');
    const toggleBtn = document.querySelector('.mobile-toggle .hamburger');
    
    if (!sidebar) return;

    if (sidebar.classList.contains('mobile-open')) {
        closeMobileMenu();
    } else {
        sidebar.classList.add('mobile-open');
        if (overlay) overlay.style.display = 'block';
        if (toggleBtn) toggleBtn.classList.add('active'); 
        navigateToPanel(0); 
    }
}

function closeMobileMenu() {
    const sidebar = document.getElementById('mobileMenuSidebar');
    const overlay = document.getElementById('mobileOverlay');
    const toggleBtn = document.querySelector('.mobile-toggle .hamburger');
    
    if (sidebar) {
        sidebar.classList.remove('mobile-open', 'active-level-1', 'active-level-2');
        sidebar.classList.add('active-level-0');
    }
    if (overlay) overlay.style.display = 'none';
    if (toggleBtn) toggleBtn.classList.remove('active'); 
}

function navigateToPanel(levelIndex) {
    const sidebar = document.getElementById('mobileMenuSidebar');
    if (!sidebar) return;
    sidebar.classList.remove('active-level-0', 'active-level-1', 'active-level-2');
    sidebar.classList.add(`active-level-${levelIndex}`);
}

function openSubMenu(moduleKey) {
    const currentLang = document.documentElement.getAttribute('dir') === 'ltr' ? 'en' : 'ar';
    const targetData = megaMenuData[moduleKey];
    const sidebar = document.getElementById('mobileMenuSidebar');
    
    if (!targetData) return;
    if (sidebar) sidebar.setAttribute('data-current-module', moduleKey);

    const titleContainer = document.getElementById('currentSubMenuTitle');
    if (titleContainer) {
        titleContainer.innerText = currentLang === 'en' ? targetData.titleEn : targetData.titleAr;
    }
    
    const linksContainer = document.getElementById('subSubMenuLinks');
    if (!linksContainer) return;
    linksContainer.innerHTML = '';
    
    targetData.links.forEach(linkItem => {
        const li = document.createElement('li');
        li.className = 'mobile-nav-item';
        const linkText = currentLang === 'en' ? linkItem.en : linkItem.ar;
        
        li.innerHTML = `
          <a href="${linkItem.url}" onclick="closeMobileMenu()">
            <span>${linkText}</span>
          </a>
        `;
        linksContainer.appendChild(li);
    });

    navigateToPanel(2);
}

function startSVGAnimation() {
    document.querySelectorAll('.hand-drawn-circle path')
        .forEach(path => {
            path.style.animation = "none";
            path.getBoundingClientRect(); // force reflow
            path.style.animation = "drawCircle 5s ease-out infinite";
        });
}

document.addEventListener('DOMContentLoaded', loadNavbar);