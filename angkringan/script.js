document.addEventListener('DOMContentLoaded', () => {

    // Initialize AOS Animation Library
    AOS.init({
        once: true,
        offset: 100,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // Header Scroll Effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu nav a');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMobileMenu && mobileMenu) {
        closeMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Reservation Modal Logic
    const modal = document.getElementById("reservationModal");
    const btn = document.getElementById("openReservation");
    const span = document.getElementsByClassName("close-modal")[0];
    const form = document.getElementById("reservationForm");

    if (btn && modal && span) {
        btn.onclick = function () {
            modal.style.display = "block";
        }
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = "Mengirim...";
            submitBtn.disabled = true;

            setTimeout(() => {
                alert("Reservasi Berhasil! Kami menantikan kehadiran Anda.");
                modal.style.display = "none";
                form.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Parallax Effect (Vanilla JS)
    const parallaxBg = document.querySelector('.hero-bg-parallax');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            parallaxBg.style.transform = `translateY(${scrollY * 0.3}px)`;
        });
    }

    // Cart / Button Interactions
    const cartCount = document.querySelector('.cart-count');
    const addButtons = document.querySelectorAll('.btn-add-cart, .btn-icon');
    let count = 0;

    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Visual feedback
            const isTextBtn = btn.classList.contains('btn-add-cart');
            const originalContent = btn.innerHTML;

            if (isTextBtn) {
                btn.innerHTML = "Ditambahkan! <i class='ri-check-line'></i>";
                btn.style.background = "#1A1A1A";
                btn.style.color = "#FFF";
            } else {
                btn.style.transform = "scale(1.2) rotate(10deg)";
                btn.style.background = "#1A1A1A";
                btn.style.color = "#FFF";
            }

            // Update Counter
            count++;
            cartCount.innerText = count;

            // Cart bounce
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.style.animation = "none";
            cartIcon.offsetHeight; // reflow
            cartIcon.style.animation = "bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

            // Reset button
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = "";
                btn.style.color = "";
                btn.style.transform = "";
            }, 1500);
        });
    });

    // Schedule Item Active State Toggle
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach(item => {
        item.addEventListener('click', () => {
            scheduleItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Cart Page Logic
    const qtyBtns = document.querySelectorAll('.qty-btn');
    qtyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('.qty-input');
            let val = parseInt(input.value);
            if (btn.classList.contains('plus')) {
                val++;
            } else {
                if (val > 1) val--;
            }
            input.value = val;
        });
    });

    const removeBtns = document.querySelectorAll('.btn-remove');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            row.style.opacity = '0';
            setTimeout(() => {
                row.remove();
            }, 300);
        });
    });
});

// CSS Animation Injection for cart bounce if not in CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes bounce {
    0% { transform: scale(1); }
    50% { transform: scale(1.4); }
    100% { transform: scale(1); }
}
`;
document.head.appendChild(styleSheet);
