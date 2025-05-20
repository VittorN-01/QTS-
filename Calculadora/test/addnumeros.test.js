/**
 * @jest-environment jsdom
 */
const { adicionarNumero } = require('../src/calculadora.js');

//Puxar itens do HTML que vou usar
beforeEach(() => {
    document.body.innerHTML = `
        <input type="text" id="operacao" value="" />
        <div id="resultado">0</div>
    `;
});

test('teste de adicionar os numeros ', () => {
    adicionarNumero('2');
    adicionarNumero('+');
    adicionarNumero('3');

    expect(document.getElementById('operacao').value).toBe('2+3');
});
