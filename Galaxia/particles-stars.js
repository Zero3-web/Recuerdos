tsParticles.load("tsparticles", {
    fullScreen: {
        enable: true,
        zIndex: 0
    },
    particles: {
        number: {
            value: 900, // reducido el número de estrellas
            density: {
                enable: true,
                area: 1200
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.8,
            random: true,
            anim: {
                enable: true,
                speed: 0.7,
                opacity_min: 0.3,
                sync: false
            }
        },
        size: {
            value: 1.5,
            random: { enable: true, minimumValue: 0.5 }
        },
        move: {
            enable: true,
            speed: 0.7,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
                default: "out"
            }
        }
    },
    background: {
        color: "transparent"
    },
    detectRetina: true,
    interactivity: {
        detectsOn: "canvas",
        events: {
            onHover: { enable: false },
            onClick: { enable: false }
        }
    }
});
