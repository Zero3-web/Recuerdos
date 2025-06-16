document.addEventListener('DOMContentLoaded', function() {
  const musica = new Audio('https://files.catbox.moe/defs5k');
  const corazon = document.querySelector('.corazon');
  let musicaIniciada = false;

  corazon.addEventListener('click', function() {
    if (!musicaIniciada) {
      musica.play();
      musicaIniciada = true;
    } else {
      if (musica.paused) {
        musica.play();
      } else {
        musica.pause();
      }
    }
  });
});