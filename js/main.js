// js/main.js
// Lógica JavaScript simplificada para PaCar EcoSonic - Entrega 2
// Enfocada en menú móvil, animaciones de scroll y apertura/cierre de modales visuales.
console.log("main.js: Cargado para Entrega 2");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente cargado y parseado.");

    // --- Selección de elementos principales del DOM ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavItems = document.querySelectorAll('#mobile-menu .mobile-nav-item'); 

    const loginBtnNavPlaceholder = document.getElementById('login-btn-nav-placeholder');
    const registerBtnNavPlaceholder = document.getElementById('register-btn-nav-placeholder');
    const cartBtnPlaceholder = document.getElementById('cart-button-placeholder');
    
    const loginBtnMobilePlaceholder = document.getElementById('login-btn-mobile-placeholder');
    const registerBtnMobilePlaceholder = document.getElementById('register-btn-mobile-placeholder');
    
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const cartModal = document.getElementById('cart-modal');

    const closeLoginModalBtn = document.getElementById('close-login-modal-btn-placeholder');
    const closeRegisterModalBtn = document.getElementById('close-register-modal-btn-placeholder');
    const closeCartBtn = document.getElementById('close-cart-btn-placeholder');

    const openRegisterFromLogin = document.querySelector('#login-modal .open-register-modal');
    const openLoginFromRegister = document.querySelector('#register-modal .open-login-modal');
    
    const toastNotification = document.getElementById('toast-notification'); 

    // --- Función para mostrar mensajes tipo toast ---
    function showToast(message, duration = 3000) {
        if (!toastNotification) { console.error("Elemento toastNotification no encontrado"); return; }
        toastNotification.textContent = message;
        toastNotification.classList.add('show');
        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, duration);
    }

    // --- Lógica del menú móvil: apertura/cierre y animación ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            console.log("Botón de menú móvil clickeado");
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');

            if (isHidden) { 
                // Fuerza el reflujo para activar la transición
                void mobileMenu.offsetWidth; 
                mobileMenu.classList.remove('-translate-y-full');
                mobileMenu.classList.add('translate-y-0');
                mobileMenuButton.setAttribute('aria-expanded', 'true');
            } else { 
                mobileMenu.classList.remove('translate-y-0');
                mobileMenu.classList.add('-translate-y-full');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                // Oculta el menú al terminar la transición
                mobileMenu.addEventListener('transitionend', () => {
                    if (mobileMenu.classList.contains('-translate-y-full')) { 
                        mobileMenu.classList.add('hidden');
                    }
                }, { once: true });
            }
        });
        console.log("Listener para mobileMenuButton añadido.");

        // Cierra el menú móvil al hacer clic en cualquier ítem del menú
        if (mobileNavItems) {
            mobileNavItems.forEach(item => {
                item.addEventListener('click', () => {
                    console.log("Item de menú móvil clickeado, cerrando menú.");
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
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
            });
        }

    } else {
        console.error("Elementos mobileMenuButton o mobileMenu no encontrados.");
    }

    // --- Animaciones de aparición al hacer scroll ---
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

    // --- Botones "Ver Detalles" de productos: muestra mensaje simulado ---
    const detailButtons = document.querySelectorAll('.product-detail-btn');
    if (detailButtons) {
        detailButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productName = event.target.dataset.productName || 'este producto';
                showToast(`Detalles para: ${productName}. Compra aún no habilitada en esta entrega.`);
                console.log(`Botón 'Ver Detalles' para ${productName} clickeado.`);
            });
        });
    }
    
    // --- Funciones para abrir y cerrar modales visuales ---
    function openModal(modalElement) {
        if (modalElement) {
            modalElement.classList.add('active');
            console.log("Modal abierto (placeholder):", modalElement.id);
        } else {
            console.error("Intento de abrir modal nulo o no encontrado:", modalElement);
        }
    }
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('active');
            console.log("Modal cerrado (placeholder):", modalElement.id);
        } else {
            console.error("Intento de cerrar modal nulo o no encontrado:", modalElement);
        }
    }

    // --- Listeners para abrir modales desde botones de navegación ---
    if(loginBtnNavPlaceholder && loginModal) loginBtnNavPlaceholder.addEventListener('click', (e) => { e.preventDefault(); openModal(loginModal); });
    else if (!loginBtnNavPlaceholder) console.warn("loginBtnNavPlaceholder no encontrado");
    
    if(registerBtnNavPlaceholder && registerModal) registerBtnNavPlaceholder.addEventListener('click', (e) => { e.preventDefault(); openModal(registerModal); });
    else if (!registerBtnNavPlaceholder) console.warn("registerBtnNavPlaceholder no encontrado");
    
    if(cartBtnPlaceholder && cartModal) cartBtnPlaceholder.addEventListener('click', (e) => { e.preventDefault(); openModal(cartModal); });
    else if (!cartBtnPlaceholder) console.warn("cartBtnPlaceholder no encontrado");

    // --- Listeners para abrir modales desde menú móvil ---
    if(loginBtnMobilePlaceholder && loginModal) loginBtnMobilePlaceholder.addEventListener('click', (e) => { e.preventDefault(); openModal(loginModal); });
    if(registerBtnMobilePlaceholder && registerModal) registerBtnMobilePlaceholder.addEventListener('click', (e) => { e.preventDefault(); openModal(registerModal); });

    // --- Listeners para cerrar modales desde botón de cierre ---
    if(closeLoginModalBtn && loginModal) closeLoginModalBtn.addEventListener('click', () => closeModal(loginModal));
    else if (!closeLoginModalBtn && loginModal) console.warn("closeLoginModalBtnPlaceholder no encontrado para loginModal");
    
    if(closeRegisterModalBtn && registerModal) closeRegisterModalBtn.addEventListener('click', () => closeModal(registerModal));
    else if (!closeRegisterModalBtn && registerModal) console.warn("closeRegisterModalBtnPlaceholder no encontrado para registerModal");

    if(closeCartBtn && cartModal) closeCartBtn.addEventListener('click', () => closeModal(cartModal));
    else if (!closeCartBtn && cartModal) console.warn("closeCartBtnPlaceholder no encontrado para cartModal");

    // --- Permite cambiar entre login y registro desde los enlaces de los modales ---
    if(openRegisterFromLogin && loginModal && registerModal) {
        openRegisterFromLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(loginModal);
            openModal(registerModal);
        });
    }
    if(openLoginFromRegister && loginModal && registerModal) {
        openLoginFromRegister.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(registerModal);
            openModal(loginModal);
        });
    }

    // --- Cierra el modal si se hace clic fuera del contenido del modal ---
    [loginModal, registerModal, cartModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (event) => {
                if (event.target === modal) { 
                    closeModal(modal);
                }
            });
        }
    });

    // --- Simulación de envío de formularios de login y registro ---
    const loginSubmitPlaceholder = document.getElementById('login-submit-placeholder'); 
    const registerSubmitPlaceholder = document.getElementById('register-submit-placeholder');

    if(loginSubmitPlaceholder) {
        loginSubmitPlaceholder.addEventListener('click', () => {
            showToast('Inicio de sesión simulado. Funcionalidad no implementada.');
            if(loginModal) closeModal(loginModal);
        });
    }
    if(registerSubmitPlaceholder) {
        registerSubmitPlaceholder.addEventListener('click', () => {
            showToast('Registro simulado. Funcionalidad no implementada.');
            if(registerModal) closeModal(registerModal);
        });
    }

    console.log("main.js: Inicialización de Entrega 2 completada.");
});
