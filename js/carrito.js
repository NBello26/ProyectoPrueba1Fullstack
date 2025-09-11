// Función que carga el contenido del carrito desde el localStorage y lo muestra en la interfaz
function cargarCarrito() {
  // Se obtiene el carrito desde el localStorage. Si no existe, se inicializa como un arreglo vacío.
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Se obtienen los elementos del DOM donde se van a mostrar los productos y la información del carrito.
  const carritoItems = document.getElementById('carrito-items');
  const carritoVacio = document.getElementById('carrito-vacio');
  const carritoContenido = document.getElementById('carrito-contenido');
  const carritoTotal = document.getElementById('carrito-total');

  // Se limpia el contenido previo de la lista de productos en el carrito.
  carritoItems.innerHTML = '';

  // Si el carrito está vacío, se muestra un mensaje de "Carrito vacío" y se oculta el contenido del carrito.
  if (carrito.length === 0) {
    carritoVacio.classList.remove('carrito-hidden');  // Muestra el mensaje de "Carrito vacío".
    carritoContenido.classList.add('carrito-hidden'); // Oculta el contenido del carrito.
    return;
  }

  // Si hay productos en el carrito, se muestra el contenido y se oculta el mensaje de "Carrito vacío".
  carritoVacio.classList.add('carrito-hidden');
  carritoContenido.classList.remove('carrito-hidden');

  // Variable para acumular el total de la compra.
  let total = 0;

  // Recorremos cada producto en el carrito.
  carrito.forEach((producto, index) => {
    // Se obtiene la cantidad de productos en el carrito (si no existe se asigna 1).
    const cantidad = producto.cantidadCarrito || 1;

    // Se calcula el subtotal para cada producto.
    const subtotal = producto.precio * cantidad;

    // Se acumula el subtotal al total general.
    total += subtotal;

    // Se crea una nueva fila para el producto en la tabla del carrito.
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.descripcion}</td>
      <td>$${producto.precio.toLocaleString()}</td>
      <td>${cantidad}</td>
      <td>$${subtotal.toLocaleString()}</td>
      <td><button class="carrito-btn carrito-btn-danger" data-index="${index}">Eliminar</button></td>
    `;
    carritoItems.appendChild(row); // Añadimos la fila a la tabla de productos.
  });

  // Se muestra el total de la compra.
  carritoTotal.textContent = `Total: $${total.toLocaleString()}`;

  // Se asigna un evento a cada botón de eliminar producto.
  document.querySelectorAll('.carrito-btn-danger').forEach(btn => {
    btn.addEventListener('click', function() {
      // Obtenemos el índice del producto a eliminar desde el atributo 'data-index'.
      const index = parseInt(this.getAttribute('data-index'));

      // Preguntamos al usuario si realmente quiere eliminar el producto.
      if (confirm("¿Seguro que deseas eliminar este producto?")) {
        eliminarDelCarrito(index); // Si confirma, eliminamos el producto.
      }
    });
  });
}

// Función que elimina un producto del carrito según su índice.
function eliminarDelCarrito(index) {
  // Obtenemos el carrito desde el localStorage.
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Eliminamos el producto en la posición 'index'.
  carrito.splice(index, 1);

  // Actualizamos el carrito en el localStorage.
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Volvemos a cargar el carrito para reflejar los cambios.
  cargarCarrito();
}

// Función para vaciar todo el carrito.
function vaciarCarrito() {
  // Preguntamos al usuario si está seguro de vaciar el carrito.
  if (confirm("¿Seguro que deseas vaciar todo el carrito?")) {
    // Si confirma, eliminamos el carrito del localStorage.
    localStorage.removeItem('carrito');

    // Volvemos a cargar el carrito (que ahora estará vacío).
    cargarCarrito();
  }
}

// Este bloque de código se ejecuta cuando la página ya ha sido cargada.
document.addEventListener('DOMContentLoaded', () => {
  // Cargamos el carrito desde el localStorage.
  cargarCarrito();

  // Se asigna un evento para vaciar el carrito cuando se haga clic en el botón de "Vaciar carrito".
  document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

  // Se asigna un evento para finalizar la compra cuando se haga clic en el botón de "Finalizar compra".
  document.getElementById('finalizar-compra').addEventListener('click', () => {
    alert("¡Compra finalizada con éxito! 🎉 Gracias por tu compra.");

    // Limpiamos el carrito en el localStorage y volvemos a cargarlo.
    localStorage.removeItem('carrito');
    cargarCarrito();
  });
});