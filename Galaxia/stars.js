const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const STAR_COUNT = 180; // antes 90
const stars = [];

for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 1.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
        isGlow: Math.random() < 0.08 // Unos pocos serán "grandes"
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
        // Twinkle effect
        const twinkle = 0.5 + 0.5 * Math.sin(performance.now() * 0.001 * star.twinkleSpeed + star.phase);
        ctx.save();
        ctx.globalAlpha = star.alpha * twinkle;

        if (star.isGlow) {
            // Estrella grande con resplandor
            const gradient = ctx.createRadialGradient(
                star.x, star.y, 0,
                star.x, star.y, star.radius * 8
            );
            gradient.addColorStop(0, "#fff");
            gradient.addColorStop(0.2, "#a7a7ff");
            gradient.addColorStop(1, "transparent");
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * 8, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        // Estrella central
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = star.isGlow ? 12 : 2;
        ctx.fill();
        ctx.restore();
    }
}

// Permitir aumentar la velocidad de las estrellas
function setStarsSpeed(multiplier) {
    for (const star of stars) {
        star.twinkleSpeed = (Math.random() * 1.5 + 0.5) * multiplier;
    }
}

function animate() {
    drawStars();
    requestAnimationFrame(animate);
}
animate();
