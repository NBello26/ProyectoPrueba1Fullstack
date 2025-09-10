document.getElementById("formProducto").addEventListener("submit", function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    let nombre = document.getElementById("nombre").value;
    let precio = parseFloat(document.getElementById("precio").value);
    let descripcion = document.getElementById("descripcion").value;
    let cantidad = parseInt(document.getElementById("cantidad").value);

    // Validaciones básicas
    if (nombre.trim() === "") {
        alert("El nombre del producto es obligatorio.");
        return;
    }

    if (isNaN(precio) || precio < 0) {
        alert("El precio debe ser un número válido mayor o igual a 0.");
        return;
    }

    if (descripcion.trim() === "") {
        alert("La descripción es obligatoria.");
        return;
    }

    if (isNaN(cantidad) || cantidad < 0) {
        alert("La cantidad debe ser un número válido mayor o igual a 0.");
        return;
    }

    // Crear objeto producto
    let producto = {
        "nombre": nombre,
        "precio": precio,
        "descripcion": descripcion,
        "cantidad": cantidad
    };

    // Guardar en localStorage
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));

    alert("Producto registrado correctamente");
    // Opcional: limpiar formulario
    document.getElementById("formProducto").reset();
});
