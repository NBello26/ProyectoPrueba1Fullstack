function cargarCarrito() {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const carritoItems = document.getElementById('carrito-items');
      const carritoVacio = document.getElementById('carrito-vacio');
      const carritoContenido = document.getElementById('carrito-contenido');
      const carritoTotal = document.getElementById('carrito-total');

      carritoItems.innerHTML = '';

      if (carrito.length === 0) {
        carritoVacio.classList.remove('carrito-hidden');
        carritoContenido.classList.add('carrito-hidden');
        return;
      }

      carritoVacio.classList.add('carrito-hidden');
      carritoContenido.classList.remove('carrito-hidden');

      let total = 0;

      carrito.forEach((producto, index) => {
        const cantidad = producto.cantidadCarrito || 1;
        const subtotal = producto.precio * cantidad;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${producto.nombre}</td>
          <td>${producto.descripcion}</td>
          <td>$${producto.precio.toLocaleString()}</td>
          <td>${cantidad}</td>
          <td>$${subtotal.toLocaleString()}</td>
          <td><button class="carrito-btn carrito-btn-danger" data-index="${index}">Eliminar</button></td>
        `;
        carritoItems.appendChild(row);
      });

      carritoTotal.textContent = `Total: $${total.toLocaleString()}`;

      document.querySelectorAll('.carrito-btn-danger').forEach(btn => {
        btn.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index'));
          if (confirm("¿Seguro que deseas eliminar este producto?")) {
            eliminarDelCarrito(index);
          }
        });
      });
    }

    function eliminarDelCarrito(index) {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      cargarCarrito();
    }

    function vaciarCarrito() {
      if (confirm("¿Seguro que deseas vaciar todo el carrito?")) {
        localStorage.removeItem('carrito');
        cargarCarrito();
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      cargarCarrito();

      document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

      document.getElementById('finalizar-compra').addEventListener('click', () => {
        alert("¡Compra finalizada con éxito! 🎉 Gracias por tu compra.");
        localStorage.removeItem('carrito');
        cargarCarrito();
      });
    });