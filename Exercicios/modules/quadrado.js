import numAleatorio from "./aleatorio.js";

export function area(l){
    return l*l;
}

export function perimetro(l){
    return 4*l;
}

function aleatorio(){
    return numAleatorio();
}

const Quadrado = {
    area,
    perimetro, 
    aleatorio
}

export default Quadrado;