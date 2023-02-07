document.addEventListener("DOMContentLoaded",function(){
    iniciarApp();
})

function iniciarApp(){
    crearGaleria();
    ScrollNav();
    navegacionFija();
}

function navegacionFija(){
    const barra = document.querySelector(".header");
    const sobreFestival = document.querySelector(".sobre-festival");
    const body = document.querySelector("body");

     window.addEventListener("scroll", function(){
         if (sobreFestival.getBoundingClientRect().bottom < 0){
             barra.classList.add("fijo");
             body.classList.add("body-scroll");
         }else{
             barra.classList.remove("fijo");
             body.classList.remove("body-scroll");
         }
     })
}

function ScrollNav(){
    const enlaces= document.querySelectorAll(".navegacion-principal a");
    enlaces.forEach(enlace=>{
        enlace.addEventListener("click",function(e){
            e.preventDefault();
            const scroll= e.target.attributes.href.value;
            const scrollNav=document.querySelector(scroll);
            scrollNav.scrollIntoView({behavior:"smooth"})
        })
    })
}

function crearGaleria(){
    const galeria = document.querySelector(".galeria-imagenes")

    for(let i = 1; i<=12;i++){
        const imagen= document.createElement("picture");
        imagen.innerHTML= `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="img/thumb/${i}.jpg" alt="">`;
        galeria.appendChild(imagen);

        imagen.onclick=function(){
            mostrarImagen(i)
        }
    }
    }
    function mostrarImagen(id){
        const imagen= document.createElement("picture");
        imagen.innerHTML= `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="img/grande/${id}.jpg" alt="">`;

        const overlay = document.createElement("DIV");
        overlay.appendChild(imagen);
        overlay.classList.add("overlay-g");
        overlay.onclick=function(){
            const body = document.querySelector("body");
            body.classList.remove("body-fijar");
            
            overlay.remove();
        }

        const cerrarModal= document.createElement("P");
        cerrarModal.textContent="x";
        cerrarModal.classList.add("cerrar-p");
        overlay.appendChild(cerrarModal);

        cerrarModal.onclick = function(){

            const body = document.querySelector("body");
            body.classList.remove("body-fijar");

            overlay.remove();
        }


        const body = document.querySelector("body");
        body.appendChild(overlay);
        body.classList.add("body-fijar");
    }
   