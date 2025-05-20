/**
 * @jest-environment jsdom
*/

const math = require('mathjs')
const { calcular } = require('../src/calculadora.js');

//Puxar itens do HTML que vou usar
beforeEach(() => {
    document.body.innerHTML = `
        <input type="text" id="operacao" value="" />
        <div id="resultado">0</div>
    `;
});

test('teste para calcular', async () => {
    document.getElementById('operacao').value = '2+3';

    // Simulação que calcula o resultado da expressão ⬆
    global.fetch = jest.fn(async (url, options) => {
        const body = JSON.parse(options.body);
        const resultado = math.evaluate(body.expressao);
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ resultado })
        });
    });

    await calcular();
    
    // Verifica se é utilizado o Global.fetch
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/calcular',expect.any(Object));
    // Verifica o resultado esperado
    expect(document.getElementById('resultado').innerText).toBe(5);
});

test('teste para calcular --> se campo estiver vazio', async () => {
    document.getElementById('operacao').value = '';

    global.alert = jest.fn();// Simulando o Alert no Navegador

    await calcular();

    expect(global.alert).toHaveBeenCalledWith('Digite uma expressão antes de calcular!'); // Mensagem que deve aparecer de acordo com o calcular do calculadora.js
});
