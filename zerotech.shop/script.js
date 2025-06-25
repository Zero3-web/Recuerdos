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
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);        setTimeout(() => {
            // Ocultar pantalla de carga
            loadingScreen.classList.add('hidden');
            isLoading = false;
            
            // Mostrar cubo persistente inmediatamente
            showPersistentCube();
            
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
    
    // Inicializar contadores animados
    initializeCounters();
    
    // Inicializar barras de habilidades
    setupSkillBars();
    
    // Inicializar cubo persistente
    initializePersistentCube();
    
    // Inicializar smooth scroll
    setupSmoothScroll();
    
    // Inicializar efectos adicionales
    initializeAdditionalEffects();
    
    // Inicializar loader navegacional
    setupNavigationLoader();
    
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
    const downloadButtons = document.querySelectorAll('.button');
    
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
    const closeBtn = document.getElementById('modalClose');
    const downloadOptions = document.querySelectorAll('.download-option');
    const shareButtons = document.querySelectorAll('.share-btn');

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
    downloadOptions.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = btn.getAttribute('data-type');
            const projectId = modal.getAttribute('data-project');
            handleDownload(projectId, type);
        });
    });

    // Botones de compartir del modal
    shareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = btn.getAttribute('data-type');
            const projectId = modal.getAttribute('data-project');
            handleShare(projectId, type);
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
    }
    
    // No cerrar modal automáticamente para permitir ver instrucciones
    showNotification('¡Descarga iniciada! Revisa las instrucciones abajo', 'success');
}

function handleShare(projectId, type) {
    const project = projects[projectId];
    
    if (!project) {
        showNotification('Proyecto no encontrado', 'error');
        return;
    }

    switch (type) {
        case 'whatsapp':
            shareOnWhatsApp(project, projectId);
            break;
        case 'instagram':
            shareOnInstagram(project, projectId);
            break;
        case 'tiktok':
            shareOnTikTok(project, projectId);
            break;
    }
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

function shareOnInstagram(project, projectId) {
    const message = encodeURIComponent(
        `🎨 ¡Increíble animación CSS!\n\n` +
        `✨ ${project.name}\n` +
        `📝 ${project.description}\n\n` +
        `🔗 Descarga gratis en: https://zerotech.shop\n` +
        `📺 Tutoriales: @zero_exploit3\n` +
        `#CSS #Animaciones #WebDev #ZeroTech #Programming`
    );
    
    // Instagram no permite links directos, así que copiamos el mensaje
    navigator.clipboard.writeText(decodeURIComponent(message)).then(() => {
        showNotification('¡Mensaje copiado! Pégalo en Instagram', 'success');
        // Abrir Instagram web
        window.open('https://www.instagram.com/zero_exploit3/', '_blank');
    }).catch(() => {
        showNotification('Ve a @zero_exploit3 en Instagram', 'info');
        window.open('https://www.instagram.com/zero_exploit3/', '_blank');
    });
}

function shareOnTikTok(project, projectId) {
    const message = encodeURIComponent(
        `🎨 Animación CSS increíble!\n\n` +
        `✨ ${project.name}\n` +
        `🔗 Link en bio: zerotech.shop\n` +
        `#CSS #Animaciones #WebDev #Programming #TikTok`
    );
    
    // TikTok no permite links directos, así que copiamos el mensaje
    navigator.clipboard.writeText(decodeURIComponent(message)).then(() => {
        showNotification('¡Mensaje copiado! Pégalo en TikTok', 'success');
        // Abrir TikTok web
        window.open('https://www.tiktok.com/@zero_exploit', '_blank');
    }).catch(() => {
        showNotification('Ve a @zero_exploit en TikTok', 'info');
        window.open('https://www.tiktok.com/@zero_exploit', '_blank');
    });
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
    const animateElements = document.querySelectorAll('.project-card, .tutorial-card, .section-header, .skill-item, .highlight-card, .about-visual');
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

// Animación de barras de habilidades
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

function animateSkillBar(bar) {
    const level = parseInt(bar.getAttribute('data-level'));
    bar.style.width = '0%';
    
    // Usar requestAnimationFrame para una animación más suave
    let start = null;
    const duration = 1500; // 1.5 segundos
    
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        
        // Usar una función de easing para hacer la animación más natural
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentWidth = level * easeOutCubic;
        
        bar.style.width = currentWidth + '%';
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
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
        const themeToggle = document.getElementById('themeToggle');
        
        if (this.currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeToggle) themeToggle.checked = true;
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeToggle) themeToggle.checked = false;
        }
        this.updateHeaderOnThemeChange();
        this.updateThemeToggleLabel();
    }updateThemeToggleLabel() {
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
    }    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('change', () => this.toggleTheme());
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

