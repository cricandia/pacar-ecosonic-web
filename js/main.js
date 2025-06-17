// Lógica JavaScript para PaCar EcoSonic
// Enfocada en menú móvil y animaciones de scroll.
console.log("main.js: Cargado para Entrega 3");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente cargado y parseado.");

    // --- Lógica del Menú Móvil ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');

            if (isHidden) { 
                void mobileMenu.offsetWidth; 
                mobileMenu.classList.remove('-translate-y-full');
                mobileMenu.classList.add('translate-y-0');
                mobileMenuButton.setAttribute('aria-expanded', 'true');
            } else { 
                mobileMenu.classList.remove('translate-y-0');
                mobileMenu.classList.add('-translate-y-full');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.addEventListener('transitionend', () => {
                    if (mobileMenu.classList.contains('-translate-y-full')) { 
                        mobileMenu.classList.add('hidden');
                    }
                }, { once: true });
            }
        });
    }

    // --- Lógica para Animaciones de Scroll (Fade-in) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { 
        threshold: 0.1 
    });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        if (section) {
            observer.observe(section);
        }
    });
    console.log("Observador de scroll para animaciones configurado.");

    console.log("main.js: Inicialización completada.");
});
