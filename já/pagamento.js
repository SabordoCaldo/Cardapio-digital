function irParaPagamento() {
  const nome = localStorage.getItem("nome");
  const endereco = localStorage.getItem("endereco");
  const telefone = localStorage.getItem("telefone");

  // 🔒 BLOQUEIO
  if (!nome || !endereco || !telefone) {
    alert("Preencha seus dados antes de finalizar o pedido!");
    trocarTela("dados");
    return;
  }

  const tela = document.getElementById("carrinho");

  tela.innerHTML = `
    <h2>💳 Finalizar Pedido</h2>

    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Endereço:</strong> ${endereco}</p>
    <p><strong>Telefone:</strong> ${telefone}</p>

    <h3>Forma de pagamento:</h3>

    <select id="pagamento" onchange="verificarPagamento()">
      <option value="">Selecione</option>
      <option value="dinheiro">Dinheiro</option>
      <option value="pix">Pix</option>
      <option value="cartao">Cartão</option>
    </select>

    <div id="troco-area"></div>

    <button onclick="finalizarPedido()">Confirmar Pedido</button>
  `;
}

function verificarPagamento() {
  const tipo = document.getElementById("pagamento").value;
  const area = document.getElementById("troco-area");

  if (tipo === "dinheiro") {
    area.innerHTML = `<input id="troco" placeholder="Troco para">`;
  } else {
    area.innerHTML = "";
  }
}

function finalizarPedido() {
  alert("Pedido enviado!");
}
