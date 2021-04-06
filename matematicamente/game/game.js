
import notificacao from './utils/notificação.js'
import shuffle from './utils/shuffle.js'

//validar a quantidade de questoes
//validar countdown
//finalisar tela inicial e tela final

document.addEventListener("DOMContentLoaded", function(){

  var t = 0;
var questoes = [];
var negativos = 0;
var positivos = 0;

const tempoTotal = 5;
const qtdQuestoes = localStorage.getItem('quantidade_questoes') != null ? localStorage.getItem('quantidade_questoes') : 5;

const tempoMinimo = localStorage.getItem('tempo_total') != null ? localStorage.getItem('tempo_total') : 5 ;
let min = tempoMinimo;
let seg = 1;	

console.log('questoes: ' +qtdQuestoes);

console.log('tempo total: ' +tempoMinimo);

fetch("./perguntas.json").then((resp)=>{
    return resp.json();
}).then((resp)=>{
    console.log(resp.base);
    questoes = resp.base;
    // console.log(questoes);
    
}).then(()=>{
    shuffle(questoes);
    carrega(questoes);
    carregaStatics();
    start();
})

function carrega(questoes){
    console.log(questoes)
    if(questoes[t].tipo === "1"){
      console.log(questoes[t])
        // console.log("imagem");
        document.getElementById('question').innerText = questoes[t].pergunta;

        const element = document.getElementById(`tecla1`);
        element.innerText = "";
        
        const t1 = document.createElement('img');
        if(Array.isArray(questoes[t].resposta)){
          console.log(questoes[t].resposta)
          const aux = Math.floor(Math.random() * questoes[t].resposta.length);
          t1.setAttribute('src',  questoes[t].resposta[aux])
          t1.setAttribute('id', `imgtecla1`);
        }else{
          t1.setAttribute('src',  questoes[t].resposta)
          t1.setAttribute('id', `imgtecla1`);
        }
        
        element.append(t1);
        observaunico('#tecla1');

        insereImagem('tecla0', t, 0)
        insereImagem('tecla2', t, 1)
        insereImagem('tecla3', t, 2)
        observarErro1('#tecla0');
        observarErro2('#tecla2');
        observarErro3('#tecla3');

        let elements = {a:'#tecla0', b:'#tecla2', c:'#tecla3', d:'#tecla1'}

        // elements.forEach((elem)=>{
        //   document.querySelector(elem).classlist.replace('target', 'image-target');
        // });

        for (var prop in elements) {
          // ctrl+shift+k (para abrir o console no mozilla firefox)
          console.log(elements[prop]);
          document.querySelector(`${elements[prop]}`).classList.replace('target', 'image-target');
        }
        
        return; 
        
  } 


    document.getElementById('question').innerText = questoes[t].pergunta;

    if(Array.isArray(questoes[t].resposta)){
      const au = Math.floor(Math.random() * questoes[t].resposta.length);
      document.getElementById('tecla3').innerText = questoes[t].resposta[au]
    }else{
      document.getElementById('tecla3').innerText = questoes[t].resposta
    }
   
    observaunico('#tecla3');

    document.getElementById('tecla0').innerText = questoes[t].distratores[0]
    document.getElementById('tecla1').innerText = questoes[t].distratores[1]
    document.getElementById('tecla2').innerText = questoes[t].distratores[2]
    observarErro1('#tecla0')
    observarErro2('#tecla2')
    observarErro3('#tecla1')
}
function carregaStatics(){
    document.getElementById('erro').innerText = negativos;
    document.getElementById('acerto').innerText = positivos;
    document.getElementById('etapa').innerText = t+1;
}




var observer1 = '';



function observarErro1(target){


  
    let alvo = document.querySelector(target)
    // console.log(alvo.innerText); 
    observer1 = new MutationObserver(function(mutations) {
    let audio1 = document.getElementById('incorrect');
    audio1.muted = false;
    audio1.volume = 0.3;
  
    audio1.play();
  mutations.forEach(function(mutation) {
      setTimeout(()=>{
        // console.log("movimento")
        var x = alvo.style.border;
        
        if(x === 'none'){
        //   console.log("aaaaa");
        saveLost();
    

        }
      })
    });
  });

  var config = {
    attributeOldValue: true,
    // childList: true,
    // characterData: true
  };

  observer1.observe(alvo, config);
}

var observer2 = '';
function observarErro2(target){
  

  //inserir no html atributo data certo ou errado
  
    const alvo = document.querySelector(target)
    // console.log(alvo.innerText); 
  observer2 = new MutationObserver(function(mutations) {
    let error2 = document.getElementById('incorrect');
    error2.muted = false;  
    error2.volume = 0.3;
    error2.play();
  mutations.forEach(function(mutation) {
      setTimeout(()=>{
        // console.log("movimento")
        var x = alvo.style.border;
      
        if(x === 'none'){
        //   console.log("aaaaa");
        saveLost();
      


        }
      })
    });
  });

  var config = {
    attributeOldValue: true,
    // childList: true,
    // characterData: true
  };

  observer2.observe(alvo, config);
  
}

var observer3 = '';
function observarErro3(target){
  
  const alvo = document.querySelector(target)
    // console.log(alvo.innerText); 
  observer3 = new MutationObserver(function(mutations) {
    let error3 = document.getElementById('incorrect');
    error3.muted = false;  
    error3.volume = 0.3;
    error3.play();
  mutations.forEach(function(mutation) {
      setTimeout(()=>{
        // console.log("movimento")
        var x = alvo.style.border;
      
        if(x === 'none'){
        //   console.log("aaaaa");
        saveLost();
    

        }
      })
    });
  });

  var config = {
    attributeOldValue: true,
    // childList: true,
    // characterData: true
  };

  observer3.observe(alvo, config);
}


function savePoint(){
  t=t+1;
  positivos = positivos+1;

  document.getElementById('acerto').innerText = positivos;
  localStorage.setItem('acertos', positivos);
 
    if(t >= qtdQuestoes){
      console.log(qtdQuestoes)
      console.log(t);
        var ur = window.location.origin;
        localStorage.setItem('Tempo', `${minAtual}:${segAtual}`)
        notificacao("sucesso", "Muito bem voce chegou ao final do jogo")
       setTimeout(()=>{
        location.replace(`${ur}/Fim.html`)
       }, 3300)
        return;
    }

  
   observer1.disconnect();
    observer2.disconnect();
    observer3.disconnect();
 
    //disconect o primeiro
    if(t>0){
      o.disconnect();
    }
    //disconect o antigo
    if(t>1){
      obs.disconnect();
    }
    notificacao("sucesso", "Muito bem, vamos para a próxima")
    
    setTimeout(()=>{
     

      $('#question').innerText = questoes[t].pergunta;

      document.getElementById('etapa').innerText = t+1;

      const a = Math.floor(Math.random() * 4)
      trocaNumero(a,t);
    }, 3300)
 //salvar os pontos no local storage para resgtar na tela de finalização
}


		
  let minAtual = 0;
  let segAtual = 0;

function start() {
  let aux =0;
  
	// function relogio(){			
		if((min > 0) || (seg > 0)){				
			if(seg == 0){					
				seg = 59;					
        segAtual = 0;
				min = min - 1	
        if(aux > 0){
          minAtual = minAtual + 1;
        }
        aux++;
			}else{					
				seg = seg - 1;
        segAtual = segAtual + 1;				
        // console.log(segAtual)
			}	

			if(min.toString().length == 1){					
				min = "0" + min;				
        // minAtual = "0" + minAtual;	
			}				

			if(seg.toString().length == 1){					
				seg = "0" + seg;				
        segAtual = "0" + segAtual;	
			}				
      document.getElementById('tempo').innerText = min + ":" + seg;			
      // console.log(minAtual+" : "+segAtual)
			
			setTimeout(start, 1000);			
      
		}else{				
			document.getElementById('tempo').innerText = "00:00";	
      notificacao("sucesso", "O tempo acabou, que pena!")
     setTimeout(()=>{
      var ur = window.location.origin;
      location.replace(`${ur}/Fim.html`)	
     }, 2000)	
		}		
}




var o ='';
var obs = '';

function observaunico(target){
  let alvo = document.querySelector(target)
 o = new MutationObserver(function(mutations) {
  var audioB = document.getElementById('correct');
  audioB.muted = false;  
  audioB.volume = 0.5;
  audioB.play();

  console.log(alvo);
  console.log('click certo');
  
  mutations.forEach(function(mutation) {
      setTimeout(()=>{
        // console.log("movimento")
        var x = alvo.style.border;
      
        if(x === 'none'){
        //   console.log(x);
        //   notificacao("sucesso", "Muito bem, vamos para a proxima")
          setTimeout(()=>{
            savePoint();
          
          },1000)
         
        }
      })
    });
  });

  var config = {
    attributeOldValue: true,
    // childList: true,
    // characterData: true
  };

  o.observe(alvo, config);

}

function observaCerto(target){
 obs = new MutationObserver(function(mutations) {
  var audioA = document.getElementById('correct');
  audioA.muted = false;  
  audioA.volume = 0.5;
  audioA.play();
  
  mutations.forEach(function(mutation) {
      setTimeout(()=>{
        // console.log("movimento")
        var x = target.style.border;
      
        if(x === 'none'){
        
          savePoint();
          // obs.disconnect();
        }
      })
    });
  });

  var config = {
    attributeOldValue: true,
    // childList: true,
    // characterData: true
  };

  obs.observe(target, config);
}

function saveLost(){
  negativos++;
t=t+1;
// document.getElementById('acerto').innerText = negativos;
  localStorage.setItem('erros', negativos);
  if(t >= qtdQuestoes){
    var ur = window.location.origin;
    notificacao("sucesso", "Que pena, voce chegou ao final do jogo")
    localStorage.setItem('Tempo', `${minAtual}:${segAtual}`)
   setTimeout(()=>{
    location.replace(`${ur}/Fim.html`)
   }, 3300)
    return;
}

  if(t>0){
    o.disconnect();
  }
  //disconect o antigo
  if(t>1){
    obs.disconnect();
  }
// console.log("ponto negativo");
observer1.disconnect();
observer2.disconnect();
observer3.disconnect();
notificacao('erro', "Voce errou, que pena!")
// console.log(negativos);



setTimeout(()=>{

  
  


  document.getElementById('erro').innerText = negativos;
  $('#question').innerText = questoes[t].pergunta;

  document.getElementById('etapa').innerText = t+1;

  const a = Math.floor(Math.random() * 4)

  trocaNumero(a,t);
  // count = 20;

}, 3300)

}


function insereImagem(id, t, n){
      const el = document.getElementById(id);
      el.innerText = "";
      let t_img = document.createElement('img');
      t_img.setAttribute('src', `${questoes[t].distratores[n]}`)
      t_img.setAttribute('id', `img${id}`);
      el.append(t_img);
}

function insereDistratores(element, atual, questoes){


  document.querySelector(`#${element}`).classList.replace( 'image-target', 'target');
  const aux = Math.floor(Math.random() * questoes[atual].distratores.length);
  document.getElementById(element).innerText = questoes[atual].distratores[aux];
}
    
function trocaNumero(a, t){
//   console.log(questoes[t].tipo );
    if(questoes[t].tipo === "1"){

      let elements = {a:'#tecla0', b:'#tecla2', c:'#tecla3', d:'#tecla1'}

      // elements.forEach((elem)=>{
      //   document.querySelector(elem).classlist.replace('target', 'image-target');
      // });

      for (var prop in elements) {
        // ctrl+shift+k (para abrir o console no mozilla firefox)
        console.log(elements[prop]);
        document.querySelector(`${elements[prop]}`).classList.replace('target', 'image-target');
      }

      //resposta
      const element = document.getElementById(`tecla${a}`);
      element.innerText = "";
      const t1 = document.createElement('img');
      if(Array.isArray(questoes[t].resposta)){
        console.log(questoes[t].resposta)
        const aux = Math.floor(Math.random() * questoes[t].resposta.length);
        t1.setAttribute('src',  questoes[t].resposta[aux])
        t1.setAttribute('id', `imgtecla1`);
      }else{
        t1.setAttribute('src',  questoes[t].resposta)
        t1.setAttribute('id', `imgtecla1`);
      }
      element.append(t1);

      // document.getElementById('tecla0').dataset.tipo = 0;
      // document.getElementById('tecla1').dataset.tipo = 0;
      // document.getElementById('tecla2').dataset.tipo = 0;
      // document.getElementById('tecla3').dataset.tipo = 0;

      // document.getElementById(`tecla${a}`).dataset.tipo = 1;

      observaCerto($(`#tecla${a}`));

        if (a===0){
            insereImagem('tecla1', t, 0)
            insereImagem('tecla2', t, 1)
            insereImagem('tecla3', t, 2)
            observarErro1('#tecla1')
            observarErro2('#tecla2')
            observarErro3('#tecla3')
        }
        if (a===1){
            insereImagem('tecla0', t, 0 )
            insereImagem('tecla2', t, 1)
            insereImagem('tecla3', t, 2)
            observarErro1('#tecla0')
            observarErro2('#tecla2')
            observarErro3('#tecla3')
        }
        if (a===2){
            insereImagem('tecla1', t, 0)
            insereImagem('tecla0', t, 1)
            insereImagem('tecla3', t, 2)
            observarErro1('#tecla1')
            observarErro2('#tecla0')
            observarErro3('#tecla3')
        }
        if (a===3){
            insereImagem('tecla1', t, 0)
            insereImagem('tecla2', t, 1)
            insereImagem('tecla0', t, 2)
            observarErro1('#tecla1')
            observarErro2('#tecla2')
            observarErro3('#tecla0')
        }


      return;
    }


   
    if(Array.isArray(questoes[t].resposta)){
      console.log(questoes[t].resposta)
      const aux2 = Math.floor(Math.random() * questoes[t].resposta.length);
      $(`#tecla${a}`).innerText = questoes[t].resposta[aux2]
    }else{
      $(`#tecla${a}`).innerText = questoes[t].resposta
    }
    
    document.querySelector(`#tecla${a}`).classList.replace('image-target', 'target');

    let elements = {a:'#tecla0', b:'#tecla2', c:'#tecla3', d:'#tecla1'}
    for (var prop in elements) {
  
      document.querySelector(`${elements[prop]}`).classList.replace('image-target', 'target');
    }
    observaCerto($(`#tecla${a}`));
    
   
    if (a===0){
 
      if(questoes[t].distratores.length > 3){
        insereDistratores('tecla3', t, questoes);
        insereDistratores('tecla1', t, questoes);
        insereDistratores('tecla2', t, questoes);
      }else{
        document.getElementById('tecla3').innerText = questoes[t].distratores[0]
        document.getElementById('tecla1').innerText =  questoes[t].distratores[1]
        document.getElementById('tecla2').innerText =  questoes[t].distratores[2]
      }
     
     observarErro1('#tecla1')
     observarErro2('#tecla2')
     observarErro3('#tecla3')
    }

    if (a===1){
      if(questoes[t].distratores.length > 3){
        insereDistratores('tecla3', t, questoes);
        insereDistratores('tecla0', t, questoes);
        insereDistratores('tecla2', t, questoes);
      }else{
        document.getElementById('tecla3').innerText = questoes[t].distratores[0]
        document.getElementById('tecla0').innerText =  questoes[t].distratores[1]
        document.getElementById('tecla2').innerText =  questoes[t].distratores[2]
      }
     observarErro1('#tecla0')
     observarErro2('#tecla2')
     observarErro3('#tecla3')
    }

    if (a===2){
      if(questoes[t].distratores.length > 3){
        insereDistratores('tecla1', t, questoes);
        insereDistratores('tecla0', t, questoes);
        insereDistratores('tecla3', t, questoes);
      }else{
        document.getElementById('tecla1').innerText = questoes[t].distratores[0]
        document.getElementById('tecla0').innerText =  questoes[t].distratores[1]
        document.getElementById('tecla3').innerText =  questoes[t].distratores[2]
      }
     observarErro1('#tecla1')
     observarErro2('#tecla0')
     observarErro3('#tecla3')
    }

    if (a===3){
      if(questoes[t].distratores.length > 3){
        insereDistratores('tecla1', t, questoes);
        insereDistratores('tecla2', t, questoes);
        insereDistratores('tecla0', t, questoes);
      }else{
        document.getElementById('tecla1').innerText = questoes[t].distratores[0]
        document.getElementById('tecla2').innerText =  questoes[t].distratores[1]
        document.getElementById('tecla0').innerText =  questoes[t].distratores[2]
      }
     
     observarErro1('#tecla1')
     observarErro2('#tecla2')
     observarErro3('#tecla0')
    }
  


}

});