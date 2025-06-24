// Variables globales
let currentFilter = 'all';
let isLoading = true;


// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeLoadingScreen();
});

// Gestión de la pantalla de carga
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // La animación 3D tiene una duración de 3 segundos según el CSS
    const animationDuration = 3000; // 3 segundos
    // Tiempo mínimo para mostrar al menos un ciclo completo de animación
    const minLoadingTime = animationDuration + 100; // 3.5 segundos para asegurar que termine
    const startTime = Date.now();
    
    // Esperar a que se carguen todos los recursos
    window.addEventListener('load', function() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        setTimeout(() => {
            // Ocultar pantalla de carga
            loadingScreen.classList.add('hidden');
            isLoading = false;
            
            // Eliminar elemento después de la transición
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
            
            // Inicializar la aplicación principal
            initializeApp();
        }, remainingTime);
    });
    
    // Fallback: si por alguna razón 'load' no se dispara, forzar la inicialización después de 8 segundos
    setTimeout(() => {
        if (isLoading) {
            loadingScreen.classList.add('hidden');
            isLoading = false;
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
            initializeApp();
        }
    }, 6000); // Aumentado de 5 a 8 segundos para dar más tiempo
}

function initializeApp() {
    // No inicializar si aún está cargando
    if (isLoading) return;
    
    // Inicializar navegación móvil
    setupMobileNavigation();
    
    // Inicializar filtros de proyectos
    setupProjectFilters();
    
    // Inicializar botones de descarga
    setupDownloadButtons();
    
    // Inicializar modal
    setupModal();
    
    // Inicializar animaciones de scroll
    setupScrollAnimations();
    
    // Inicializar contadores
    setupCounters();
    
    // Inicializar smooth scroll
    setupSmoothScroll();
    
    // Inicializar efectos adicionales
    initializeAdditionalEffects();
    
    // Inicializar nuevos sistemas
    window.supportManager = new SupportManager();
    window.floatingSupportAnimation = new FloatingSupportAnimation();
    
    console.log('ZeroTech Website initialized successfully!');
    
}

// Navegación móvil
function setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Filtros de proyectos
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrar proyectos
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
            
            currentFilter = filter;
        });
    });
}

// Botones de descarga
function setupDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.btn-download');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            openDownloadModal(projectId);
        });
    });
}

// Modal de descarga
function setupModal() {
    const modal = document.getElementById('downloadModal');
    const closeBtn = document.querySelector('.close');
    const downloadBtns = document.querySelectorAll('.download-btn');

    // Cerrar modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Cerrar modal al hacer click fuera
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Botones de descarga del modal
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = btn.getAttribute('data-type');
            const projectId = modal.getAttribute('data-project');
            handleDownload(projectId, type);
        });
    });
}

