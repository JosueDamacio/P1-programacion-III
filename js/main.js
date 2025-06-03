//?---------------------------FRUTAS---------------------------------------
let listaFrutas = [
    { id: 1, nombre: "Arandano", precio: 100, img: "img/arandano.jpg" },
    { id: 2, nombre: "Banana", precio: 93, img: "img/banana.jpg" },
    { id: 3, nombre: "Frambuesa", precio: 40, img: "img/frambuesa.png" },
    { id: 4, nombre: "Frutilla", precio: 75, img: "/img/frutilla.jpg" },
    { id: 5, nombre: "Kiwi", precio: 100, img: "/img/kiwi.jpg" },
    { id: 6, nombre: "Mandarina", precio: 93, img: "/img/mandarina.jpg" },
    { id: 7, nombre: "Manzana", precio: 40, img: "/img/manzana.jpg" },
    { id: 8, nombre: "Naranja", precio: 75, img: "/img/naranja.jpg" },
    { id: 9, nombre: "Pera", precio: 100, img: "/img/pera.jpg" },
    { id: 10, nombre: "Anana", precio: 93, img: "/img/anana.jpg" },
    { id: 11, nombre: "Pomelo Amarillo", precio: 40, img: "/img/pomelo-amarillo.jpg" },
    //tampoco incluyo sandia :D
    //{ id: 13, nombre: "Sandia", precio: 100, img: "/img/sandia.jpg" },
    { id: 12, nombre: "Pomelo Rojo", precio: 75, img: "/img/pomelo-rojo.jpg" }

];

//?------------------------------------------------------------------------------------
//?---------------------------CONEXION ETIQUETAS---------------------------------------
let contenedorProductos = document.getElementById("contenedor-productos");
let inputBuscar = document.getElementById("barra-busqueda");//*guardamos el imput
let itemsCarrito = document.getElementById("items-carrito");


let precioTotal = document.getElementById("precio-total");
let cantidadFrutas = document.getElementById("contador-carrito");

//?---------------------------BUSCADOR CON FILTRO---------------------------
//un escuchador escucha lo que el usuario toca (de cada accion, en esta caso tocar teclas)

inputBuscar.addEventListener("keyup",filtrarProductos);


function filtrarProductos(){
    let valorInput = inputBuscar.value;
    //guarda productos con el mismo titulo en un nuevo array de objetos
    let listaFrutasFiltradas = listaFrutas.filter(producto => producto.nombre.toLowerCase().includes(valorInput.toLowerCase()));
    //reutiliza la funcion para sobreescribir los productos filtrados segun el input
    mostrarProductos(listaFrutasFiltradas);
}
//?------------------------------------------------------------------------------------
//?----------------------PRODUCTOS MOSTRADOS DINAMICAMENTE-----------------------------
function mostrarProductos(array) {
    //la varaible se inicializa acá y no afuera porque sino se agrega a los productos en vez de reemplazar
    let htmlProductos = "";

    array.forEach(producto => {
        htmlProductos += `
        <div class="card-producto">
            <img src="${producto.img}" alt="">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button onclick=agregarProducto(${producto.id})>Agregar al carrito</button>
        </div>`;
    });
    contenedorProductos.innerHTML = htmlProductos;
}
//?------------------------------------------------------------------------------------
//?---------------------------CARRITO--------------------------------------------------

let carrito = [];

//calcula y muestra los productos añadidos al carro y modifica el valor total
function mostrarCarrito(array) {
    //los contadores y acumuladores van acá para cambiar dinamicamnete
    //segun la interaccion que tenga el usuario
    let htmlCarrito = "";
    let htmlPrecioTotal = 0;
    let htmlCantidadFrutas = 0;
    array.forEach(producto => {
        htmlCarrito += `
        <li class="bloque-item">
            <p class="nombre-item">${producto.nombre} - ${producto.precio}</p>
            <button onclick="eliminarProducto(${producto.id})" class= "boton-eliminar">Eliminar</button>
        </li>
        `;
        htmlPrecioTotal += (producto.precio);
        htmlCantidadFrutas+=1;
    });
    itemsCarrito.innerHTML = htmlCarrito;
    precioTotal.innerHTML = htmlPrecioTotal;
    cantidadFrutas.innerHTML = htmlCantidadFrutas;
}

//?--------PRODUCTOS---------

function agregarProducto(id) {
    //agragar al carrito por su ID de producto
    //guardamos cada objeto encontrado de la lista que cumpla con el 'find'
    let objetoEncontrado = listaFrutas.find(producto => producto.id === id); // cuando ocuap mas de una linea se usa {return}

    carrito.push(objetoEncontrado); // push es para meter objetos a un array

    mostrarCarrito(carrito);
}

function eliminarProducto(id) {

    //*elimina solo uno de los productos (por eso use splice en vez de filter)
    const index = carrito.findIndex(producto => producto.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
    }
    mostrarCarrito(carrito);

    //*esto elimina todos los productos con la misma ID
    // carrito = carrito.filter(producto => producto.id !== id);
    // mostrarCarrito(carrito);

}

function init() {
    mostrarProductos(listaFrutas);
    mostrarCarrito(carrito);
}
init();