// ==========================
// IR PARA PAGAMENTO
// ==========================
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

  let html = `
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

    <div id="troco-area" style="margin-top:10px;"></div>

    <button onclick="finalizarPedido()" style="margin-top:15px;">
      Confirmar Pedido
    </button>

    <button onclick="trocarTela('carrinho')" style="margin-top:10px;">
      Voltar
    </button>
  `;

  tela.innerHTML = html;
}

// ==========================
// TROCO
// ==========================
function verificarPagamento() {
  const tipo = document.getElementById("pagamento").value;
  const area = document.getElementById("troco-area");

  if (tipo === "dinheiro") {
    area.innerHTML = `
      <p>Precisa de troco?</p>
      <input id="troco" type="number" placeholder="Digite o valor">
    `;
  } else {
    area.innerHTML = "";
  }
}

// ==========================
// FINALIZAR PEDIDO
// ==========================
function finalizarPedido() {
  const pagamento = document.getElementById("pagamento").value;
  const trocoInput = document.getElementById("troco");

  if (!pagamento) {
    alert("Escolha a forma de pagamento!");
    return;
  }

  if (pagamento === "dinheiro") {
    if (!trocoInput || trocoInput.value === "") {
      alert("Digite o valor para troco!");
      return;
    }
  }

  let mensagem = "*PEDIDO - SABOR DO CALDO*\n\n";

  // ==========================
  // DADOS DO CLIENTE
  // ==========================
  mensagem += "👤 Cliente:\n";
  mensagem += `${localStorage.getItem("nome")}\n`;
  mensagem += `${localStorage.getItem("telefone")}\n`;
  mensagem += `${localStorage.getItem("endereco")}\n\n`;

  // ==========================
  // ITENS
  // ==========================
  mensagem += "🛒 Itens:\n";

  let resumo = {};
  let total = 0;

  carrinho.forEach(item => {
    if (!resumo[item.nome]) {
      resumo[item.nome] = { qtd: 0, preco: item.preco };
    }
    resumo[item.nome].qtd++;
    total += item.preco;
  });

  for (let nome in resumo) {
    const item = resumo[nome];
    mensagem += `${item.qtd}x ${nome} - R$ ${(item.qtd * item.preco).toFixed(2)}\n`;
  }

  mensagem += `\n💰 Total: R$ ${total.toFixed(2)}\n`;
  mensagem += `💳 Pagamento: ${pagamento}\n`;

  if (pagamento === "dinheiro") {
    mensagem += `💵 Troco para: R$ ${trocoInput.value}\n`;
  }

  // ==========================
  // SALVAR HISTÓRICO
  // ==========================
  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  pedidos.unshift({
    data: new Date().toLocaleString(),
    itens: resumo,
    total: total
  });

  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  // ==========================
  // WHATSAPP
  // ==========================
  const numero = "5535999711358";

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");

  // ==========================
  // LIMPAR CARRINHO
  // ==========================
  carrinho = [];
}
