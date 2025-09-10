
function cargarProductos() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const tabla = document.getElementById("tablaProductos");
    tabla.innerHTML = "";

    productos.forEach(producto => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.cantidad}</td>
                `;
        tabla.appendChild(fila);
    });
}

window.onload = cargarProductos;