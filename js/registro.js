document.getElementById("formEstudiante").addEventListener("submit", function(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let confirmarCorreo = document.getElementById("confirmarCorreo").value;
    let contrasena = document.getElementById("contrasena").value;
    let confirmarContrasena = document.getElementById("confirmarContrasena").value;
    let telefono = document.getElementById("telefono").value;
    let region = document.getElementById("region").value;
    let comuna = document.getElementById("comuna").value;
    let tipusuario = "cliente";

    // Validación básica

    // Validación de correo: que sea uno de los dominios permitidos
    if (!correo.includes("@duoc.cl") && !correo.includes("@profesor.duoc.cl") && !correo.includes("@gmail.com")) {
        alert("El correo debe ser de los dominios: @duoc.cl, @profesor.duoc.cl, o @gmail.com");
        return;
    }

    if (correo !== confirmarCorreo) {
        alert("Los correos no coinciden.");
        return;
    }

    if (contrasena.length < 4 || contrasena.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return;
    }
    if (contrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden.");
        return;
    }
    

    let usuario = {        
        "nombre": nombre,
        "correo": correo,
        "contrasena": contrasena,
        "telefono": telefono,
        "region": region,
        "comuna": comuna,
        "tipusuario": tipusuario
    };

    // Obtener los usuarios existentes del localStorage o inicializar un array vacío si no hay usuarios almacenados
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Añadir el nuevo usuario al array
    usuarios.push(usuario);

    // Llamar a la función guardarUsuarios para guardar el array actualizado en localStorage
    guardarUsuarios(usuarios);

    console.log(usuarios);
    alert("Datos guardados correctamente");
});


function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


// Datos de comunas por región
var comunasPorRegion = {
    "Lagos": ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"],
    "Metropolitana": ["Santiago", "Providencia", "Las Condes", "Maipú", "Ñuñoa"],
    "Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"],
    "Biobío": ["Concepción", "Talcahuano", "Chiguayante", "Los Ángeles"]
};

// Función para cargar comunas según la región seleccionada
function cargarComunas() {
    var region = document.getElementById("region").value;
    var comunaSelect = document.getElementById("comuna");

    // Limpiar opciones previas
    comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';

    if (region && comunasPorRegion[region]) {
        comunasPorRegion[region].forEach(function(c) {
            var option = document.createElement("option");
            option.value = c;
            option.textContent = c;
            comunaSelect.appendChild(option);
        });
    }
}