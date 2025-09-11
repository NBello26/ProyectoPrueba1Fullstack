function cargarProductos() {
    var productos = JSON.parse(localStorage.getItem("productos")) || [];
    var tabla = document.getElementById("tablaProductos");
    tabla.innerHTML = "";

    for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];
        var fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.cantidad}</td>
            <td>
                <button class="btn-editar" data-index="${i}">Editar</button>
            </td>
        `;
        tabla.appendChild(fila);
    }

    // Agregar event listeners a los botones de editar
    var botonesEditar = document.querySelectorAll('.btn-editar');
    for (var j = 0; j < botonesEditar.length; j++) {
        botonesEditar[j].addEventListener('click', function() {
            var index = this.getAttribute('data-index');
            window.location.href = 'editarProducto.html?index=' + index;
        });
    }
}

window.onload = cargarProductos;