const carrinho = [
    { nome: "Caneta", qtde: 10, preco: 7.99 },
    { nome: "Impressora", qtde: 0, preco: 649.5 },
    { nome: "Caderno", qtde: 4, preco: 27.1 },
    { nome: "Lapis", qtde: 3, preco: 5.82 },
    { nome: "Tesoura", qtde: 1, preco: 19.2 },
    ];


    Array.prototype.meuFilter = function(fn) {
        const filtered = []
        for(let el of this ){
            if(fn(el)){
                filtered.push(el)
            }
        }
        return filtered
    }
    
    const qtdMaiorQueZero = item => item.qtde > 0 ;
    const meuFilter = carrinho.meuFilter(qtdMaiorQueZero);

    console.log(meuFilter);