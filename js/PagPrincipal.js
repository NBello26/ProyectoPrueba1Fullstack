// Función para cargar los productos desde localStorage
function cargarProductos() {
    const productosContainer = document.getElementById('products-container');
    const productos = JSON.parse(localStorage.getItem('productos')) || [];

    if (productos.length === 0) {
        productosContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <p>No hay productos disponibles. Agrega algunos productos desde el formulario de administración.</p>
            </div>
        `;
        return;
    }

    productosContainer.innerHTML = '';

    // Obtener solo los primeros 5 productos
    const primerosProductos = productos.slice(0, 5);

    primerosProductos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <div class="product-image">
                Imagen del Producto
            </div>
            <div class="product-info">
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-price">$${producto.precio.toFixed(2)}</p>
                <p class="product-quantity">Disponible: ${producto.cantidad} unidades</p>
                <a href="detallesProducto.html?nombre=${encodeURIComponent(producto.nombre)}" class="product-btn">Ver Detalles</a>
            </div>
        `;

        productosContainer.appendChild(productCard);
    });
}

// Cargar productos cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarProductos);