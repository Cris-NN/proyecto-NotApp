let btnRegistro = document.getElementById("registrarseAqui");
let btnVolver = document.getElementById("volver");
let contenedorLogin = document.getElementById("login");
let contenedorRegistro = document.getElementById("registro");

btnVolver.addEventListener("click", () => {
    contenedorRegistro.classList.add("collapse");
    contenedorLogin.classList.remove("collapse");
});

btnRegistro.addEventListener("click", () => {
    contenedorRegistro.classList.remove("collapse");
    contenedorLogin.classList.add("collapse");
});

////////////////////////////////////LOGIN

let contenedor = document.getElementById("formulario");
let btnIngresar = document.getElementById("ingresar");


btnIngresar.addEventListener("click", async (e) => {
    e.preventDefault();
    let email = document.getElementById("floatingInputIngreso").value;
    let contra = document.getElementById("floatingPasswordIngreso").value;

    await login({ email, contra })

})

////////////////////////////////////REGISTRO
let btnRegistrado = document.getElementById("registrado")

btnRegistrado.addEventListener("click", async (e) => {
    e.preventDefault();
    let nombre = document.getElementById("floatingInputNombre").value;
    let apellido = document.getElementById("floatingInputApellido").value;
    let email = document.getElementById("floatingInputCorreo").value;
    let contra = document.getElementById("floatingPasswordNew").value;
    let contraRepetida = document.getElementById("floatingPasswordRepeat").value;

    let registerStatus
    if (contra === contraRepetida) {
        registerStatus = await register({ nombre, apellido, email, contra })
        if (registerStatus == 201) {
            alert("Registro exitoso!");
            await login({ email, contra })
        }
        else {
            alert("El registro fallo!");
        }
    }
})


async function register(datos) {
    const headers = new Headers();
    headers.append("content", "application/json");
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "nombre": datos.nombre,
        "apellido": datos.apellido,
        "mail": datos.email,
        "password": datos.contra,
    });

    const requestOptions = {
        method: "POST",
        headers,
        body,
        redirect: "follow"
    };

    let response = await fetch("http://localhost:3000/user/createUser", requestOptions)
    return response.status
}

async function login(datos) {
    const headers = new Headers();
    headers.append("content", "application/json");
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "mail": datos.email,
        "password": datos.contra
    });

    const requestOptions = {
        method: "POST",
        headers,
        body,
        redirect: "follow",
        credentials: "include"
    };

    let response = await fetch("http://localhost:3000/user/login", requestOptions)
    // let responseResult = await response.json()

    // sessionStorage.setItem("token", responseResult.token);
    console.log(response.status)
    if (response.status == 200)
        window.location = "http://localhost:3000/home"
}

















