// ==========================
let carrinho = [];
let quantidades = {};

// ==========================
function adicionarQtd(id) {
  quantidades[id] = (quantidades[id] || 0) + 1;
  atualizarQtd(id);
}

function removerItem(id) {
  quantidades[id] = Math.max((quantidades[id] || 0) - 1, 0);
  atualizarQtd(id);
}

function atualizarQtd(id) {
  const el = document.getElementById(`qtd-${id}`);
  if (el) el.innerText = quantidades[id] || 0;
}

// ==========================
function adicionarAoCarrinho(id) {
  const item = COMBOS.find(c => c.id === id);
  const qtd = quantidades[id] || 0;

  if (qtd === 0) {
    alert("Escolha a quantidade!");
    return;
  }

  for (let i = 0; i < qtd; i++) {
    carrinho.push({ nome: item.nome, preco: item.preco });
  }

  quantidades[id] = 0;
  atualizarQtd(id);
  alert("Item adicionado!");
}

// ==========================
function carregarCarrinho() {
  const tela = document.getElementById("carrinho");

  let html = `<h2>🛒 Carrinho</h2>`;

  if (carrinho.length === 0) {
    html += `<p>Carrinho vazio</p>`;
    tela.innerHTML = html;
    return;
  }

  let resumo = {};
  let total = 0;

  carrinho.forEach(item => {
    if (!resumo[item.nome]) {
      resumo[item.nome] = { qtd: 0, preco: item.preco };
    }
    resumo[item.nome].qtd++;
    total += item.preco;
  });

  html += `<h3>Itens:</h3>`;

  for (let nome in resumo) {
    const item = resumo[nome];
    html += `<p>${item.qtd}x ${nome} &nbsp;&nbsp;&nbsp; R$ ${(item.qtd * item.preco).toFixed(2)}</p>`;
  }

  html += `<hr><h3>Total: R$ ${total.toFixed(2)}</h3>`;

  html += `<button onclick="irParaPagamento()">Finalizar pedido</button>`;

  tela.innerHTML = html;
}
