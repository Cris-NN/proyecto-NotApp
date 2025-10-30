let contenedor = document.getElementById("formulario");
let btnIngresar = document.getElementById("ingresar");


btnIngresar.addEventListener("click", async (e) => {
    e.preventDefault();
    let correo = document.getElementById("floatingInputIngreso").value;
    let contra = document.getElementById("floatingPasswordIngreso").value;




    const myHeaders = new Headers();
    myHeaders.append("content", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "mail": correo,
        "password": contra
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    let response = await fetch("http://localhost:3000/user/login", requestOptions)
    response = await response.json()

    window.sessionStorage.setItem("token", response.token)
    console.log(response)

})