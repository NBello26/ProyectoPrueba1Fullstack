// Cuando la página carga
window.onload = function() {
    // Obtener el índice del producto desde la URL
    var urlParams = new URLSearchParams(window.location.search);
    var productoIndex = urlParams.get('index');
    
    if (productoIndex === null) {
        alert('Producto no especificado');
        window.location.href = '../adminpage/listproductos.html';
        return;
    }
    
    // Cargar datos del producto
    var productos = JSON.parse(localStorage.getItem('productos')) || [];
    var producto = productos[productoIndex];
    
    if (!producto) {
        alert('Producto no encontrado');
        window.location.href = '../adminpage/listproductos.html';
        return;
    }
    
    // Llenar el formulario
    document.getElementById('indiceProducto').value = productoIndex;
    document.getElementById('nombre').value = producto.nombre || '';
    document.getElementById('precio').value = producto.precio || '';
    document.getElementById('descripcion').value = producto.descripcion || '';
    document.getElementById('cantidad').value = producto.cantidad || '';
    
    // Cuando se envía el formulario
    document.getElementById('formEditarProducto').onsubmit = function(e) {
        e.preventDefault();
        guardarCambios();
    };
};

// Función para guardar cambios
function guardarCambios() {
    var productos = JSON.parse(localStorage.getItem('productos')) || [];
    var index = document.getElementById('indiceProducto').value;
    
    // Validar que el precio y cantidad sean números válidos
    var precio = parseFloat(document.getElementById('precio').value);
    var cantidad = parseInt(document.getElementById('cantidad').value);
    
    if (isNaN(precio) || precio < 0) {
        alert('Por favor, ingrese un precio válido');
        return;
    }
    
    if (isNaN(cantidad) || cantidad < 0) {
        alert('Por favor, ingrese una cantidad válida');
        return;
    }
    
    // Actualizar producto
    productos[index] = {
        nombre: document.getElementById('nombre').value,
        precio: precio,
        descripcion: document.getElementById('descripcion').value,
        cantidad: cantidad
    };
    
    // Guardar en localStorage
    localStorage.setItem('productos', JSON.stringify(productos));
    
    alert('Producto actualizado correctamente');
    window.location.href = '../adminpage/listproductos.html';
}