function vaciarCarrito(bodyTabla) {
    bodyTabla.innerHTML = "";
}

function cursoEnCarrito(bodyTabla, nombreCurso) {
    return Array.from(bodyTabla.querySelectorAll("tr")).find(fila => {
        return fila.querySelector("td:nth-child(2)").innerText === nombreCurso;
    });
}

function actualizarCantidad(cursoExistente) {
    let cantidadTd = cursoExistente.querySelector("td:nth-child(4)");
    let cantidadActual = parseInt(cantidadTd.querySelector(".cantidad").innerText);
    cantidadTd.querySelector(".cantidad").innerText = cantidadActual + 1;
}

function crearFilaCurso(e, bodyTabla) {
    const trTabla = document.createElement("tr");

    // Añadir imagen
    let imagen = e.target.parentElement.parentElement.querySelector("img");
    let nuevaImagen = document.createElement("img");
    nuevaImagen.src = imagen.src;
    nuevaImagen.classList = imagen.classList;

    let tdImagen = document.createElement("td");
    tdImagen.appendChild(nuevaImagen);
    trTabla.appendChild(tdImagen);

    // Añadir nombre
    let nombre = e.target.parentElement.querySelector("h4");
    let tdTitulo = document.createElement("td");
    tdTitulo.innerText = nombre.innerText;
    trTabla.appendChild(tdTitulo);

    // Añadir precio
    let precio = e.target.parentElement.querySelector(".u-pull-right");
    let tdPrecio = document.createElement("td");
    tdPrecio.innerText = precio.innerText;
    trTabla.appendChild(tdPrecio);

    // Añadir cantidad (inicialmente siempre 1)
    let tdCantidad = document.createElement("td");
    let spanCantidad = document.createElement("span");
    spanCantidad.classList.add("cantidad");
    spanCantidad.innerText = "1";
    tdCantidad.appendChild(spanCantidad);
    trTabla.appendChild(tdCantidad);

    // Añadir la "X" para eliminar el curso
    let tdEliminar = document.createElement("td");
    let eliminarEnlace = document.createElement("a");
    eliminarEnlace.href = "#";
    eliminarEnlace.innerText = "X";
    eliminarEnlace.classList.add("borrar-curso");
    tdEliminar.appendChild(eliminarEnlace);
    trTabla.appendChild(tdEliminar);

    // Añadir la fila a la tabla
    bodyTabla.appendChild(trTabla);
}

function eliminarCurso(e) {
    e.target.parentElement.parentElement.remove();
}

document.addEventListener("click", function(e) {
    const padre = document.querySelector("#lista-cursos");
    const carrito = document.querySelector("#lista-carrito");
    const bodyTabla = carrito.querySelector("tbody");

    if (e.target.id === "vaciar-carrito") {
        vaciarCarrito(bodyTabla);
    }

    if (e.target.classList.contains("agregar-carrito") && padre.contains(e.target)) {
        const nombreCurso = e.target.parentElement.querySelector("h4").innerText;

        let cursoExistente = cursoEnCarrito(bodyTabla, nombreCurso);
        if (cursoExistente) {
            actualizarCantidad(cursoExistente);
        } else {
            crearFilaCurso(e, bodyTabla);
        }
    }

    if (e.target.classList.contains("borrar-curso")) {
        eliminarCurso(e);
    }
});
