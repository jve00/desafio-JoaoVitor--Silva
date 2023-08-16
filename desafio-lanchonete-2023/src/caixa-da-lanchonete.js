class CaixaDaLanchonete {
    calcularValorDaCompra(formaDePagamento, itens) {
        const cardapio = {
            'cafe': { preco: 3.0, isExtra: false },
            'chantily': { preco: 1.5, isExtra: true },
            'suco': { preco: 6.2, isExtra: false },
            'sanduiche': { preco: 6.5, isExtra: false },
            'queijo': { preco: 2.0, isExtra: true },
            'salgado': { preco: 7.25, isExtra: false },
            'combo1': { preco: 9.5, isExtra: false },
            'combo2': { preco: 10.0, isExtra: false }
        };


        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;
        let itensPrincipais = [];
        let itensExtras = [];

        for (const item of itens) {
            const [nome, quantidade] = item.split(',');

            if (!cardapio.hasOwnProperty(nome)) {
                return 'Item inválido!';
            }
            if (cardapio[nome].isExtra) {
                if (itensPrincipais.length === 0) {
                    return 'Item extra não pode ser pedido sem o principal';
                } else {
                    itensExtras.push(nome);
                }
            } else {
                itensPrincipais.push(nome);
            }
            total += cardapio[nome].preco * parseInt(quantidade);
        }
        if (itensExtras.length > 0 && itensPrincipais.length === 0) {
            return 'Item extra não pode ser pedido sem o principal';
        }
        if (formaDePagamento === 'dinheiro') {
            if (itens.some(item => parseInt(item.split(',')[1]) === 0)) {
                return 'Quantidade inválida!';
            }
            total *= 0.95; // Aplica 5% de desconto
        } else if (formaDePagamento === 'credito') {
            if (itens.some(item => !cardapio.hasOwnProperty(item.split(',')[0]))) {
                return 'Item inválido!';
            }
            total *= 1.03;
        } else if (formaDePagamento === 'debito') {
            if (itens.some(item => !cardapio.hasOwnProperty(item.split(',')[0]))) {
                return 'Item inválido!';
            }
            total *= 1.00; // Sem alterações no valor
        } else {
            return 'Forma de pagamento inválida!';
        }
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };


