// Obtener productos desde localStorage
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Contenedor donde se mostrarán
let lista = document.getElementById("listaProductos");

// Mostrar productos
if (productos.length === 0) {
  lista.innerHTML = "<p>No hay productos registrados.</p>";
} else {
  productos.forEach(prod => {
    let card = document.createElement("div");
    card.className = "card";

    // Codificar nombre en URL
    let nombreEncode = encodeURIComponent(prod.nombre);

    card.innerHTML = `
      <div class="image-placeholder">Espacio para imagen</div>
      <h2>${prod.nombre}</h2>
      <p class="precio">Precio: $${prod.precio.toFixed(2)}</p>
      <p><strong>Cantidad:</strong> ${prod.cantidad}</p>
      <button onclick="verDetalles('${nombreEncode}')">Ver detalles</button>
    `;

    lista.appendChild(card);
  });
}

// Función para redirigir a detallesProducto
function verDetalles(nombreProducto) {
  window.location.href = `detallesProducto.html?nombre=${nombreProducto}`;
}