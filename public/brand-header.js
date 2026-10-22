/**
 * KIRIMA RISE — Custom Brand Header Controller
 * Handles mobile hamburger toggle and mobile accordion dropdowns.
 */
document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('kr-site-header');
    if (!header) return;

    const toggleBtn = header.querySelector('.kr-mobile-toggle');
    const drawer = header.querySelector('#kr-mobile-drawer');

    if (toggleBtn && drawer) {
        toggleBtn.addEventListener('click', function () {
            const isOpen = header.classList.toggle('kr-mobile-menu-active');
            toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('kr-nav-overflow-locked', isOpen);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (header.classList.contains('kr-mobile-menu-active') && !header.contains(e.target)) {
                header.classList.remove('kr-mobile-menu-active');
                toggleBtn.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('kr-nav-overflow-locked');
            }
        });

        // Close drawer when clicking a direct nav link (excluding accordion buttons)
        drawer.querySelectorAll('a:not(.kr-mobile-sub-toggle a)').forEach(function (link) {
            link.addEventListener('click', function () {
                header.classList.remove('kr-mobile-menu-active');
                toggleBtn.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('kr-nav-overflow-locked');
            } );
        });
    }

    // Mobile submenu toggle
    const mobileSubBtns = header.querySelectorAll('.kr-mobile-sub-btn');
    mobileSubBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const parentLi = btn.closest('.kr-mobile-has-sub');
            if (parentLi) {
                parentLi.classList.toggle('kr-sub-expanded');
            }
        });
    });
});
