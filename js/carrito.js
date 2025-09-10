// Función para cargar los items del carrito
function cargarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const carritoVacio = document.getElementById('carrito-vacio');
    const carritoTotal = document.getElementById('carrito-total');
    const totalPrecio = document.getElementById('total-precio');
    
    // Obtener carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Limpiar el contenedor de items
    carritoItems.innerHTML = '';
    
    if (carrito.length === 0) {
        carritoVacio.classList.remove('carrito-hidden');
        carritoTotal.classList.add('carrito-hidden');
        actualizarContadorCarrito();
        return;
    }
    
    carritoVacio.classList.add('carrito-hidden');
    carritoTotal.classList.remove('carrito-hidden');
    
    // Generar HTML para cada item del carrito
    let total = 0;
    
    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * (producto.cantidadCarrito || 1);
        total += subtotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'carrito-item';
        itemElement.innerHTML = `
            <div class="item-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
            </div>
            <div class="item-precio">$${producto.precio.toFixed(2)}</div>
            <div class="item-cantidad">${producto.cantidadCarrito || 1}</div>
            <div class="item-total">$${subtotal.toFixed(2)}</div>
            <button class="carrito-btn carrito-btn-danger" data-index="${index}">Eliminar</button>
        `;
        
        carritoItems.appendChild(itemElement);
    });
    
    totalPrecio.textContent = total.toFixed(2);
    actualizarContadorCarrito();
    
    // Agregar event listeners a los botones de eliminar
    document.querySelectorAll('.carrito-btn-danger').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            eliminarDelCarrito(index);
        });
    });
}

// Función para eliminar un item del carrito
function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (index >= 0 && index < carrito.length) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        localStorage.removeItem('carrito');
        cargarCarrito();
    }
}

// Cargar el carrito cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    cargarCarrito();
    
    // Event listener para el botón de vaciar carrito
    const vaciarBtn = document.getElementById('vaciar-carrito-btn');
    if (vaciarBtn) {
        vaciarBtn.addEventListener('click', vaciarCarrito);
    }
    
    // Event listener para el botón de finalizar compra
    const finalizarBtn = document.querySelector('.carrito-btn-success');
    if (finalizarBtn) {
        finalizarBtn.addEventListener('click', function() {
            alert('¡Compra finalizada con éxito! Gracias por tu compra.');
            localStorage.removeItem('carrito');
            cargarCarrito();
        });
    }
});