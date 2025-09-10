// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, producto) => total + (producto.cantidadCarrito || 1), 0);
    
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = totalItems;
    }
}

// Actualizar al cargar la página
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);

// Actualizar cuando cambie el localStorage
window.addEventListener('storage', actualizarContadorCarrito);