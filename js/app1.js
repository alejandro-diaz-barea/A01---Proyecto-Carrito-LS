// selectores

const carrito = document.querySelector("#carrito")

const vaciarCarrito = document.querySelector("#vaciar-carrito")

const contenedorCarrito = document.querySelector("#lista-carrito tbody")

const listaCursos = document.querySelector("#lista-cursos")



//variables

let articulosCarrito = []
// listeners

cargarEventsListener()

function cargarEventsListener(){
    listaCursos.addEventListener("click", añadirCurso)
    carrito.addEventListener("click", eliminarCurso)
}


// Funciones

// eliminar curso
function eliminarCurso(e){
    if (e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id")

        articulosCarrito = articulosCarrito.filter((curso)=>
            curso.id !== cursoId
        )
        carritoHTML()
    }

}
function añadirCurso(e){
    e.preventDefault()

    if (e.target.classList.contains("agregar-carrito")){
        const curso = e.target.parentElement.parentElement
        console.log(curso)
        leerDatosCursor(curso)
    }
}
// lee la info del curso seleccionado 
function leerDatosCursor(curso){
    const infoCurso = {
        imagen: curso.querySelector("img").src , 
        titulo: curso.querySelector("h4").textContent , 
        precio: curso.querySelector(".precio span").textContent , 
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    // revisamos si ya existe

    const existe = articulosCarrito.some((curso)=>curso.id === infoCurso.id)
    if (existe){
        const cursos = articulosCarrito.map((curso)=>{
            if (curso.id === infoCurso.id){
                curso.cantidad++
                return curso
            }
            
        })
    }else {
        articulosCarrito.push(infoCurso);    
    }

    carritoHTML(articulosCarrito)
}

function carritoHTML(){
    limpiarHTML()
    articulosCarrito.forEach((curso) => {
        const row = document.createElement("tr")
        const {imagen,titulo,precio,cantidad,id} = curso


        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width ="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `
        contenedorCarrito.appendChild(row)
    });
}

function limpiarHTML(){
    // contenedorCarrito.innerHTML = ""

    while (contenedorCarrito.firstChild){
        contenedorCarrito.firstChild.remove()
    }
}