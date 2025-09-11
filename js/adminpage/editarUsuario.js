// Datos simples de comunas por región
var comunasPorRegion = {
    "Lagos": ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"],
    "Metropolitana": ["Santiago", "Providencia", "Las Condes", "Maipú", "Ñuñoa"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
    "Biobío": ["Concepción", "Talcahuano", "Chiguayante", "Los Ángeles"],
    "Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"]
};

// Cuando la página carga
window.onload = function() {
    // Obtener el índice del usuario desde la URL
    var urlParams = new URLSearchParams(window.location.search);
    var usuarioIndex = urlParams.get('index');
    
    if (usuarioIndex === null) {
        alert('Usuario no especificado');
        window.location.href = '../adminpage/listusuarios.html';
        return;
    }
    
    // Cargar datos del usuario
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    var usuario = usuarios[usuarioIndex];
    
    if (!usuario) {
        alert('Usuario no encontrado');
        window.location.href = '../adminpage/listusuarios.html';
        return;
    }
    
    // Llenar el formulario
    document.getElementById('indiceUsuario').value = usuarioIndex;
    document.getElementById('nombre').value = usuario.nombre || '';
    document.getElementById('correo').value = usuario.correo || '';
    document.getElementById('telefono').value = usuario.telefono || '';
    document.getElementById('region').value = usuario.region || '';
    document.getElementById('tipusuario').value = usuario.tipusuario || 'usuario';
    
    // Cargar comunas según la región del usuario
    cargarComunas(usuario.region, usuario.comuna);
    
    // Cuando cambia la región, cargar sus comunas
    document.getElementById('region').onchange = function() {
        cargarComunas(this.value);
    };
    
    // Cuando se envía el formulario
    document.getElementById('formEditarUsuario').onsubmit = function(e) {
        e.preventDefault();
        guardarCambios();
    };
};

// Función para cargar comunas
function cargarComunas(region, comunaSeleccionada) {
    var selectComuna = document.getElementById('comuna');
    selectComuna.innerHTML = '<option value="">Seleccione comuna</option>';
    
    if (region && comunasPorRegion[region]) {
        for (var i = 0; i < comunasPorRegion[region].length; i++) {
            var comuna = comunasPorRegion[region][i];
            var option = document.createElement('option');
            option.value = comuna;
            option.textContent = comuna;
            
            // Seleccionar la comuna si coincide
            if (comuna === comunaSeleccionada) {
                option.selected = true;
            }
            
            selectComuna.appendChild(option);
        }
    }
}

// Función para guardar cambios
function guardarCambios() {
    var region = document.getElementById('region').value;
    var comuna = document.getElementById('comuna').value;
    
    if (!region || !comuna) {
        alert('Por favor, seleccione una región y una comuna');
        return;
    }
    
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    var index = document.getElementById('indiceUsuario').value;
    
    // Actualizar usuario
    usuarios[index] = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value,
        region: region,
        comuna: comuna,
        tipusuario: document.getElementById('tipusuario').value
    };
    
    // Guardar en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    alert('Usuario actualizado correctamente');
    window.location.href = '../adminpage/listusuarios.html';
}