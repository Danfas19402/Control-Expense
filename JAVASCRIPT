document.addEventListener('DOMContentLoaded', () => {
    const formGasto = document.getElementById('form-gasto');
    const gastosLista = document.getElementById('gastos-lista');
    const totalGastosElement = document.getElementById('total-gastos');
    let gastos = [];

    // Função para calcular o valor total dos gastos
    function calcularTotalGastos() {
        let total = 0;
        gastos.forEach(gasto => {
            total += gasto.valor;
        });
        return total;
    }

    // Função para renderizar a lista de gastos
    function renderizarGastos() {
        gastosLista.innerHTML = ''; // Limpa a lista

        gastos.forEach((gasto, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${gasto.estabelecimento} - ${gasto.item}: R$ ${gasto.valor.toFixed(2)}</span>
                <button class="remover-gasto" data-index="${index}">Remover</button>
            `;
            gastosLista.appendChild(listItem);
        });

        // Atualiza o texto do elemento de total
        const total = calcularTotalGastos();
        totalGastosElement.innerHTML = `<strong>Total Gasto: R$ ${total.toFixed(2)}</strong>`;

        // Adiciona funcionalidade de remover aos botões criados
        const botoesRemover = document.querySelectorAll('.remover-gasto');
        botoesRemover.forEach(botao => {
            botao.addEventListener('click', removerGasto);
        });
    }

    // Função para adicionar um novo gasto
    formGasto.addEventListener('submit', function(event) {
        event.preventDefault();

        const estabelecimento = document.getElementById('estabelecimento').value;
        const item = document.getElementById('item').value;
        const valor = parseFloat(document.getElementById('valor').value);

        if (estabelecimento && item && !isNaN(valor) && valor > 0) {
            gastos.push({ estabelecimento, item, valor });
            renderizarGastos();

            // Limpa o formulário após adicionar o gasto
            formGasto.reset();
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });

    // Função para remover um gasto
    function removerGasto(event) {
        const index = parseInt(event.target.dataset.index);
        if (!isNaN(index) && index >= 0 && index < gastos.length) {
            gastos.splice(index, 1);
            renderizarGastos();
        }
    }

    // Renderiza a lista inicial (se houver algum dado prévio)
    renderizarGastos();
});
