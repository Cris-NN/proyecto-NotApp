/* let botonGuardar = document.getElementById("guardar"); */

/* EVENTO DE CLICK */
/* botonGuardar.addEventListener("click", () => { */
function guardar(){
    let contenedorNotasCreadas = document.getElementById("contentNotas");

    let titulo = document.getElementById("tituloNota").value;
    let texto = document.getElementById("textNota").value;

    /* VERIFICO QUE NO ESTEN VACIOS */
    if(!titulo || !texto){
        alert("Falta completar los campos TÍTULO y NOTA");
        return;
    }

    /* CREO LA NOTA PARA METERLO AL CONTENEDOR */
    let notaNueva = document.createElement("div");
    notaNueva.classList.add("notaNueva");
    notaNueva.innerHTML = `
    <h5>${titulo}</h5>
    <p>${texto}</p>
    `;

    /* AGREGO LA NUEVA NOTA AL CONTENEDOR */
    contenedorNotasCreadas.appendChild(notaNueva);

    /* CIERRO EL MODAL */
    let modal = bootstrap.Modal.getInstance(document.getElementById("modalNuevo"));
    modal.hide();

    /* LIMPIO EL FORMULARIO */
    document.getElementById("formNota").reset();
}
/* }) */