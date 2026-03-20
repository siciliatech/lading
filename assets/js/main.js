document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionamos el menú de navegación (Header)
    const navbar = document.querySelector('.navbar');

    // 2. Escuchamos el evento de scroll en la ventana
    window.addEventListener('scroll', () => {
        // Si el usuario bajó más de 20 píxeles...
        if (window.scrollY > 20) {
            // Hacemos el menú un poco más delgado y le damos una sombra corporativa sutil
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
            navbar.style.transition = 'all 0.3s ease';
        } else {
            // Volvemos al estado original (sombra súper ligera del nuevo CSS)
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
        }
    });

    // 3. Mensaje de confirmación en consola para verificar que el JS cargó bien
    console.log("🚀 Arquitectura de Sicilia Labs inicializada correctamente.");
});