window.addEventListener(
    /*Adicionando o listener para o movimento do mouse*/
    "mousemove",(elemento)=> {
        const estrelinha = document.createElement("div");
        estrelinha. className = "estrelinha";
        estrelinha. innerHTML = "&#10022;";
        estrelinha.style.left = elemento.clientX + "px";
        estrelinha.style.top = elemento.clientY + "px";
        estrelinha.style.position="fixed";

        const xAleatorio = (Math.random() - 0.5) * 50 + "px";
        estrelinha.style.setProperty("--xAleatorio", xAleatorio);
        document.body.appendChild(estrelinha);

        /* Acrescentando a div classe "estrelinha" ao body */
        document.body.appendChild(estrelinha);
        
        //define a duração pra um segundo
        setTimeout(()=>{
            estrelinha.remove();
        }, 800)
    })