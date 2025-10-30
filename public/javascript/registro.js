let btnRegistro = document.getElementById("registrarse");
let btnVolver = document.getElementById("volver");
let contenedorLogin = document.getElementById("login");
let contenedorRegistro = document.getElementById("registro");

btnRegistro.addEventListener("click", () => {
    contenedorRegistro.classList.remove("collapse");
    contenedorLogin.classList.add("collapse");
});

btnVolver.addEventListener("click", () => {
    contenedorRegistro.classList.add("collapse");
    contenedorLogin.classList.remove("collapse");
});