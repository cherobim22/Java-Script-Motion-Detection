//data
var d = new Date();
console.log(d.getDate());//dia do mes
console.log(d.getHours());//resgata o horario
console.log(d.getDay());//dia da semana
console.log(d.getTime());//retorna o valor numerico da contagem de dias desde 1970

//rest - o resto vai no array function teste(...clientes){}
//spread - espalha um array Math.max(...clientes)

const carro = {cor: "azul", portas: 4, ano: 2020}
const clon = carro;
const clonCar = {...carro, turbo: true};

console.log(clon);
console.log(clonCar);