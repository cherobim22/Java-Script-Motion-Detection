const carrinho = [
    { nome: "Caneta", qtde: 10, preco: 7.99 },
    { nome: "Impressora", qtde: 0, preco: 649.5 },
    { nome: "Caderno", qtde: 4, preco: 27.1 },
    { nome: "Lapis", qtde: 3, preco: 5.82 },
    { nome: "Tesoura", qtde: 1, preco: 19.2 },
    ];

    //Araay.prototype -> O construtor de protótipo permite adicionar novas propriedades e métodos ao objeto Array ().

    //filter -> Cria um novo array com todos os elementos do array para qual a função de filtragem fornecida retorne true.
    Array.prototype.meuFilter = function(fn) {
        const filtered = []
        for(let el of this ){
            if(fn(el)){
                filtered.push(el)
            }
        }
        return filtered
    }

    //map -> Cria um novo array com os resultados da função fornecida chamada em cada elemento na array.
    Array.prototype.meuMap = function(fn){
        const mapped = []
        for (let el of this){
            mapped.push(fn(el))
        }
        return mapped
    }

    //reduce -> Aplica uma função contra um acumulador e cada valor do array (da esquerda para direita) para reduzi-los a um único valor.
    Array.prototype.meuReduce = function(fn, inicial){
        let ultimo = inicial
        for(let el of this){
            if(!ultimo){
                ultimo = el
                continue
            }
            ultimo = fn(ultimo, el)
        }
        return ultimo
    }
    
    const qtdMaiorQueZero = item => item.qtde > 0 
    const totalItem = item => item.qtde * item.preco
    const somar  = (a,b) => a + b

    const resultado = carrinho
        .meuFilter(qtdMaiorQueZero)
        .meuMap(totalItem)
        .meuReduce(somar)


    console.log(resultado);