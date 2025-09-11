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
    
    // Limpiar select de comuna
    comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';
    
    if (region && comunasPorRegion[region]) {
        // Cargar comunas de la región seleccionada
        for (var i = 0; i < comunasPorRegion[region].length; i++) {
            var option = document.createElement("option");
            option.value = comunasPorRegion[region][i];
            option.textContent = comunasPorRegion[region][i];
            comunaSelect.appendChild(option);
        }
    }
}

// Cuando se envía el formulario
document.getElementById("formAdmin").onsubmit = function(e) {
    e.preventDefault();

    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var confirmarCorreo = document.getElementById("confirmarCorreo").value;
    var contrasena = document.getElementById("contrasena").value;
    var confirmarContrasena = document.getElementById("confirmarContrasena").value;
    var telefono = document.getElementById("telefono").value;
    var region = document.getElementById("region").value;
    var comuna = document.getElementById("comuna").value;
    var tipusuario = document.getElementById("tipusuario").value;

    // Validaciones básicas
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
    
    if (!region) {
        alert("Por favor, seleccione una región.");
        return;
    }
    
    if (!comuna) {
        alert("Por favor, seleccione una comuna.");
        return;
    }

    var usuario = {        
        "nombre": nombre,
        "correo": correo,
        "contrasena": contrasena,
        "telefono": telefono,
        "region": region,
        "comuna": comuna,
        "tipusuario": tipusuario
    };

    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente");
    this.reset();
    // Limpiar select de comuna
    document.getElementById("comuna").innerHTML = '<option value="">Seleccione comuna</option>';
};