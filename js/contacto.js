document.getElementById("formContacto").addEventListener("submit", function(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let comentario = document.getElementById("comentario").value.trim();

    // Validaciones
    if (nombre === "" || nombre.length > 100) {
        alert("El nombre es requerido y debe tener máximo 100 caracteres.");
        return;
    }

    if (correo.length > 100) {
        alert("El correo no debe superar los 100 caracteres.");
        return;
    }

    if (
        !correo.endsWith("@duoc.cl") &&
        !correo.endsWith("@profesor.duoc.cl") &&
        !correo.endsWith("@gmail.com")
    ) {
        alert("El correo debe ser de los dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com");
        return;
    }

    if (comentario === "" || comentario.length > 500) {
        alert("El comentario es requerido y debe tener máximo 500 caracteres.");
        return;
    }

    // Crear objeto
    let contacto = {
        nombre: nombre,
        correo: correo,
        comentario: comentario
    };

    // Obtener contactos anteriores
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    // Guardar el nuevo contacto
    contactos.push(contacto);
    localStorage.setItem("contactos", JSON.stringify(contactos));

    alert("Mensaje enviado correctamente ✅");

    // Resetear formulario
    document.getElementById("formContacto").reset();
});
