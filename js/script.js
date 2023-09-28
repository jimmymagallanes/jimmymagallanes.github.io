//Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

//Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

    //FUNCIONES

function anchoPage(){

    if (window.innerWidth > 850){
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    }else{
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";   
    }
}

anchoPage();


    function iniciarSesion(){
        if (window.innerWidth > 850){
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "10px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.opacity = "1";
            caja_trasera_login.style.opacity = "0";
        }else{
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.display = "block";
            caja_trasera_login.style.display = "none";
        }
    }

    function register(){
        if (window.innerWidth > 850){
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "410px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.opacity = "0";
            caja_trasera_login.style.opacity = "1";
        }else{
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.display = "none";
            caja_trasera_login.style.display = "block";
            caja_trasera_login.style.opacity = "1";
        }
}

// logica register y login

const userApiUrl = 'https://inventariobackend.onrender.com/user';
// Agregar un evento 'submit' al formulario de inicio de sesión
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', login);

async function login(event){
    event.preventDefault(); // Prevenir el envío del formulario por defecto
  
    // Obtener los valores del formulario
    const username = document.getElementById('loginUsuario').value;
    const contraseña = document.getElementById('loginContraseña').value;
  
    // Crear un objeto de usuario con los datos
    const usuarioData = {
      nombre:"",
      username: username,
      contraseña: contraseña
    };
  
    console.log(usuarioData)
  
    // Realizar una solicitud Fetch para enviar los datos del usuario al servidor
    fetch(userApiUrl+'/iniciarsesion', {
      method: 'POST', // Método HTTP POST para enviar datos
      headers: {
        'Content-Type': 'application/json' // Especificar el tipo de contenido como JSON
      },
      body: JSON.stringify(usuarioData) // Convertir el objeto de usuario a JSON y enviarlo
    })
    .then(response => response.json())
    .then(data =>{
      if(data == "sucess"){
        window.location="home.html";
      }else{
        console.log(data)
        throw data;
      }
    })
    .catch(error => {
      console.error('Error en la solicitud Fetch:', error);
    });
};


 // Agregar un evento 'submit' al formulario de registro
 const registerForm = document.getElementById('registerForm');
 registerForm.addEventListener('submit', registrarUsuario);

 function registrarUsuario(event) {
   event.preventDefault(); // Prevenir el envío del formulario por defecto

   // Obtener los valores del formulario
   const nombre = document.getElementById('registerNombre').value;
   const username = document.getElementById('registerUsuario').value;
   const contraseña = document.getElementById('registerContraseña').value;

   // Crear un objeto de usuario con los datos
   const usuarioData = {
     nombre: nombre,
     username: username,
     contraseña: contraseña
   };

   console.log(usuarioData);

   // Realizar una solicitud Fetch para registrar al usuario en el servidor
   fetch(userApiUrl+'/register', {
     method: 'POST', // Método HTTP POST para enviar datos
     headers: {
       'Content-Type': 'application/json' // Especificar el tipo de contenido como JSON
     },
     body: JSON.stringify(usuarioData) // Convertir el objeto de usuario a JSON y enviarlo
   })
   .then(response => {
        if(response.ok){
            window.location.href = 'home.html';
        }
    })
     .catch(error => {
       console.error('Error en la solicitud Fetch:', error);
     });
 }