
const conactForm= document.querySelector('#conactForm')
conactForm.addEventListener('submit', sendContactForm)

const formTurno= document.querySelector('#formTurno')
formTurno.addEventListener('submit', sendContactForm)

function sendContactForm(e){
    e.preventDefault()
    sentContactFormMessage()
}



/////toastify enviar formulario de contacto///
function sentContactFormMessage(){
    Toastify({
        text: "✔ Formulario enviado. A la brevedad le responderemos vía mail",
        duration: 4000,
        gravity: 'bottom',
        position: 'center',
        style: {
            background: "rgba(64, 98, 232, 0.995)",
            }     
     }).showToast();
 }
 //---------------------------------------------------