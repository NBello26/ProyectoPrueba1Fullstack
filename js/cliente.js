
function cargarClientes() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const clientes = usuarios.filter(u => u.tipusuario === "cliente");

    const tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";

    clientes.forEach(cliente => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                    <td>${cliente.nombre}</td>
                    <td>${cliente.correo}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.region}</td>
                    <td>${cliente.comuna}</td>
                `;
        tabla.appendChild(fila);
    });
}

window.onload = cargarClientes;
