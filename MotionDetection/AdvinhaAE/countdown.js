var count = 20;
var tempo = document.getElementById("tempo"); // associar a variável tempo ao elemento

function start() {
     if (count > 0){
        count -= 1;
        if (count == 0) {
            count = "00";
            // tempo.classList.add("actualizado"); // adicionar uma classe css para mudar a cor
            // window.location.replace('fase2.html');
        }else if(count < 10){
            count = "0" + count;
        }
        tempo.innerText = count;
        setTimeout(start, 1000); 
        // em vez de chamar setTimeout("start();", 100) usa só o nome da função
        // o setTimeout vai executar a função mesmo sem pores os ()
    }
}

start();
  