function openDownloadModal(projectId) {
    const modal = document.getElementById('downloadModal');
    const project = projects[projectId];
    
    if (project && modal) {
        document.getElementById('modalProjectName').textContent = project.name;
        document.getElementById('modalProjectDesc').textContent = project.description;
        modal.setAttribute('data-project', projectId);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function handleDownload(projectId, type) {
    const project = projects[projectId];
    
    if (!project) {
        showNotification('Proyecto no encontrado', 'error');
        return;
    }

    switch (type) {
        case 'html':
            downloadHTMLFile(project, projectId);
            break;
        case 'codepen':
            openInCodePen(project);
            break;
        case 'whatsapp':
            shareOnWhatsApp(project, projectId);
            break;
    }
    
    closeModal();
}

function downloadHTMLFile(project, projectId) {
    const htmlContent = project.files.html;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectId}-zerotech.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('¡Archivo descargado exitosamente!', 'success');
}

function openInCodePen(project) {
    // Extraer CSS del HTML
    const htmlContent = project.files.html;
    const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
    const bodyMatch = htmlContent.match(/<body>([\s\S]*?)<\/body>/);
    
    const css = styleMatch ? styleMatch[1].trim() : '';
    const html = bodyMatch ? bodyMatch[1].trim() : '';
    
    const data = {
        title: project.name + ' - ZeroTech',
        description: project.description,
        html: html,
        css: css,
        js: ''
    };
    
    const form = document.createElement('form');
    form.action = 'https://codepen.io/pen/define';
    form.method = 'POST';
    form.target = '_blank';
    
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    input.value = JSON.stringify(data);
    
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    showNotification('Abriendo en CodePen...', 'info');
}

function shareOnWhatsApp(project, projectId) {
    const message = encodeURIComponent(
        `🎨 ¡Mira esta increíble animación CSS!\n\n` +
        `✨ ${project.name}\n` +
        `📝 ${project.description}\n\n` +
        `🔗 Descárgala gratis en: https://zerotech.shop\n\n` +
        `💻 Más tutoriales en mi canal de YouTube: ZeroTech\n` +
        `#CSS #Animaciones #WebDev #ZeroTech`
    );
    
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    showNotification('Compartiendo en WhatsApp...', 'success');
}

// Notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación si no existe
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            max-width: 300px;
        `;
        document.body.appendChild(notification);
    }
    
    // Establecer color según el tipo
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1',
        warning: '#f59e0b'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
    }, 3000);
}

// Animaciones de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observar elementos que deben animarse
    const animateElements = document.querySelectorAll('.project-card, .tutorial-card, .section-header');
    animateElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// Contadores animados
function setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Formatear número con separadores de miles
        counter.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Smooth scroll
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efectos adicionales (se inicializan después de la carga)
function initializeAdditionalEffects() {
    // Efecto hover para las tarjetas de tutorial
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    tutorialCards.forEach(card => {
        card.addEventListener('click', () => {
            showNotification('¡Próximamente! Video tutorial en desarrollo', 'info');
        });
    });

    // Efecto de parallax mejorado con mejor rendimiento
    let ticking = false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    function updateParallax() {
        // No aplicar parallax si el usuario prefiere movimiento reducido
        if (prefersReducedMotion) {
            ticking = false;
            return;
        }
        
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2; // Velocidad reducida para evitar problemas
        
        // Parallax en el fondo del hero
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.setProperty('--parallax-offset', `${rate}px`);
        }
        
        // Parallax suave en elementos flotantes con diferentes velocidades
        const floatingElements = document.querySelectorAll('.floating-elements .element');
        floatingElements.forEach((element, index) => {
            const speed = 0.05 + (index * 0.02); // Velocidades más sutiles
            const yPos = scrolled * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;    }
    
    function requestTick() {
        if (!ticking && !prefersReducedMotion) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Cambiar header en scroll (manejado por ThemeManager)
    // Esta funcionalidad ahora está integrada en el ThemeManager
}

// Funciones de utilidad
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Analytics simulado (puedes reemplazar con Google Analytics)
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    // Aquí puedes agregar tu código de analytics real
}

// Gestión de temas
class ThemeManager {
    constructor() {
        this.currentTheme = this.getInitialTheme();
        this.initTheme();
        this.bindEvents();
        this.detectSystemThemeChange();
    }    getInitialTheme() {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        // Default to light
        return 'light';
    }    detectSystemThemeChange() {
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a theme
                if (!localStorage.getItem('theme')) {
                    this.currentTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme();
                }
            });
        }
    }

    initTheme() {
        this.applyTheme();
    }    applyTheme() {
        if (this.currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        this.updateHeaderOnThemeChange();
        this.updateThemeToggleLabel();
    }    updateThemeToggleLabel() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const label = this.currentTheme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
            themeToggle.setAttribute('aria-label', label);
        }
    }    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.currentTheme);
        
        // Track theme change event
        trackEvent('theme_changed', { theme: this.currentTheme });
    }updateHeaderOnThemeChange() {
        // Update header background based on theme and scroll position
        const header = document.querySelector('.header');
        const scrollY = window.scrollY;
        
        if (this.currentTheme === 'dark') {
            if (scrollY > 100) {
                header.style.background = 'rgba(15, 15, 35, 0.98)';
            } else {
                header.style.background = 'rgba(15, 15, 35, 0.95)';
            }
        } else {
            if (scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    }

    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Update header on scroll with theme consideration
        window.addEventListener('scroll', () => this.updateHeaderOnThemeChange());
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// ==============================================
// SUPPORT & CUSTOM PROJECTS
// ==============================================
class SupportManager {
    constructor() {
        this.init();
    }    init() {
        this.setupSupportButton();
        this.setupDonateLink();
        this.setupModals();
    }

    setupSupportButton() {
        const supportBtn = document.getElementById('supportBtn');
        if (supportBtn) {
            supportBtn.addEventListener('click', () => {
                this.openSupportModal();
            });
        }
    }    setupDonateLink() {
        const donateLink = document.getElementById('donateLink');
        if (donateLink) {
            donateLink.addEventListener('click', () => {
                this.openSupportModal();
            });
        }
    }

    setupModals() {
        // Support Modal
        const supportModal = document.getElementById('supportModal');
        const supportModalClose = document.getElementById('supportModalClose');
        
        if (supportModalClose) {
            supportModalClose.addEventListener('click', () => {
                this.closeSupportModal();
            });
        }

        if (supportModal) {
            supportModal.addEventListener('click', (e) => {
                if (e.target === supportModal) {
                    this.closeSupportModal();
                }
            });
        }        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSupportModal();
            }
        });
    }

    openSupportModal() {
        const modal = document.getElementById('supportModal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Analytics o tracking si lo necesitas
            if (window.toastManager) {
                window.toastManager.info('¡Gracias por considerar apoyarnos! 💙', 'Tu apoyo hace la diferencia');
            }
        }
    }

    closeSupportModal() {
        const modal = document.getElementById('supportModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }    // Método para tracking de donaciones (opcional)
    trackDonation(platform) {
        if (window.toastManager) {
            window.toastManager.success('¡Gracias! 💙', `Redirigiendo a ${platform}`);
        }
        
        // Aquí puedes agregar Google Analytics o tracking personalizado
        console.log(`Donation clicked: ${platform}`);
    }
}

// ==============================================
// FLOATING SUPPORT ANIMATION
// ==============================================
class FloatingSupportAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollHide();
        this.setupPeriodicAnimation();
    }

    setupScrollHide() {
        let lastScrollTop = 0;
        const floatingSupport = document.getElementById('floatingSupport');
        
        if (!floatingSupport) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                floatingSupport.style.transform = 'translateY(100px)';
                floatingSupport.style.opacity = '0.5';
            } else {
                // Scrolling up
                floatingSupport.style.transform = 'translateY(0)';
                floatingSupport.style.opacity = '1';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    setupPeriodicAnimation() {
        const supportBtn = document.getElementById('supportBtn');
        if (!supportBtn) return;

        // Animación sutil cada 30 segundos para llamar la atención
        setInterval(() => {
            supportBtn.style.animation = 'none';
            setTimeout(() => {
                supportBtn.style.animation = 'heartBeat 2s infinite, pulse 1s ease-in-out 3';
            }, 100);
        }, 30000);
    }
}

// Exportar funciones para uso global si es necesario
window.ZeroTech = {
    openDownloadModal,
    closeModal,
    showNotification,
    trackEvent
};
