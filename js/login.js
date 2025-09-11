document.getElementById("formLogin").addEventListener("submit", function(e) {
    e.preventDefault();

    let correoLogin = document.getElementById("correoLogin").value;
    let contrasenaLogin = document.getElementById("contrasenaLogin").value;

    // Obtener los usuarios almacenados en localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar el usuario que coincida con el correo y la contraseña
    let usuarioEncontrado = usuarios.find(usuario => usuario.correo === correoLogin && usuario.contrasena === contrasenaLogin);

    if (usuarioEncontrado) {
        // Redirigir según el tipo de usuario
        if (usuarioEncontrado.tipusuario === "usuario") {
            window.location.href = "paginaPrincipal.html"; // Redirige a la página principal
        } else if (usuarioEncontrado.tipusuario === "vendedor") {
            window.location.href = "pagvendedor.html"; // Redirige a la página de vendedor
        } else if (usuarioEncontrado.tipusuario === "admin") {
            window.location.href = "../html/adminpage/pagadmin.html"; // Redirige a la página de admin
        }
    } else {
        alert("Correo o contraseña incorrectos");
    }
});