document.querySelectorAll('.contenedor-imagen').forEach(imgContainer => {
    imgContainer.addEventListener('mouseenter', () => {
        imgContainer.classList.add('active');
    });
    imgContainer.addEventListener('mouseleave', () => {
        imgContainer.classList.remove('active');
    });
});

// Animación de entrada tipo "libro" en mobile
if (window.innerWidth <= 700) {
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
