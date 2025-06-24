# 🎨 ZeroTech - Tutoriales de Animaciones CSS

Una página web moderna y elegante para un canal de YouTube especializado en tutoriales de animaciones CSS y desarrollo web. Los usuarios pueden descargar proyectos listos para usar y compartir fácilmente por WhatsApp.

## ✨ Características

### 🎯 Funcionalidades Principales
- **Galería de Proyectos**: Más de 6 proyectos de animaciones CSS listos para descargar
- **Sistema de Filtros**: Organiza proyectos por categorías (Animaciones, Efectos, Botones, Tarjetas)
- **Descarga Instantánea**: Archivos HTML completos listos para usar
- **Compartir en WhatsApp**: Funcionalidad para compartir proyectos fácilmente
- **Integración con CodePen**: Abre proyectos directamente en CodePen
- **Responsive Design**: Compatible con todos los dispositivos

### 🎨 Características de Diseño
- **Tema Oscuro Moderno**: Esquema de colores elegante con gradientes
- **Animaciones Interactivas**: Efectos de hover, scroll animations, y transiciones suaves
- **Tipografía Moderna**: Fuente Inter para una apariencia profesional
- **Iconos Font Awesome**: Iconografía consistente y atractiva
- **Grid Layout**: Diseño moderno con CSS Grid y Flexbox

### 📱 Experiencia de Usuario
- **Navegación Suave**: Smooth scroll entre secciones
- **Menú Móvil**: Navegación adaptativa para dispositivos móviles
- **Contadores Animados**: Estadísticas que se animan al hacer scroll
- **Notificaciones**: Feedback visual para todas las acciones
- **Modal de Descarga**: Interfaz intuitiva para descargar proyectos

## 🚀 Proyectos Incluidos

1. **❤️ Corazón Latiendo** - Animación de corazón con efecto realista
2. **🔵 Efecto Pulso** - Ondas expansivas para botones y loaders
3. **🎛️ Botón Animado** - Botones con efectos de hover modernos
4. **🔄 Tarjeta Flip** - Tarjetas con efecto 3D al hacer hover
5. **⏳ Loading Dots** - Animación de carga con puntos saltando
6. **🌈 Texto Gradiente** - Texto con gradientes animados

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y moderna
- **CSS3**: 
  - Grid y Flexbox para layouts
  - Custom Properties (CSS Variables)
  - Keyframe animations
  - Gradients y efectos visuales
  - Media queries para responsive design
- **JavaScript (Vanilla)**: 
  - DOM manipulation
  - Event handling
  - Local file downloads
  - Social media integration
  - Intersection Observer API

## 📂 Estructura del Proyecto

```
zerotech.shop/
├── index.html          # Página principal
├── styles.css          # Estilos y animaciones
├── script.js           # Funcionalidades JavaScript
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## 🎨 Paleta de Colores

- **Primario**: `#6366f1` (Indigo)
- **Secundario**: `#8b5cf6` (Violeta)
- **Acento**: `#06b6d4` (Cian)
- **Fondo Oscuro**: `#0f0f23`
- **Tarjetas**: `#1a1a2e`
- **Bordes**: `#27272a`
- **Texto Primario**: `#ffffff`
- **Texto Secundario**: `#a1a1aa`

## 🚀 Instalación y Uso

1. **Clona o descarga el proyecto**:
   ```bash
   git clone https://github.com/tuusuario/zerotech.shop.git
   ```

2. **Abre el proyecto**:
   - Simplemente abre `index.html` en tu navegador
   - O usa un servidor local como Live Server en VS Code

3. **Personalización**:
   - Modifica las URLs de redes sociales en `index.html`
   - Actualiza la información personal en la sección "Sobre Mí"
   - Agrega tus propios proyectos en el objeto `projects` en `script.js`
   - Personaliza los colores en las variables CSS en `styles.css`

## 📱 Características Responsive

- **Desktop** (1200px+): Layout completo con sidebar y grid de 3 columnas
- **Tablet** (768px - 1199px): Grid de 2 columnas, navegación adaptada
- **Mobile** (< 768px): Layout de columna única, menú hamburguesa

## 🎯 Funcionalidades Principales

### Sistema de Descarga
- Genera archivos HTML completos con CSS incluido
- Cada proyecto es completamente autocontenido
- Nombres de archivo descriptivos: `proyecto-zerotech.html`

### Integración Social
- **WhatsApp**: Mensaje preformateado con enlace al sitio
- **CodePen**: Abre proyectos directamente en CodePen
- **YouTube**: Enlaces directos al canal
- **GitHub**: Enlace al repositorio

### Animaciones y Efectos
- **Scroll Animations**: Elementos aparecen al hacer scroll
- **Hover Effects**: Efectos interactivos en tarjetas y botones
- **Loading States**: Animaciones de carga mientras se procesa
- **Parallax Suave**: Efecto parallax sutil en el hero

## 🔧 Personalización

### Agregar Nuevos Proyectos

1. Agrega el proyecto al objeto `projects` en `script.js`:
```javascript
'mi-proyecto': {
    name: 'Mi Proyecto',
    description: 'Descripción del proyecto',
    files: {
        html: `<!-- Tu código HTML aquí -->`
    }
}
```

2. Agrega la tarjeta en `index.html`:
```html
<div class="project-card" data-category="tu-categoria">
    <!-- Contenido de la tarjeta -->
</div>
```

### Cambiar Colores
Modifica las variables CSS en `styles.css`:
```css
:root {
    --primary-color: #tu-color;
    --secondary-color: #tu-color;
    /* más variables... */
}
```

## 📈 Rendimiento

- **Carga Rápida**: CSS y JavaScript optimizados
- **Imágenes Optimizadas**: Uso de placeholders y lazy loading
- **Minificación**: Archivos comprimidos para producción
- **CDN**: Font Awesome y fuentes cargadas desde CDN

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para nuevos proyectos de animaciones o mejoras:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

- **YouTube**: [@zerotech](https://youtube.com/@zerotech)
- **Email**: hola@zerotech.shop
- **GitHub**: [ZeroTech](https://github.com/zerotech)

---

⭐ **¡No olvides darle una estrella al proyecto si te gustó!** ⭐
