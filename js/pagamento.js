function irParaPagamento() {
  const nome = localStorage.getItem("nome");
  const endereco = localStorage.getItem("endereco");
  const telefone = localStorage.getItem("telefone");

  if (!nome || !endereco || !telefone) {
    alert("Preencha seus dados antes!");
    trocarTela("dados");
    return;
  }

  const tela = document.getElementById("carrinho");

  tela.innerHTML = `
    <h2>💳 Finalizar Pedido</h2>

    <p><strong>${nome}</strong></p>
    <p>${endereco}</p>
    <p>${telefone}</p>

    <select id="pagamento" onchange="verificarPagamento()">
      <option value="">Forma de pagamento</option>
      <option value="dinheiro">Dinheiro</option>
      <option value="pix">Pix</option>
      <option value="cartao">Cartão</option>
    </select>

    <div id="troco-area"></div>

    <button onclick="finalizarPedido()">Confirmar Pedido</button>
  `;
}

// ==========================
function verificarPagamento() {
  const tipo = document.getElementById("pagamento").value;
  const area = document.getElementById("troco-area");

  if (tipo === "dinheiro") {
    area.innerHTML = `<input id="troco" placeholder="Troco para">`;
  } else {
    area.innerHTML = "";
  }
}

// ==========================
function finalizarPedido() {
  const pagamento = document.getElementById("pagamento").value;
  if (!pagamento) return alert("Escolha o pagamento");

  let resumo = {};
  let total = 0;

  carrinho.forEach(item => {
    if (!resumo[item.nome]) {
      resumo[item.nome] = { qtd: 0, preco: item.preco };
    }
    resumo[item.nome].qtd++;
    total += item.preco;
  });

  // 🔥 SALVAR HISTÓRICO
  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  pedidos.unshift({
    data: new Date().toLocaleString(),
    itens: resumo,
    total: total
  });

  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  // 📲 WHATSAPP
  let mensagem = "*PEDIDO*\n\n";

  for (let nome in resumo) {
    const i = resumo[nome];
    mensagem += `${i.qtd}x ${nome} - R$ ${(i.qtd * i.preco).toFixed(2)}\n`;
  }

  mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

  const numero = "5535999711358";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");

  carrinho = [];
}
