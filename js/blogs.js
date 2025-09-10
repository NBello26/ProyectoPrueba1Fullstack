// Ejemplo: mostrar un mensaje al presionar los botones
document.querySelectorAll(".blog-info button").forEach(btn => {
    btn.addEventListener("click", () => {
        alert("Aquí se mostraría el caso completo.");
    });
});
