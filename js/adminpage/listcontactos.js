document.addEventListener('DOMContentLoaded', function() {
    // Obtener la lista de contactos del localStorage
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    const tablaContactos = document.getElementById('tabla-contactos').getElementsByTagName('tbody')[0];
    const mensajeVacio = document.getElementById('mensaje-vacio');
    
    // Si no hay contactos, mostrar mensaje y ocultar tabla
    if (contactos.length === 0) {
        tablaContactos.parentNode.style.display = 'none';
        mensajeVacio.style.display = 'block';
        return;
    }
    
    // Generar filas para cada contacto
    contactos.forEach(contacto => {
        const fila = tablaContactos.insertRow();
        
        const celdaNombre = fila.insertCell(0);
        const celdaCorreo = fila.insertCell(1);
        const celdaComentario = fila.insertCell(2);
        
        celdaNombre.textContent = contacto.nombre;
        celdaCorreo.textContent = contacto.correo;
        celdaComentario.textContent = contacto.comentario;
    });
});