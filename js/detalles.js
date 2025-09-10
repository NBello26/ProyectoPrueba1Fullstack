// Función para obtener el nombre del producto de la URL
function getProductNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    // Decodificar el nombre para manejar correctamente los espacios y caracteres especiales
    return decodeURIComponent(urlParams.get('nombre') || '');
}

// Función para buscar un producto por nombre en el localStorage
function findProductByName(name) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    return productos.find(producto => producto.nombre === name);
}

// Función para agregar producto al carrito
function agregarAlCarrito(producto) {
    // Obtener el carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === producto.nombre);
    
    if (productoExistente) {
        // Si ya existe, aumentar la cantidad
        productoExistente.cantidadCarrito = (productoExistente.cantidadCarrito || 1) + 1;
    } else {
        // Si no existe, agregar nuevo producto al carrito
        // Crear una copia del producto para no modificar el original
        const productoCarrito = {
            ...producto,
            cantidadCarrito: 1  // Cantidad en el carrito
        };
        carrito.push(productoCarrito);
    }
    
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Mostrar mensaje de confirmación
    alert(`"${producto.nombre}" se ha añadido al carrito`);
    
    // Actualizar contador de carrito en todas las páginas
    actualizarContadorCarrito();
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, producto) => total + (producto.cantidadCarrito || 1), 0);
    
    // Actualizar en la página actual si existe el elemento
    const contadorCarrito = document.getElementById('contador-carrito');
    if (contadorCarrito) {
        contadorCarrito.textContent = totalItems;
    }
    
    // Disparar evento personalizado para que otras páginas puedan actualizarse
    window.dispatchEvent(new Event('storage'));
}

// Agregar event listeners a los botones después de cargar el producto
function setupBotonesCarrito() {
    const btnAnadirCarrito = document.querySelector('.btn-primary');
    const btnComprarAhora = document.querySelector('.btn-secondary');
    
    if (btnAnadirCarrito) {
        btnAnadirCarrito.addEventListener('click', function() {
            const productName = getProductNameFromURL();
            const producto = findProductByName(productName);
            if (producto) {
                agregarAlCarrito(producto);
            }
        });
    }
    
    if (btnComprarAhora) {
        btnComprarAhora.addEventListener('click', function() {
            const productName = getProductNameFromURL();
            const producto = findProductByName(productName);
            if (producto) {
                agregarAlCarrito(producto);
                // Redirigir al carrito después de agregar
                window.location.href = 'carrito.html';
            }
        });
    }
}

// Función para cargar los detalles del producto
function loadProductDetails() {
    const productName = getProductNameFromURL();
    const productContent = document.getElementById('product-content');
    
    if (!productName) {
        productContent.innerHTML = `
            <div class="not-found">
                <h2>Producto no especificado</h2>
                <p>No se ha especificado un producto para mostrar.</p>
                <a href="tienda.html" class="btn btn-primary">Volver a la tienda</a>
            </div>
        `;
        return;
    }
    
    const product = findProductByName(productName);
    
    if (product) {
        productContent.innerHTML = `
            <div class="product-details">
                <div class="product-image">
                    <!-- Imagen del producto (usaremos una imagen por defecto) -->
                </div>
                
                <div class="product-info">
                    <h1 class="product-title">${product.nombre}</h1>
                    <p class="product-price">$${product.precio.toFixed(2)}</p>
                    
                    <div class="product-meta">
                        <p class="product-quantity">Disponible: ${product.cantidad} unidades</p>
                    </div>
                    
                    <div class="product-description">
                        <h3>Descripción</h3>
                        <p>${product.descripcion}</p>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-primary">Añadir al Carrito</button>
                        <button class="btn btn-secondary">Comprar Ahora</button>
                        <a href="tienda.html" class="btn btn-outline">Seguir Comprando</a>
                    </div>
                </div>
            </div>
        `;
        
        // Configurar los event listeners para los botones
        setupBotonesCarrito();
    } else {
        productContent.innerHTML = `
            <div class="not-found">
                <h2>Producto no encontrado</h2>
                <p>El producto "${productName}" no existe en nuestro catálogo.</p>
                <a href="tienda.html" class="btn btn-primary">Volver a la tienda</a>
            </div>
        `;
    }
}

// Actualizar contador del carrito al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    loadProductDetails();
    actualizarContadorCarrito();
});