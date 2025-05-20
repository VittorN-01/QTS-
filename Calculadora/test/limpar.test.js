/**
 * @jest-environment jsdom
 */
const { limpar } = require('../src/calculadora.js');

//Puxar itens do HTML que vou usar
beforeEach(() => {
    document.body.innerHTML = `
        <input type="text" id="operacao" value="" />
        <div id="resultado">0</div>
    `;
});

test('teste para limpar ', () => {
    document.getElementById('operacao').value = '2+2';
    document.getElementById('resultado').innerText = '4';

    limpar();

    expect(document.getElementById('operacao').value).toBe('');
    expect(document.getElementById('resultado').innerText).toBe('0');
});
