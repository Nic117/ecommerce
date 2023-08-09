// Obtiene una referencia a los elementos en la página relacionados con el menú lateral
const openMenu = document.querySelector("#open-menu"); // cierra
const closeMenu = document.querySelector("#close-menu"); // abre
const aside = document.querySelector("aside"); // Elemento del menú lateral

// Agrega un evento de clic al botón "Abrir menú" para mostrar el menú lateral
openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible"); // Agrega la clase para mostrar el menú
});

// Agrega un evento de clic al botón "Cerrar menú" para ocultar el menú latear
closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible"); // Remueve la clase para ocultar el menú
});
