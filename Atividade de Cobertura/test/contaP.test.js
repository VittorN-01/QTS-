const { ContaPoupanca } = require("../model/ContaPoupanca.js")
const { Titular } = require("../model/Titular.js")

// Gera contas poupança iniciais
ContaPoupanca.gerarContasPoupanca()
const contas = ContaPoupanca.contasCP
const titular = Titular.titulares[1]

// teste para criar uma Conta Poupança
test("Deve criar uma conta poupança, render juros e não taxar", () => {
    const cp = new ContaPoupanca(2000, 2222, 202, 2002, titular)

    // Render juros por 2 meses
    cp.renderJuros(2)

    // 1800 * 1.005^2 ≈ 
    expect(cp.saldo).toBeCloseTo(2020.05, 2) // saldo aumentado corretamente

    // Teste polimórfico: não deve reduzir saldo ao taxar
    const saldoAntesTaxa = cp.saldo
    cp.cobrarTaxa() // método polimórfico da poupança
    expect(cp.saldo).toBe(saldoAntesTaxa)
})

// Teste para render juros simples (1 período)
test("Deve render juros corretamente", () => {
    const cp = contas[2] // saldo inicial: 1800
    cp.renderJuros() // padrão 1 mês

    // 1800 * 1.005^1 ≈ 1809
    expect(cp.saldo).toBeCloseTo(1809, 2)
})

// Teste para render juros múltiplos períodos (+ de 1 pedíodo)
test("Deve render juros por múltiplos períodos", () => {
    const cp = contas[2] // saldo inicial: 1800
    cp.renderJuros(3) // 3 meses

    // 1800 * 1.005^3 ≈ 1836.27
    expect(cp.saldo).toBeCloseTo(1836.27, 2)
})

// testes de SAQUE
test("Saque dentro do saldo deve funcionar", () => {
    const cp = new ContaPoupanca(1500, 1234, 201, 2001, titular)
    const result = cp.saque(500, true)
    expect(result.saque).toBe(`Saque de 500 realizado com sucesso, seu saldo atual é 1000`)
})

test("Saque acima do saldo deve impedir saque", () => {
    const cp = new ContaPoupanca(500, 1234, 201, 2001, titular)
    const result = cp.saque(600, true)
    expect(result.saque).toBe(`Saque não realizado por falta de saldo`)
})

// Testar o POLIMORFISMO
test("ContaPoupanca não deve reduzir saldo ao taxar", () => {
    const cp = new ContaPoupanca(2000, 1234, 201, 2001, titular)
    const saldoAntes = cp.saldo
    cp.cobrarTaxa() // poupança não paga taxa
    expect(cp.saldo).toBe(saldoAntes)
})

// Teste para TRANSFERÊNCIA
test('Transferência CP → CP', () => {
    const origem = contas[2]; // saldo inicial: 1800
    const destino = contas[3]; // saldo inicial: 3600

    // Renderiza juros antes da transferência (3 meses)
    origem.renderJuros(3) // saldo atualizado automaticamente


    const result = origem.transferir(
        { agencia: origem.agencia, numero: origem.numero_conta, senha: origem.senha },
        { agencia: destino.agencia, numero: destino.numero_conta, senha: destino.senha },
        100
    );

    expect(result).toEqual({ transferencia: "Realizada com sucesso" });
    expect(origem.saldo).toBeCloseTo(1763.95, 2); 
    expect(destino.saldo).toBeCloseTo(3300); 
});


test("Falha de transferência CP → CP por saldo insuficiente", () => {
    let origem = contas[2]; // saldo: 1800
    let destino = contas[3]; // saldo: 3200

    origem.saldo = 50;
    const result = origem.transferir(
        { agencia: origem.agencia, numero: origem.numero_conta, senha: origem.senha },
        { agencia: destino.agencia, numero: destino.numero_conta, senha: destino.senha },
        100
    );

    expect(result).toEqual({ transferencia: "Não realizada com sucesso" });
    expect(origem.saldo).toBe(50);
    expect(destino.saldo).toBe(3300);
})

test("Falha de transferência CP → CP para conta inexistente", () => {
    let origem = contas[2]; // Conta exixtente

    const result = origem.transferir(
        { agencia: origem.agencia, numero: origem.numero_conta, senha: origem.senha },
        { agencia: 0, numero: 0, senha: 0 }, // conta inválida
        100
    );

    expect(result).toEqual({ conta: "Conta de destino inexistente" });
})