// music.js
// Control simple para el reproductor de música

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('song');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const controlIcon = document.getElementById('controlIcon');

    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            controlIcon.classList.remove('fa-play');
            controlIcon.classList.add('fa-pause');
        } else {
            audio.pause();
            controlIcon.classList.remove('fa-pause');
            controlIcon.classList.add('fa-play');
        }
    });

    // Cambia el icono cuando termina la canción
    audio.addEventListener('ended', function() {
        controlIcon.classList.remove('fa-pause');
        controlIcon.classList.add('fa-play');
    });
});
