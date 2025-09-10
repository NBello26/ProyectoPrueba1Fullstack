// Función para mostrar/ocultar info extra de cada desarrollador
function mostrarInfo(id) {
    const elemento = document.getElementById(id);
    if (elemento.style.display === "block") {
        elemento.style.display = "none";
    } else {
        elemento.style.display = "block";
    }
}