// ==============================================
// ANIMACIÓN DE CONTADORES
// ==============================================

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach((counter, index) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const stat = counter.closest('.stat');
        
        // Agregar delay escalonado para cada contador
        setTimeout(() => {
            animateCounter(counter, target, stat);
        }, index * 200); // 200ms de delay entre cada contador
    });
}

function animateCounter(element, target, statElement) {
    const duration = 2000; // 2 segundos para la animación
    const steps = 60; // 60 pasos para suavidad
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    
    // Agregar clase de conteo
    element.classList.add('counting');
    statElement.classList.add('counting');
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
            
            // Remover clase de conteo y agregar clase final
            element.classList.remove('counting');
            statElement.classList.remove('counting');
            element.classList.add('finished');
            
            // Remover clase final después de la animación
            setTimeout(() => {
                element.classList.remove('finished');
            }, 500);
        }
        
        // Actualizar el texto según el tipo de contador
        updateCounterText(element, Math.floor(current), target);
    }, stepDuration);
}

function updateCounterText(element, current, target) {
    const originalText = element.textContent;
    
    if (originalText.includes('Descargas')) {
        if (current >= 1000) {
            element.textContent = `${Math.floor(current/1000)},${String(current % 1000).padStart(3, '0')}+ Descargas`;
        } else {
            element.textContent = `${current}+ Descargas`;
        }
    } else if (originalText.includes('Proyectos')) {
        element.textContent = `${current} Proyectos`;
    } else if (originalText.includes('Gratis')) {
        element.textContent = `${current}% Gratis`;
    }
}

// Función para detectar cuando los contadores entran en la vista
function setupCounterObserver() {
    const heroStats = document.querySelector('.hero-stats');
    
    if (!heroStats) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Esperar un poco después de que aparezcan las animaciones de texto
                setTimeout(() => {
                    animateCounters();
                }, 1000);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Iniciar cuando el 50% del elemento es visible
    });
    
    observer.observe(heroStats);
}

// Inicializar observador de contadores después de que se carga la página
function initializeCounters() {
    setupCounterObserver();
}

// Exportar funciones para uso global si es necesario
window.ZeroTech = {
    openDownloadModal,
    closeModal,
    showNotification,
    trackEvent
};

// ==============================================
// CUBO 3D PERSISTENTE
// ==============================================

function showPersistentCube() {
    const persistentCube = document.getElementById('persistentCube');
    
    if (!persistentCube) return;
    
    // Agregar clase de caída desde arriba
    persistentCube.classList.add('falling');
    persistentCube.classList.add('visible');
    
    // Remover clase de caída después de la animación
    setTimeout(() => {
        persistentCube.classList.remove('falling');
    }, 1200);
}

function hidePersistentCube() {
    const persistentCube = document.getElementById('persistentCube');
    
    if (!persistentCube) return;
    
    persistentCube.classList.remove('visible');
}

// Función para cambiar posición del cubo (opcional)
function toggleCubePosition() {
    const persistentCube = document.getElementById('persistentCube');
    
    if (!persistentCube) return;
    
    persistentCube.classList.toggle('top-right');
}

