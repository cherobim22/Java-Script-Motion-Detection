var count = 60;
var tempo = document.getElementById("tempo"); // associar a variável tempo ao elemento

function start() {
     if (count > 0){
        count -= 1;
        if (count == 0) {
            count = "00";
           var fase = document.getElementById('fase').value;
            if(fase === 'fase1'){
                saveLost();
                setTimeout(()=>{
                    location.replace(`${window.location.origin}/MotionDetection/AdvinhaAe/fase2.html`);
               },1000)
            }
            if(fase === 'fase2'){
                saveLost();
                setTimeout(()=>{
                    location.replace(`${window.location.origin}/MotionDetection/AdvinhaAe/fase3.html`);
               },1000)
            }
            if(fase === 'fase3'){
                saveLost();
                setTimeout(()=>{
                    location.replace(`${window.location.origin}/MotionDetection/AdvinhaAe/fase4.html`);
               },1000)
            }
            if(fase === 'fase4'){
                saveLost();
                setTimeout(()=>{
                    location.replace(`${window.location.origin}/MotionDetection/AdvinhaAe/fase5.html`);
               },1000)
            }
            if(fase === 'fase5'){
                saveLost();
                setTimeout(()=>{
                    location.replace(`${window.location.origin}/MotionDetection/AdvinhaAe/end.html`);
               },1000)
            }


        }else if(count < 10){
            count = "0" + count;
        }
        tempo.innerText = count;
        setTimeout(start, 1000); 
        // em vez de chamar setTimeout("start();", 100) usa só o nome da função
        // o setTimeout vai executar a função mesmo sem pores os ()
    }
}

function saveLost(){
     
    var p = localStorage.getItem('pontos_perdidos');
   
    var d = Number(p)+1;
    window.localStorage.setItem('pontos_perdidos', d);
    if(d >= '4'){
      var ur = window.location.origin;
      location.replace(`${ur}/MotionDetection/AdvinhaAe/end.html`)
      return;
    }
    console.log(p)
    document.getElementById('life').innerText = `${localStorage.getItem('pontos_perdidos')}/4`;
}

start();
  