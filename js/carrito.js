// obtiene los productos en el carrito almacenados en el localstorage (si existen)
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
// Parsea los productos desde formato JSON a un objeto JS
productosEnCarrito = JSON.parse(productosEnCarrito);
//  definiendo las variables que hacen referencia a diferentes elementos relacionados con el carrito de compras para poder (realizar compra vaciar el carrtio mostrar productos etc) 
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    // Verifica si hay productos en el carrito y si la cantidad es mayor que cero
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        // Oculta el mensaje de carrito vacío al agregar la clase "disabled"
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    // Limpia el contenido HTML de la sección de productos del carrito
        contenedorCarritoProductos.innerHTML = "";

    // Itera a través de una lista de productos
        productosEnCarrito.forEach(producto => {
    // Crea un nuevo elemento <div> para representar el producto en el carrito
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            // Establece el contenido HTML del elemento div con los detalles del producto
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p> 
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

// carga los productos en el carrito al llamar a la función
cargarProductosCarrito();
// Define una función para actualizar los botones de eliminar productos
function actualizarBotonesEliminar() {
    // Selecciona todos los botones de eliminar productos en el carrito
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
// Agrega un evento de clic a cada botón de eliminar
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}
// Función para eliminar un producto del carrito
function eliminarDelCarrito(e) {
    // Muestra una notificación de que el producto ha sido eliminado
    Toastify({
        text: "Producto eliminado",
        duration: 2000,
        close: true, // Permite cerrar manualmente la notificación
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, // Detiene el temporizador al enfocar
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
          },
        onClick: function(){} // Acción al hacer clic en la notificación (en este caso no realiza nada)
      }).showToast();
      // Obtiene el ID del botón que disparó el evento
    const idBoton = e.currentTarget.id;
    // Encuentra el índice del producto en el arreglo de productosEnCarrito segun el ID
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
      // Elimina el producto del carrito 
    productosEnCarrito.splice(index, 1); //use splice para eliminar un producto especifico del carrito 
    // Carga otra vez
    cargarProductosCarrito();
     // Actualiza en el almacenamiento local
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

// Agrega un evento clic al botón "Vaciar carrito" y llama a la función vaciarCarrito
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
// Muestra una ventana de confirmación utilizando la biblioteca Swal
    Swal.fire({
        title: '¿Seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        // Si el usuario confirma la acción
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            // Actualiza el almacenamiento local con el carrito vacío
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            // y lo vuelve a cargar
            cargarProductosCarrito();
        }
      })
}

// Función para actualizar el total de la compra 
function actualizarTotal() {
    // Calcula el total, sumando el precio de todos los productos en el carrito por la cantidad
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}
// Agrega un evento de clic al botón "Comprar" y llama a la función comprarCarrito
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
     // Actualiza el almacenamiento local con el carrito vacío
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

      // Oculta los elementos relacionados con el carrito 
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}