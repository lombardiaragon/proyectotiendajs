let url='../data/productos.json'

fetch(url)
.then(resp=>resp.json())
.then(data=>{
    mostrarBotones(data)
    recuperar()
})    


let filtroProductos=''

//---------------------BUSCADOR----------------------

let buscar=document.querySelector('#buscar')
buscar.addEventListener('click', busqueda)

function busqueda(e){
e.preventDefault()
let buscador=document.querySelector('.buscador')
filtroProductos= allProducts.filter(el=>el.marca.includes(buscador.value.toUpperCase()))
mostrarProductos(filtroProductos)
}
//--------------------------------------------------------

//----------------------NAVEGADOR---------------------

const lentesSol=document.querySelector('.lentesSol')
const lentesReceta=document.querySelector('.lentesReceta')
const lentesAstigmatismo=document.querySelector('.lentesAstigmatismo')
const lentesToricas=document.querySelector('.lentesToricas')
const liquidos=document.querySelector('.liquidos')

liquidos.addEventListener('click',()=>navSeleccionProd('LIQUIDO'))
lentesReceta.addEventListener('click',()=>navSeleccionProd('RECETA'))
lentesSol.addEventListener('click',()=>navSeleccionProd('SOL'))
lentesAstigmatismo.addEventListener('click',()=>navSeleccionProd('ASTIGMATISMO'))
lentesToricas.addEventListener('click',()=>navSeleccionProd('TORICAS'))

function navSeleccionProd(producto){
  
    if(producto=='SOL' || producto=='RECETA'){
        filtroProductos=allProducts.filter(el=>el.uso===producto)
        mostrarProductos(filtroProductos)
    }
    else if(producto=='ASTIGMATISMO' || producto=='TORICAS'){
        filtroProductos=allProducts.filter(el=>el.uso===producto)
        mostrarProductos(filtroProductos)
    }
    else{
        mostrarProductos(otrosProductos)
    }
        
} 

//---------------------------------------------------

//-----------DECLARACION DE VARIABLES GLOBALES-------
let div1=''
let div2=''
let div3=''

let finder=''
let miCarrito=[]
let listaCarrito=''
let cantidadCarrito=''
let anteojos
let lentesDeContacto
let otrosProductos

let allProducts


//---------------------------------------------------


//-----------MOSTRAR BOTONES-------------------------
function mostrarBotones(data){
    allProducts=data.map(el=>el)
    
    
    anteojos=data.filter((el)=>el.categoria==1)
    lentesDeContacto=data.filter((el)=>el.categoria==2)
    otrosProductos=data.filter((el)=>el.categoria==3)

    div1 = document.querySelector(".btnCategorias");//creo un div

    let btnCategoria1=document.createElement('button')
    btnCategoria1.setAttribute('class','estiloBtnCategorias')
    btnCategoria1.innerHTML=`<h3 class="h5">ANTEOJOS</h3>`
    btnCategoria1.addEventListener('click',()=>mostrarProductos(anteojos))

    let btnCategoria2=document.createElement('button')
    btnCategoria2.setAttribute('class','estiloBtnCategorias')
    btnCategoria2.innerHTML=`<h3 class="h5">LENTES DE CONTACTO</h3>`
    btnCategoria2.addEventListener('click',()=>mostrarProductos(lentesDeContacto))

    let btnCategoria3=document.createElement('button')
    btnCategoria3.setAttribute('class','estiloBtnCategorias')
    btnCategoria3.innerHTML=`<h3 class="h5">LIQUIDOS</h3>`
    btnCategoria3.addEventListener('click',()=>mostrarProductos(otrosProductos))

    div1.appendChild(btnCategoria1)
    div1.appendChild(btnCategoria2)
    div1.appendChild(btnCategoria3)

    div2 = document.querySelector(".listadoProds")
    div3 = document.querySelector(".carritoCompras")
}

//---------------------------------------------------


