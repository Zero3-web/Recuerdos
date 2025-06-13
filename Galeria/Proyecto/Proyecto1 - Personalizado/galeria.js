document.querySelectorAll('.contenedor-imagen').forEach(imgContainer => {
    imgContainer.addEventListener('mouseenter', () => {
        imgContainer.classList.add('active');
    });
    imgContainer.addEventListener('mouseleave', () => {
        imgContainer.classList.remove('active');
    });
});

// Efecto libro para las cards cuando la galería aparece (en mobile y desktop)
function animacionLibroGaleria() {
    const imagenes = document.querySelectorAll('.contenedor-imagen');
    imagenes.forEach((img, i) => {
        img.style.opacity = 0;
        img.style.transform = 'perspective(600px) rotateY(90deg) scale(0.7)';
    });
    setTimeout(() => {
        imagenes.forEach((img, i) => {
            setTimeout(() => {
                img.style.transition = 'all 0.9s cubic-bezier(.22,1.61,.36,1)';
                img.style.opacity = 1;
                img.style.transform = 'perspective(600px) rotateY(0deg) scale(1.08)';
                setTimeout(() => {
                    img.style.transform = 'perspective(600px) rotateY(0deg) scale(1)';
                }, 700);
            }, i * 120);
        });
    }, 200);
}

// Animación de entrada impactante para la galería (desktop y mobile)
function animacionImpactoGaleria() {
    const cards = document.querySelectorAll('.contenedor-imagen');
    cards.forEach(card => {
        card.classList.remove('entrada-impacto');
    });
    setTimeout(() => {
        cards.forEach((card, i) => {
            card.classList.add('entrada-impacto');
            card.style.animationDelay = (i * 0.13) + 's';
            // Limpia la clase después de la animación para permitir hover normal
            card.addEventListener('animationend', function handler() {
                card.classList.remove('entrada-impacto');
                card.style.animationDelay = '';
                card.removeEventListener('animationend', handler);
            });
        });
    }, 10);
}

// Mover imagen 1 al final solo en mobile
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 700) {
        const galeria = document.querySelector('.galeria');
        const primera = galeria?.querySelector('.contenedor-imagen:first-child');
        if (galeria && primera) {
            galeria.appendChild(primera);
        }
    }
});

// Función para lanzar fuegos artificiales durante la animación de entrada de la galería
function lanzarFuegosArtificialesDuranteGaleria(duracionMs = 1200) {
    const container = document.getElementById('fireworks-container');
    if (!container) return;
    let interval;
    let start = Date.now();

    function lanzarUno() {
        const fw = document.createElement('div');
        fw.className = 'firework';
        // Posición aleatoria en la pantalla
        const x = Math.random() * 80 + 10; // 10vw - 90vw
        const y = Math.random() * 60 + 10; // 10vh - 70vh
        fw.style.left = x + 'vw';
        fw.style.top = y + 'vh';
        // Color aleatorio
        fw.style.background = `hsl(${Math.floor(Math.random()*360)},90%,60%)`;
        // Dirección aleatoria de explosión
        const angle = Math.random() * 2 * Math.PI;
        const dist = 40 + Math.random() * 40;
        fw.style.setProperty('--tx', `${Math.cos(angle)*dist}px`);
        fw.style.setProperty('--ty', `${Math.sin(angle)*dist}px`);
        container.appendChild(fw);
        setTimeout(() => container.removeChild(fw), 900);
    }

    interval = setInterval(() => {
        lanzarUno();
        if (Date.now() - start > duracionMs) clearInterval(interval);
    }, 120);
}

// Espera a que la galería sea visible (después de 3s) y aplica el efecto impacto + fuegos artificiales
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animacionImpactoGaleria();
        lanzarFuegosArtificialesDuranteGaleria(1200);
    }, 3000);
});

// Espera a que la galería sea visible (después de 4s) y aplica el efecto libro
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animacionLibroGaleria();
    }, 4000);
});

// Modal para la imagen 1 (desktop y mobile)
document.addEventListener('DOMContentLoaded', () => {
    const img1 = document.querySelector('.contenedor-imagen img[src*="1.jpeg"]');
    const modal = document.getElementById('modal-imagen1');
    const cerrar = document.getElementById('cerrar-modal-imagen1');
    if (img1 && modal && cerrar) {
        img1.style.cursor = 'pointer';
        img1.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.classList.add('active');
        });
        cerrar.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});
