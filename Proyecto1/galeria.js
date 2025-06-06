document.querySelectorAll('.contenedor-imagen').forEach(imgContainer => {
    imgContainer.addEventListener('mouseenter', () => {
        imgContainer.classList.add('active');
    });
    imgContainer.addEventListener('mouseleave', () => {
        imgContainer.classList.remove('active');
    });
});
