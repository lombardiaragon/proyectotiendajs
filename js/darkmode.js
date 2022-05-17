
const btnSwitch=document.querySelector('#switch')

recuperarDM()

btnSwitch.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
    btnSwitch.classList.toggle('active')
    guardarDM()
})

function guardarDM(){
    if(document.body.classList.contains('dark')){
        localStorage.setItem('dark_mode', 'true')
    }    
    else{
        localStorage.setItem('dark_mode', 'false')
    }
}

function recuperarDM(){
    if(localStorage.getItem('dark_mode') === 'true'){
        document.body.classList.toggle('dark')
        btnSwitch.classList.toggle('active')
    }
}
