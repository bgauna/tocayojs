const divProducto = document.getElementById("divProducto")

class Equipo {
    constructor(id, nombre, precio, año, codigo, img) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.año = año
        this.codigo = codigo
        this.img = img
    }
}

/* const producto1 = new Equipo(1, "Criolipolisis Niza Doble Serie 2", 600000, "2019", "SVCL0011", "svcl0011.jpg")
const producto2 = new Equipo(2, "Hammer SL Dwin", 350000, "2021", "SVOC0003", "svoc0003.jpg")
const producto3 = new Equipo(3, "Crio-Fraxis Plus", 350000, "2020", "SVRF0016", "svrf0016.jpg")
const producto4 = new Equipo(4, "Liposhock", 1500000, "2019", "SVCO0002", "svco0002.jpg")
const producto5 = new Equipo(5, "Velakorper", 3500000, "2021", "SVCO0004", "svco0004.jpg")
const producto6 = new Equipo(6, "BodyGo Perform MS 2G MT", 3500000, "2022", "SVMG0005", "svmg0005.jpg")
const producto7 = new Equipo(7, "Roll Active", 2500000, "2022", "SVRF0018", "svrf0018.jpg")
const producto8 = new Equipo(8, "Dermolight Laser 1400W", 4500000, "2019", "SVLP0010", "svlp0010.jpg")


const catalogo = [
    producto1,
    producto2,
    producto3,
    producto4,
    producto5,
    producto6,
    producto7,
    producto8,] */


const catalogo = [];

const extraeProductos = async () => {
    const datos = await fetch ('./json/productos.json');
    const productosExtraidos = await datos.json();
    return productosExtraidos;
}


let elemento;

const crearEventosCatalogo = () => {
    /* Selecting DOM nodelist */
    const buttons = document.querySelectorAll('button');

    /* Callback function */
    const alertButton = (evento) => {
        console.log('Añadiendo a Carrito', evento);
        elemento = evento.target.id;
        elemento=elemento.slice(5);
        elemento=parseInt(elemento);
        console.log(elemento);
        catalogo.forEach( producto => {
            if(parseInt(producto.id)===elemento)
            {
                carrito.push(producto);
            }
        })
        console.log("quiero ver el carrito", carrito);
    }
     
    /* Event listeners */
    for (let button of buttons) {
          button.addEventListener('click', alertButton, false);    
    }
    
}


extraeProductos().then( paqueteDatos => {
    console.log(paqueteDatos);
    paqueteDatos.forEach( i => {
        catalogo.push(i);
    })
    llamarCatalogo();
    crearEventosCatalogo();
}
)

console.log("este es el ",catalogo);

const botones = []; //creo un array de botones

const llamarCatalogo = () => {
    catalogo.forEach((equipo) => {
        divProducto.innerHTML += `
            <div id="id${equipo.id}" class="card" style="width: 18rem;">
            <img src="./img/${equipo.img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${equipo.nombre}</h5>
            <p class="card-text">Precio: S ${equipo.precio}</p>
            <p class="card-text">Año: ${equipo.año}</p>
            <p class="card-text">Código: ${equipo.codigo}</p>
            <button id="boton${equipo.id}" class="btn btn-primary"> AGREGAR </button>
          </div>
        </div>    
            `
/*         const botonCarro = document.getElementById(`boton${equipo.id}`);
        botones.push(botonCarro); */
    })
}

const carrito = [];
const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
if (carritoStorage) {
    carritoStorage.forEach( elementoCarrito =>
        carrito.push(elementoCarrito)
    )
}

console.log("mostrando carrito", carrito)

//console.log("a ver qué eventos se cargaron",botones);

/* nombre.onkeydown = (evento) => {
    if (evento.key === 'Enter' && wapp.value && email.value) {
        guardaNombre();
    }
} */


/* 
botonesAgregar.forEach((boton) => {
    boton.onclick = () => {

        const productoSeleccionado = catalogo.find(
            (prod) => prod.id === parseInt(boton.id)
        )

        const productoCarrito = { ...productoSeleccionado, cantidad: 1 }

        const indexCarrito = carrito.findIndex(
            (prod) => prod.id === productoCarrito.id)

        if (indexCarrito === -1) {
            carrito.push(productoCarrito)
        } else {
            carrito[indexCarrito].cantidad++
        }

        localStorage.setItem('carrito', JSON.stringify(carrito))
        console.log(carrito)

    }
}) */

const botonFinalizar = document.querySelector('#finalizar')
botonFinalizar.onclick = () => {
    let totalCompra = 0
    carrito.forEach((valor) => (
        totalCompra += valor.precio
    ))
    console.log(totalCompra)

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "El total de su compra es de " + totalCompra,
        showConfirmButton: false,
        timer: 15000
    })
}