// Función para crear el efecto de salpicadura de cubitos
function createCubeSplash(clickX, clickY) {
    const numCubes = 8; // Número de cubitos que salpican
    const colors = ['#5865F2', '#7289DA', '#8B9CF7', '#A8B5FF', '#6B73FF', '#4752C4'];
    
    for (let i = 0; i < numCubes; i++) {
        const miniCube = document.createElement('div');
        miniCube.className = 'mini-cube';
        
        // Posición inicial en el punto de click
        miniCube.style.left = clickX + 'px';
        miniCube.style.top = clickY + 'px';
        
        // Color aleatorio del array
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        miniCube.style.background = randomColor;
        miniCube.style.boxShadow = `0 0 10px ${randomColor}`;
        
        // Dirección aleatoria para el salpique
        const angle = (360 / numCubes) * i + (Math.random() - 0.5) * 60; // Ángulo base + variación
        const velocity = 100 + Math.random() * 150; // Velocidad aleatoria
        
        const radians = angle * Math.PI / 180;
        const velocityX = Math.cos(radians) * velocity;
        const velocityY = Math.sin(radians) * velocity;
        
        // Agregar variables CSS para la animación
        miniCube.style.setProperty('--velocity-x', velocityX + 'px');
        miniCube.style.setProperty('--velocity-y', velocityY + 'px');
        miniCube.style.setProperty('--rotation', Math.random() * 720 + 'deg');
        
        // Agregar al DOM
        document.body.appendChild(miniCube);
        
        // Activar animación
        requestAnimationFrame(() => {
            miniCube.classList.add('splash-active');
        });
        
        // Remover después de la animación
        setTimeout(() => {
            if (miniCube.parentNode) {
                miniCube.parentNode.removeChild(miniCube);
            }
        }, 1500);
    }
}

// Inicializar cubo persistente
function initializePersistentCube() {
    const persistentCube = document.getElementById('persistentCube');
    
    if (!persistentCube) return;
    
    // Agregar eventos de interacción si se desea
    persistentCube.addEventListener('click', (e) => {
        // Efecto de salpicadura de cubitos
        createCubeSplash(e.clientX, e.clientY);
        
        // Efecto de shake en el cubo principal
        persistentCube.classList.add('cube-shake');
        setTimeout(() => {
            persistentCube.classList.remove('cube-shake');
        }, 600);
        
        console.log('Cubo clickeado! 🎯');
    });
    
    // Opcional: ocultar/mostrar cubo con tecla específica
    document.addEventListener('keydown', (e) => {
        if (e.key === 'c' && e.ctrlKey) {
            e.preventDefault();
            persistentCube.classList.toggle('visible');
        }
    });    // Efecto de desplazamiento lateral en scroll con throttle para rendimiento
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.2; // Velocidad del parallax más sutil
        const lateralSpeed = 0.5; // Velocidad del desplazamiento lateral aumentada aún más
        const maxLateralOffset = 600; // Límite máximo de desplazamiento lateral aumentado (px)
        const isVisible = persistentCube.classList.contains('visible');
        const isFalling = persistentCube.classList.contains('falling');
        
        // Solo aplicar efectos si no está en animación de caída
        if (!isFalling && isVisible) {
            // Usar requestAnimationFrame para suavizar la animación
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = requestAnimationFrame(() => {
                // Calcular el offset del parallax y el desplazamiento lateral
                const parallaxOffset = scrollY * parallaxSpeed;
                let lateralOffset = scrollY * lateralSpeed;
                
                // Limitar el desplazamiento lateral para que no desaparezca completamente
                lateralOffset = Math.min(lateralOffset, maxLateralOffset);
                
                // Mover el cubo más hacia la izquierda conforme se hace scroll
                // El valor negativo mueve hacia la izquierda
                persistentCube.style.transform = `translateY(calc(-90% + ${parallaxOffset}px)) translateX(-${lateralOffset}px) scale(1)`;
            });
        }
    });
}

// ==============================================
// LOADER NAVEGACIONAL GLOBAL
// ==============================================

