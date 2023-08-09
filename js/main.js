let productos = [];
// solicitud Fetch para obtener los datos de un archivo JSON de productos
fetch("./js/productos.json")
    .then(response => response.json()) // Convierte la respuesta en formato JSON
    .then(data => {
        productos = data; // Asigna los datos al arreglo productos
        cargarProductos(productos); // Llama a la función para cargar los productos 
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))

// Función para cargar productos en la interfaz
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

// Itera a través de los productos elegidos y crea elementos en la interfaz
    productosElegidos.forEach(producto => {
// Crea un nuevo elemento div que representa cada producto
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
 // Agrega el nuevo elemento div con los detalles del producto al contenedor de productos
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

// Evento de clic a cada botón de categoría
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
   // Remueve la clase "active" de todos los botones de categoría
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
         // Agrega la clase "active" al botón de categoría que el usuario hizo clic
        e.currentTarget.classList.add("active");
        //verifica si hizo clic en la opcion todos
        if (e.currentTarget.id != "todos") {
             // Encuentra el producto de la categoría seleccionada
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

// Función para actualizar los botones de agregar productos
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

// Obtiene los productos en el carrito almacenados en el local storage
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    // Llama a la función para actualizar el numerito del carrito
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({  //muestra en pantalla este mensaje
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
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
        onClick: function(){} 
      }).showToast();

// Obtiene el ID del botón que inicio el evento
    const idBoton = e.currentTarget.id;
    // Busca el producto en el arreglo de productos segun su ID
    const productoAgregado = productos.find(producto => producto.id === idBoton);
// Verifica si el producto ya está en el carrito
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        //incrementa los productos
        productosEnCarrito[index].cantidad++;
    } else {
        // Si el producto no está en el carrito, agrega una propiedad de cantidad y establece en 1
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}
// Actualiza el numerito del carrito en la interfaz
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}