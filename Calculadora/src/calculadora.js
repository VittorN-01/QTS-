function limpar(){
    document.getElementById('operacao').value = '';
    document.getElementById("resultado").innerText = "0";
}

function adicionarNumero(valor) {
    document.getElementById("operacao").value += valor;
}

async function calcular() {
    const expressao = document.getElementById("operacao").value;

    // Verifica se o campo não está vazio
    if (!expressao) {
        alert("Digite uma expressão antes de calcular!");
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3000/calcular", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ expressao }) // Envia a expressão no formato correto
        });

        if (!resposta.ok) {
            throw new Error("erro ao calcular a expressão");
        }

        const dados = await resposta.json();
        document.getElementById("resultado").innerText = dados.resultado;

        } catch (erro) {
            console.error("Erro", erro);
            alert("Erro ao calcular. Verifique a expressão e tente novamente.");
        }   
    }
module.exports = {limpar, adicionarNumero, calcular}