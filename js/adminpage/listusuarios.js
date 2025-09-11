function cargarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";

    usuarios.forEach((usuario, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.region}</td>
            <td>${usuario.comuna}</td>
            <td>${usuario.tipusuario}</td>
            <td>
                <button class="btn-editar" data-index="${index}">Editar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });

    // Agregar event listeners a los botones de editar
    document.querySelectorAll('.btn-editar').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            window.location.href = `editarUsuario.html?index=${index}`;
        });
    });
}

window.onload = cargarUsuarios;