// Bytelt Engine & Ambient Aurora Mesh Canvas
document.addEventListener('DOMContentLoaded', () => {

    // 1. Toast Notification Handler
    window.showToast = function(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // 2. Copy To Clipboard
    window.copyToClipboard = function(text, label) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`Copied ${label} to clipboard!`);
        });
    };

    // 3. Mobile Navigation Drawer Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const menuIcon = document.getElementById('menu-icon');

    if (menuBtn && mobileDrawer) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileDrawer.classList.contains('hidden');
            if (isHidden) {
                mobileDrawer.classList.remove('hidden');
                menuIcon.className = 'fa-solid fa-xmark text-xl';
            } else {
                mobileDrawer.classList.add('hidden');
                menuIcon.className = 'fa-solid fa-bars text-xl';
            }
        });
    }

    // 4. Smooth Scrolling Logic
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
                        mobileDrawer.classList.add('hidden');
                        if (menuIcon) menuIcon.className = 'fa-solid fa-bars text-xl';
                    }
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // 5. Scroll Reveal Intersection Handler
    const revealElements = document.querySelectorAll('.reveal');
    const handleScrollReveal = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 70) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', handleScrollReveal);
    handleScrollReveal();

    // 6. Animated Ambient Aurora Canvas Background
    const canvas = document.getElementById('live-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        let step = 0;

        function animateAurora() {
            step += 0.003;
            ctx.clearRect(0, 0, width, height);

            // Layer 1: Indigo Glowing Radial Gradient
            const g1 = ctx.createRadialGradient(
                width * 0.2 + Math.sin(step) * 100, 
                height * 0.3 + Math.cos(step * 0.8) * 80, 
                20, 
                width * 0.2, 
                height * 0.3, 
                450
            );
            g1.addColorStop(0, 'rgba(99, 102, 241, 0.18)');
            g1.addColorStop(1, 'rgba(4, 7, 15, 0)');
            ctx.fillStyle = g1;
            ctx.fillRect(0, 0, width, height);

            // Layer 2: Purple Glowing Radial Gradient
            const g2 = ctx.createRadialGradient(
                width * 0.8 + Math.cos(step * 0.7) * 120, 
                height * 0.7 + Math.sin(step * 0.9) * 100, 
                30, 
                width * 0.8, 
                height * 0.7, 
                500
            );
            g2.addColorStop(0, 'rgba(168, 85, 247, 0.15)');
            g2.addColorStop(1, 'rgba(4, 7, 15, 0)');
            ctx.fillStyle = g2;
            ctx.fillRect(0, 0, width, height);

            // Layer 3: Grid Dots Pattern
            const gridSize = 60;
            for (let x = 0; x < width; x += gridSize) {
                for (let y = 0; y < height; y += gridSize) {
                    const dist = Math.sin(x * 0.005 + step) + Math.cos(y * 0.005 + step);
                    ctx.fillStyle = `rgba(129, 140, 248, ${0.03 + dist * 0.02})`;
                    ctx.fillRect(x, y, 2, 2);
                }
            }

            requestAnimationFrame(animateAurora);
        }

        animateAurora();
    }
});