function setupNavigationLoader() {
    const navLoader = document.getElementById('navLoader');
    
    if (!navLoader) return;
    
    // Interceptar todos los enlaces de navegación
    const navLinks = document.querySelectorAll('a[href]');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Solo interceptar enlaces internos del sitio (no externos, no emails, no anchors)
        if (href && 
            !href.startsWith('http') && 
            !href.startsWith('mailto:') && 
            !href.startsWith('tel:') && 
            !href.startsWith('#') &&
            href.endsWith('.html')) {
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showNavigationLoader();
                
                // Simular carga mínima para mejor UX
                setTimeout(() => {
                    window.location.href = href;
                }, 800); // 800ms para mostrar la animación
            });
        }
    });
}

function showNavigationLoader() {
    const navLoader = document.getElementById('navLoader');
    if (navLoader) {
        navLoader.classList.add('active');
    }
}

function hideNavigationLoader() {
    const navLoader = document.getElementById('navLoader');
    if (navLoader) {
        navLoader.classList.remove('active');
    }
}

// Ocultar loader cuando la página se carga completamente
window.addEventListener('load', () => {
    hideNavigationLoader();
});

// También ocultar si el usuario regresa con el botón atrás
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        hideNavigationLoader();
    }
});

// ===================================
// CONTACT FORM FUNCTIONALITY
// ===================================

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const captchaCheckbox = document.getElementById('captcha');
    
    if (!contactForm) return;
    
    // Enable/disable submit button based on captcha
    if (captchaCheckbox && submitBtn) {
        function updateSubmitButton() {
            const formValid = contactForm.checkValidity();
            const captchaChecked = captchaCheckbox.checked;
            
            if (formValid && captchaChecked) {
                submitBtn.disabled = false;
                submitBtn.style.background = '#6366f1';
            } else {
                submitBtn.disabled = true;
                submitBtn.style.background = '#9ca3af';
            }
        }
        
        // Check form validity on input changes
        contactForm.addEventListener('input', updateSubmitButton);
        contactForm.addEventListener('change', updateSubmitButton);
        captchaCheckbox.addEventListener('change', updateSubmitButton);
        
        // Initial check
        updateSubmitButton();
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this);
    });
}

function handleFormSubmission(form) {
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.background = '#9ca3af';
    
    // Remove any existing messages
    removeFormMessages();
    
    // Simulate form submission (replace with actual form handler)
    setTimeout(() => {
        // For demo purposes, we'll show success
        // In a real implementation, you would send the data to your server
        
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        if (success) {
            showFormMessage('Message sent successfully! We\'ll get back to you in 24h.', 'success');
            form.reset();
            
            // Reset captcha
            const captcha = document.getElementById('captcha');
            if (captcha) captcha.checked = false;
        } else {
            showFormMessage('There was an error sending your message. Please try again.', 'error');
        }
        
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = true;
        submitBtn.style.background = '#9ca3af';
        
    }, 2000); // Simulate 2 second delay
}

function showFormMessage(message, type) {
    const form = document.getElementById('contactForm');
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.style.cssText = `
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 0.9rem;
        font-weight: 500;
        ${type === 'success' 
            ? 'background: #dcfce7; color: #166534; border: 1px solid #bbf7d0;' 
            : 'background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;'
        }
    `;
    messageEl.textContent = message;
    
    // Insert at the top of the form
    form.insertBefore(messageEl, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
        }
    }, 5000);
}

function removeFormMessages() {
    const messages = document.querySelectorAll('.form-message');
    messages.forEach(message => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    });
}

// Add smooth scroll to contact section when contact links are clicked
document.addEventListener('DOMContentLoaded', function() {
    // Update existing contact links to scroll to contact form
    const contactLinks = document.querySelectorAll('a[href="mailto:hola@zerotech.shop"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Focus on the topic field after scrolling
                setTimeout(() => {
                    const topicField = document.getElementById('contactTopic');
                    if (topicField) {
                        topicField.focus();
                    }
                }, 1000);
            }
        });
    });
});

// ===================================
// END CONTACT FORM FUNCTIONALITY
// ===================================
