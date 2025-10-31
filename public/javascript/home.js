let botonGuardar = document.getElementById("guardar");
let contenedorNotas = document.getElementById("notasCreadas");
let btnCerrarSesion = document.getElementById("cerrarSesion");

/* EVENTO DE CLICK */
botonGuardar.addEventListener("click", async (e) => {
  e.preventDefault();
  let titulo = document.getElementById("tituloNota").value;
  let texto = document.getElementById("textoNota").value;

  /* VERIFICO QUE NO ESTEN VACIOS */
  if (!titulo || !texto) {
    alert("Falta completar los campos TÍTULO y NOTA");
    return;
  }

  const notaNueva = await guardarNota({ titulo, texto });
  console.log(notaNueva)
  await cargarNotasDocu(notaNueva);

  /* CIERRO EL MODAL */
  let modal = bootstrap.Modal.getInstance(document.getElementById("modalNuevo"));
  modal.hide();

  /* LIMPIO EL FORMULARIO */
  document.getElementById("formNota").reset();

})

btnCerrarSesion.addEventListener("click", async () => {
  cookieStore.delete("token")
  window.location = "http://localhost:3000/"
})


async function modificarNota(id, tituloViejo, textoViejo) {
  // Seleccionamos los inputs del modal
  const inputTitulo = document.getElementById("tituloNotaModificar");
  const inputTexto = document.getElementById("textoNotaModificar");

  // Rellenamos los inputs con los valores actuales de la nota
  inputTitulo.value = tituloViejo;
  inputTexto.value = textoViejo;

  // Abrimos el modal (usando Bootstrap 5)
  const modalElemento = document.getElementById("modalModificar");
  const modal = new bootstrap.Modal(modalElemento);
  modal.show();

  // Opcional: agregar un listener al botón de guardar cambios dentro del modal
  const btnGuardar = document.getElementById("guardarEdicion");
  btnGuardar.onclick = async () => {
    const nuevoTitulo = inputTitulo.value;
    const nuevoTexto = inputTexto.value;

    // Aquí llamas a tu función que hace la petición PUT para actualizar la nota
    await eliminarModificarNota("PUT", { titulo: nuevoTitulo, texto: nuevoTexto }, id);
    location.reload();
    
    // Cierra el modal después de guardar
    modal.hide();
  };
}

async function eliminarNota(id) {
  await eliminarModificarNota("DELETE", id)
  let nota = document.getElementById(`nota-${id}`)
  if (nota) {
    nota.style.transition = "all 0.3s ease";
    nota.style.opacity = 0;
    nota.style.transform = "scale(0.95)";
    setTimeout(() => nota.remove(), 300);
  }
}

async function cargarNotasDocu(notita = false) {
  const notas = notita ? [notita] : await obtenerNotas()
  for (let nota of notas) {
    /* CREO LA NOTA PARA METERLO AL CONTENEDOR */
    let notaNueva = document.createElement("div");
    notaNueva.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');
    notaNueva.setAttribute('id', `nota-${nota.id}`)
    notaNueva.innerHTML = `
    <div class="card h-100 shadow-sm border-0 bg-light">
      <div class="card-body d-flex flex-column">
        <h5 id="tituloNota-${nota.id}" class="card-title text-primary">${nota.titulo}</h5>
        <p id="textoNota-${nota.id}" class="card-text flex-grow-1">${nota.texto}</p>
        <div class="d-flex justify-content-end gap-2 mt-3">
          <button onClick="eliminarNota(${nota.id})" class="btn btn-outline-danger mt-3 align-self-end"><i class="fa-solid fa-trash"></i></button>
          <button id="modificarNotita" onClick='modificarNota(${nota.id}, ${JSON.stringify(nota.texto)}, ${JSON.stringify(nota.titulo)})' data-bs-target="#modalModificar" data-bs-toggle="modalModificar" class="btn btn-outline-secondary mt-3 align-self-end"><i class="fa-solid fa-pen"></i></button>
        </div>
      </div>
    </div>
  `;

    /* AGREGO LA NUEVA NOTA AL CONTENEDOR */
    notita ? contenedorNotas.prepend(notaNueva) : contenedorNotas.appendChild(notaNueva);
  }
}

async function guardarNota(datos) {
  const headers = new Headers();
  headers.append("content", "application/json");
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    "titulo": datos.titulo,
    "texto": datos.texto
  });

  const requestOptions = {
    method: "POST",
    headers,
    body,
    redirect: "follow",
    credentials: "include"
  };

  let response = await fetch("http://localhost:3000/nota/", requestOptions)

  return await response.json()
}

async function obtenerNotas() {
  const headers = new Headers();
  headers.append("content", "application/json");
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers,
    redirect: "follow",
    credentials: "include"
  };

  let response = await fetch("http://localhost:3000/nota/", requestOptions)
  return await response.json()
}

async function eliminarModificarNota(metodo, datos, id) {
  const headers = new Headers();
  headers.append("content", "application/json");
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: metodo,
    headers,
    body: JSON.stringify({ "titulo": datos.titulo, "texto": datos.texto }),
    redirect: "follow",
    credentials: "include"
  };

  let response = await fetch(`http://localhost:3000/nota/${id}`, requestOptions)
  return await response.json()
}