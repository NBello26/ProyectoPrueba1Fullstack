function cargarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const tabla = document.getElementById("tablaClientes"); // o cámbiale el id a "tablaUsuarios" si quieres
    tabla.innerHTML = "";

    usuarios.forEach(usuario => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.region}</td>
            <td>${usuario.comuna}</td>
            <td>${usuario.tipusuario}</td>
        `;
        tabla.appendChild(fila);
    });
}

window.onload = cargarUsuarios;
