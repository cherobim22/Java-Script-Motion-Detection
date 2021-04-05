





//validar a quantidade de questoes
//validar countdown
//finalisar tela inicial e tela final

document.addEventListener("DOMContentLoaded", function(){

let i = 0;
let obs = '';


const topLeft = document.querySelector('#green');
const topRight= document.querySelector('#red');
const bottomLeft = document.querySelector('#blue');
const bottomRight = document.querySelector("#yellow");

topLeft.addEventListener('click', (e)=>{
  panelClicked(e.currentTarget)
})
topRight.addEventListener('click', (e)=>{
  panelClicked(e.currentTarget)
})
bottomLeft.addEventListener('click', (e)=>{
  panelClicked(e.currentTarget)
})
bottomRight.addEventListener('click', (e)=>{
  panelClicked(e.currentTarget)
})
const randomColor = () =>{
  const panels = [
    topLeft,
    topRight,
    bottomLeft,
    bottomRight
  ];
  return panels[parseInt(Math.random() * panels.length)];
}

const sequence = [randomColor()]
let sequenceToGuess = [...sequence]

const flash = panel =>{
  return new Promise((resolve, reject) =>{
    const color = panel.style.backgroundColor;
    panel.style.backgroundColor = 'white';
    setTimeout(()=>{
      panel.style.backgroundColor = color;
      resolve();
    }, 1500)
  })
}

let canClick = false;
const panelClicked = panel =>{
  if(!canClick) return;
  const expectedPanel = sequenceToGuess.shift();
  // console.log({expectedPanel, panel});
  console.log(panel);
  if(expectedPanel === panel){
    if(sequenceToGuess.length === 0){
      //start new game
      sequence.push(randomColor());
      sequenceToGuess = [...sequence];
      startFlashing();
    }
  }else{
    alert("fim de jogo")
  }
  // console.log(target);
}

const startFlashing = async () =>{
  canClick = false;
  for (const panel of sequence){
    await flash(panel);
  }
  canClick = true;
}


setTimeout(()=>{
  startFlashing();
}, 1000)






function adicionaCerto(array, max){
  console.log({array, max});
  let element = document.getElementById(`${array[max-1]}`);
  observaCerto(element, max);
}


function observaCerto(target, max){
  obs = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
       setTimeout(()=>{
         // console.log("movimento")
         var x = target.style.border;
       
         if(x === 'none'){
         console.log('acertou');
         start(max+1);
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

 






});