//-----------RECUPERAR DEL STORAGE-------------------------
function recuperar() {              //recuperar del sessionStorage
    let recuperarSS = JSON.parse(sessionStorage.getItem('En_Carrito'))

    if(recuperarSS){
        recuperarSS.forEach((element)=> {
        miCarrito.push(element) 
       
       })
    
       mostrarCarrito()
    }
    else{
        cantidadCarrito.innerHTML=0
        mostrarCarrito()
    }
}
//---------------------------------------------------


//-----------MOSTRAR LISTADO DE PRODUCTOS-------------------------

function mostrarProductos(categoria){
    let lista=''

    categoria.forEach((elemento)=>{         //recorre el array y me lista los productos con los elementos solicitados
    
    if(!elemento.uso){
        lista+=`<div class="col">
                <div class="tarjetasListado shadow card">
                    <img src="" class="card-img-top" alt="">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Marca:${elemento.marca}</p>
                    <p class="card-text">Modelo:${elemento.nombre}</p>
                    <p>Precio: $<span class="contenedorPrecio">${elemento.precio}</span></p>
                    <button class="estiloBtnAgregar" onclick="agregarAlCarrito(${elemento.id})">Agregar al Carrito</button>
                </div>
            </div>`
     }  
    else{
        lista+=`<div class="col">
        <div class="tarjetasListado shadow card">
            <img src="" class="card-img-top" alt="">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Uso: ${elemento.uso}</p>
            <p class="card-text">Marca:${elemento.marca}</p>
            <p class="card-text">Modelo:${elemento.nombre}</p>
            <p>Precio: $<span>${elemento.precio}</span></p>
            <button class="estiloBtnAgregar" onclick="agregarAlCarrito(${elemento.id})">Agregar al Carrito</button>
        </div>
    </div>`
    }
   
    })
    
    div2.innerHTML=lista
    botonesOrdenar(categoria)     //llama a los botones que ordenan el listado de productos
}
//---------------------------------------------------

//-----------GUARDAR EN STORAGE-------------------------

function guardarCarrito(){          //funcion para guardar datos del carrito en el session storage
    sessionStorage.setItem('En_Carrito', JSON.stringify(miCarrito))
 
}
//---------------------------------------------------

//-----------MOSTRAR CARRITO-------------------------

let totalAcumulado=0

function mostrarCarrito(){
    
    listaCarrito=''     //siempre actualizo listaCarrito en 0 para que no se repitan elementos ya cargados
    
    if(miCarrito.length===0){
        div3.innerHTML='<p class="textoCarrito">CARRITO VACIO</p>'
    }
    else{
        miCarrito.forEach((element)=>{              //recorro miCarrito y voy listando los productos que contiene
            listaCarrito+=`<div class="tarjetasCarrito text-center">
                                <p>Nombre: ${element.nombre}</p>
                                <p>Marca:${element.marca}</p>
                                <p>Precio: $<span class="contenedorPrecio">${element.precio}</span></p>
                                <button class="estiloBtnBorrar cartel" onclick="borrarDelCarrito(${element.id})"> <i class="fa-solid fa-trash-can"></i> </button>
                            </div>`
                            totalCarrito()
                        div3.innerHTML=`<p class="textoCarrito">TOTAL EN CARRITO: $${totalAcumulado}<p>
                                            ${listaCarrito}
                                            <button class="textoCarrito estiloBtnBorrar m-3" onclick="limpiarCarrito()">Limpiar carrito</button>
                                            <button class="textoCarrito btnFinCompra" onclick="finalizarCompra()">FINALIZAR COMPRA</button>` 
                                                                                  
                    })
    }
    numeroCarrito() 
}

//---------------------------------------------------

//-----------TOTAL CARRITO-------------------------
function totalCarrito(){
    let mapaPrecios=miCarrito.map(element=>element.precio)
    totalAcumulado=mapaPrecios.reduce((acumulador,element)=>acumulador+element)
}
//---------------------------------------------------

//-----------CANTIDAD DE PRODUCTOS EN CARRITO-------------------------
function numeroCarrito(){
    cantidadCarrito = document.querySelector('.cantidadEnCarrito')
    cantidadCarrito.innerHTML= miCarrito.length
}
//---------------------------------------------------


//-----------AGREGAR PRODUCTOS AL CARRITO-------------------------

