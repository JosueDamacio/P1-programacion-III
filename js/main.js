//?---------------------------FRUTAS---------------------------------------
let arrayFrutas = [
    { id: 1, nombre: "Arandano", precio: 5000, img: "img/arandano.jpg" },
    { id: 2, nombre: "Banana", precio: 1000, img: "img/banana.jpg" },
    { id: 3, nombre: "Frambuesa", precio: 4000, img: "img/frambuesa.png" },
    { id: 4, nombre: "Frutilla", precio: 3000, img: "/img/frutilla.jpg" },
    { id: 5, nombre: "Kiwi", precio: 2000, img: "/img/kiwi.jpg" },
    { id: 6, nombre: "Mandarina", precio: 800, img: "/img/mandarina.jpg" },
    { id: 7, nombre: "Manzana", precio: 1500, img: "/img/manzana.jpg" },
    { id: 8, nombre: "Naranja", precio: 900, img: "/img/naranja.jpg" },
    { id: 9, nombre: "Pera", precio: 2500, img: "/img/pera.jpg" },
    { id: 10, nombre: "Anana", precio: 3000, img: "/img/anana.jpg" },
    { id: 11, nombre: "Pomelo Amarillo", precio: 2000, img: "/img/pomelo-amarillo.jpg" },
    //tampoco incluyo sandia :D
    //{ id: 13, nombre: "Sandia", precio: 100, img: "/img/sandia.jpg" },
    { id: 12, nombre: "Pomelo Rojo", precio: 2000, img: "/img/pomelo-rojo.jpg" }

];
//?------------------------------------------------------------------------------------
//?---------------------------ADICIONALES---------------------------------------
const alumno = {
    dni: 45304370,
    nombre: "Josue",
    apellido: "Damacio"
};

let carrito = [];

//?------------------------------------------------------------------------------------
//?---------------------------CONEXION ETIQUETAS---------------------------------------
let contenedorProductos = document.getElementById("contenedor-productos");
let inputBuscar = document.getElementById("barra-busqueda");//*guardamos el imput
let itemsCarrito = document.getElementById("items-carrito");

let nombreAlumno = document.getElementById("nombreAlumno");
let precioTotal = document.getElementById("precio-total");
let cantidadFrutas = document.getElementById("contador-carrito");

//?---------------------------BUSCADOR CON FILTRO---------------------------
//un escuchador escucha lo que el usuario toca (de cada accion, en esta caso tocar teclas)

inputBuscar.addEventListener("keyup", filtrarProductos);


function filtrarProductos() {
    let valorInput = inputBuscar.value;
    //guarda productos con el mismo titulo en un nuevo array de objetos
    let arrayFrutasFiltradas = arrayFrutas.filter(producto => producto.nombre.toLowerCase().includes(valorInput.toLowerCase()));
    //reutiliza la funcion para sobreescribir los productos filtrados segun el input
    mostrarProductos(arrayFrutasFiltradas);
}
//?------------------------------------------------------------------------------------
//?----------------------PRODUCTOS MOSTRADOS DINAMICAMENTE-----------------------------
function mostrarProductos(array) {
    //la varaible se inicializa acá y no afuera porque sino se agrega a los productos en vez de reemplazar
    let htmlProductos = "";
    //reemplaza los ${} por el valor de las propiedades de cada objeto del array
    array.forEach(producto => {
        htmlProductos += `
        <div class="card-producto">
            <img src="${producto.img}" alt="">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button onclick=agregarFruta(${producto.id})>Agregar al carrito</button>
        </div>`;
    });
    contenedorProductos.innerHTML = htmlProductos;
}
//?------------------------------------------------------------------------------------
//?---------------------------CARRITO--------------------------------------------------

//calcula y muestra los productos añadidos al carro y modifica el valor total
function mostrarCarrito(array) {
    if (carrito.length > 0) {
        //los contadores y acumuladores van acá para cambiar dinamicamnete
        //segun la interaccion que tenga el usuario
        let htmlCarrito = "";
        let htmlPrecioTotal = 0;
        let htmlCantidadFrutas = 0;
        array.forEach(producto => {
            htmlCarrito += `
        <li class="bloque-item">
            <p class="nombre-item">${producto.nombre} - ${producto.precio}</p>
            <button onclick="eliminarFruta(${producto.id})" class= "boton-eliminar">Eliminar</button>
        </li>
        `;
            htmlPrecioTotal += (producto.precio);
            htmlCantidadFrutas += 1;
        });
        itemsCarrito.innerHTML = htmlCarrito;
        precioTotal.innerHTML = htmlPrecioTotal;
        cantidadFrutas.innerHTML = htmlCantidadFrutas;

        console.log(carrito);

        guardarCarritoEnStorage();
        console.log("guardando en el storage");
    }
    else {
        console.log("carrito vacio");
    }

}


//?------------------------------------------------------------------------------------
//?------------------------------------CRUD CARRITO------------------------------------

function agregarFruta(id) {
    //agragar al carrito por su ID de producto
    //guardamos cada objeto encontrado de la array que cumpla con el 'find'
    let objetoEncontrado = arrayFrutas.find(producto => producto.id === id);
    //uso el push para añadir objeto al array
    carrito.push(objetoEncontrado);

    mostrarCarrito(carrito);
}

function eliminarFruta(id) {

    //*elimina solo uno de los productos (por eso use splice en vez de filter)
    const index = carrito.findIndex(fruta => fruta.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
    }
    mostrarCarrito(carrito);

    //*esto es otra version que elimina todos los productos con la misma ID, por eso no lo utilice
    // carrito = carrito.filter(fruta => fruta.id !== id);
    // mostrarCarrito(carrito);

}
//?------------------------------------------------------------------------------------
//?------------------------FUNCIONES DE LocalStorage-----------------------------------

function guardarCarritoEnStorage() {
    //los objetos del carrito se guardan en forma de string en el json
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeStorage() {
    //con getItem se levanta lo guardado en carrito y duplica en carritoGuardado
    let carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito(carrito);
    }
    console.log("cargando del storage");
}

//?------------------------------------------------------------------------------------
//?------------------------FUNCIONES DE ORDENAMIENTO-----------------------------------

function ordenarMenorAMayor() {
    //sort recorre y  compara fruta 1 con fruta 2 para ordenarlas en un nuevo array
    nuevoArray = arrayFrutas.sort((fruta1, fruta2) => fruta1.precio - fruta2.precio);
    mostrarProductos(nuevoArray);
}

function ordenarPorNombre() {
    let copia = arrayFrutas.slice();
    //hago comparacion formatenado los nombres un poco, uso localcompare con "es" para que use el idioma
    copia.sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase(), "es"));
    mostrarProductos(copia);
}

function imprimirDatosAlumno() {
    //para definir el contenido del div accedo a las propiedades del objeto
    nombreAlumno.textContent = `${alumno.nombre} ${alumno.apellido}`;
    console.log(alumno);
}

function init() {
    mostrarProductos(arrayFrutas);
    mostrarCarrito(carrito);
    imprimirDatosAlumno();
    cargarCarritoDesdeStorage();

}
init();