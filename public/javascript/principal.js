let botonGuardar = document.getElementById("guardar");
let contenedorNotas = document.getElementById("notasCreadas");

/* EVENTO DE CLICK */
botonGuardar.addEventListener("click", () => { 

    let titulo = document.getElementById("tituloNota").value;
    let texto = document.getElementById("textoNota").value;

    /* VERIFICO QUE NO ESTEN VACIOS */
    if(!titulo || !texto){
        alert("Falta completar los campos TÍTULO y NOTA");
        return;
    }

    /* CREO LA NOTA PARA METERLO AL CONTENEDOR */
    let notaNueva = document.createElement("div");
    notaNueva.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');
    notaNueva.innerHTML = `
    <div class="card h-100 shadow-sm border-0 bg-light">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-primary">${titulo}</h5>
        <p class="card-text flex-grow-1">${texto}</p>
        <button id="eliminarNota" class="btn btn-outline-danger mt-3 align-self-end">Eliminar</button>
        <button id="editarNota" class="btn btn-outline-secundary mt-3 align-self-end">Editar</button>
      </div>
    </div>
  `;

    /* AGREGO LA NUEVA NOTA AL CONTENEDOR */
    contenedorNotas.appendChild(notaNueva);

    /* CIERRO EL MODAL */
    let modal = bootstrap.Modal.getInstance(document.getElementById("modalNuevo"));
    modal.hide();

    /* LIMPIO EL FORMULARIO */
    document.getElementById("formNota").reset();

}) 