function agregarAlCarrito(idProducto){       //funcion que agrega anteojos al carrito
    finder= allProducts.find((element)=>element.id===idProducto)   //busco dentro del array anteojos el producto cuyo id sea igual al recibido

    miCarrito.push(finder)      //al array miCarrito le agrego el producto encontrado
    
    cartelAgregarToast()
    guardarCarrito()
    mostrarCarrito()                 
}
//---------------------------------------------------


//-----------BORRAR DEL CARRITO-------------------------
function borrarDelCarrito(idProducto){
    let mapped=miCarrito.map((element)=>element.id) //mapped: array con todos los id de miCarrito
   
    let index=mapped.indexOf(idProducto)    //index: busca en mapped la posicion del idProducto sobre el que se hizo click para borrar
  
    miCarrito.splice(index,1)   //borra de miCarrito el elemento en la posicion del index
    cartelBorrarToast()
    
    guardarCarrito()
    mostrarCarrito()
}
//---------------------------------------------------

//-----------LIBRERIA TOASTIFY-------------------------

/////toastify al borrar producto del carrito///
function cartelBorrarToast(){
    Toastify({
        text: "－ Producto borrado del carrito",
        duration: 1000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: "rgba(232, 64, 64, 0.995)",
            }     
     }).showToast();
 }
 /////toastify al agregar producto al carrito///
 function cartelAgregarToast(){
    Toastify({
        text: "＋ Nuevo producto en carrito",
        duration: 1000,
        gravity: 'bottom',
        position: 'center',
        style: {
            background: "rgba(64, 98, 232, 0.995)",
            }     
     }).showToast();
 }
 //---------------------------------------------------

//-----------LIMPIAR CARRITO-------------------------
function limpiarCarrito(){
    miCarrito.splice(0, miCarrito.length)
    mostrarCarrito()
    guardarCarrito()
}
//---------------------------------------------------

//-----------FINALIZAR COMPRA-------------------------

function finalizarCompra(){
    Swal.fire({
        title: '¿Estás seguro que deseas finalizar tu compra? De ser así te redireccionaremos a la página de pago',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: 'rgb(83, 186, 67)',
        cancelButtonColor: 'rgba(232, 64, 64, 0.995)',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '!Excelente! Vamos allá...',
            confirmButtonColor: 'rgb(83, 186, 67)',
          })
        } 
      })
    limpiarCarrito()
}
//---------------------------------------------------



//-----------ORDENAR LISTADO DE PRODUCTOS-------------------------

// botones para ordenar listado de productos
function botonesOrdenar(categoria)
{
    let div4=document.querySelector('.ordenar')
    div4.innerHTML=''
    const nodoBoton1 = document.createElement("button"); //creo boton para ordenar marca ascendente
    nodoBoton1.setAttribute('class','btnOrdenar col')
    nodoBoton1.innerHTML="Ordenar Precio Descendente";
    nodoBoton1.addEventListener("click", ()=>{      //en caso de hacer click llama a la funcion que ordena ascendente
       ordenarDESC(categoria);
        }); 
    div4.appendChild(nodoBoton1);

    const nodoBoton2 = document.createElement("button"); //creo boton para ordenar marca descendente
    nodoBoton2.setAttribute('class','btnOrdenar col')
    nodoBoton2.innerHTML="Ordenar Precio Ascendente";
    nodoBoton2.addEventListener("click", ()=>{       //en caso de hacer click llama a la funcion que ordena descendente
       ordenarASC(categoria);
    }); 
    div4.appendChild(nodoBoton2);
}

//funcion que ordena marca de forma ascendente
function ordenarDESC(categoria)
{ 
    categoria.sort((a,b)=>
    {  
        if(a.precio > b.precio)
            return -1;
        else
            return 1;
    });
 
    mostrarProductos(categoria);
}

//funcion que ordena marca de forma descendente
function ordenarASC(categoria)
{   
    categoria.sort((a,b)=>
    {  
        if(a.precio < b.precio)
            return -1;
        else
            return 1;
    });
   
    mostrarProductos(categoria);
}
//---------------------------------------------------

