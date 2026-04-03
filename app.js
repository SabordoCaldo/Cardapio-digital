let itemAtual = null;
let quantidade = 1;
let adicionaisSelecionados = {};
let carrinho = [];

// INICIO
renderCombos();
renderCaldos();
renderBebidas();

// TELAS
function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

function voltar() {
  trocarTela("tela-inicio");
}

// CARDS
function criarCard(item) {
  const div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = `
    <img src="${item.imagem}">
    <h3>${item.nome}</h3>
    <p>R$ ${item.preco.toFixed(2)}</p>
  `;

  div.onclick = () => abrirItem(item);
  return div;
}

// LISTAS
function renderCombos() {
  const c = document.getElementById("lista-combos");
  c.innerHTML = "";
  COMBOS.forEach(i => c.appendChild(criarCard(i)));
}

function renderCaldos() {
  const c = document.getElementById("lista-caldos");
  c.innerHTML = "";
  CALDOS.forEach(i => c.appendChild(criarCard(i)));
}

function renderBebidas() {
  const c = document.getElementById("lista-bebidas");
  c.innerHTML = "";
  BEBIDAS.forEach(i => c.appendChild(criarCard(i)));
}

// ITEM
function abrirItem(item) {
  itemAtual = item;
  quantidade = 1;
  adicionaisSelecionados = {};

  item_nome.innerText = item.nome;
  item_desc.innerText = item.descricao || "";
  item_preco.innerText = "R$ " + item.preco.toFixed(2);
  qtd.innerText = quantidade;

  if (item.tipo === "caldo") {
    renderAdicionais();
  } else {
    adicionais.innerHTML = "";
  }

  trocarTela("tela-item");
}

function aumentar() {
  quantidade++;
  qtd.innerText = quantidade;
}

function diminuir() {
  if (quantidade > 1) quantidade--;
  qtd.innerText = quantidade;
}

function limparItem() {
  quantidade = 1;
  adicionaisSelecionados = {};
  renderAdicionais();
}

// ADICIONAIS
function renderAdicionais() {
  adicionais.innerHTML = "";

  ADICIONAIS_CALDOS.forEach(a => {
    const div = document.createElement("div");

    div.innerHTML = `
      ${a.nome} (+R$ ${a.preco})
      <button onclick="menosAdicional(${a.id})">-</button>
      <span id="add-${a.id}">0</span>
      <button onclick="maisAdicional(${a.id})">+</button>
    `;

    adicionais.appendChild(div);
  });
}

function maisAdicional(id) {
  adicionaisSelecionados[id] = (adicionaisSelecionados[id] || 0) + 1;
  atualizar(id);
}

function menosAdicional(id) {
  if (!adicionaisSelecionados[id]) return;
  adicionaisSelecionados[id]--;
  atualizar(id);
}

function atualizar(id) {
  document.getElementById("add-" + id).innerText = adicionaisSelecionados[id] || 0;
}

// CARRINHO
function addCarrinho() {
  let adicionaisArr = [];
  let total = itemAtual.preco * quantidade;

  for (let id in adicionaisSelecionados) {
    const a = ADICIONAIS_CALDOS.find(x => x.id == id);
    const qtd = adicionaisSelecionados[id];

    adicionaisArr.push({ nome: a.nome, qtd, preco: a.preco });
    total += a.preco * qtd;
  }

  carrinho.push({
    nome: itemAtual.nome,
    quantidade,
    preco: itemAtual.preco,
    adicionais: adicionaisArr,
    total
  });

  trocarTela("tela-inicio");
}

function abrirCarrinho() {
  renderCarrinho();
  trocarTela("tela-carrinho");
}

function limparCarrinho() {
  carrinho = [];
  renderCarrinho();
}

function renderCarrinho() {
  let total = 0;
  lista_carrinho.innerHTML = "";

  carrinho.forEach(item => {
    let html = `<b>${item.quantidade}x ${item.nome}</b><br>`;

    item.adicionais.forEach(a => {
      html += `+ ${a.qtd}x ${a.nome}<br>`;
    });

    html += "<hr>";

    const div = document.createElement("div");
    div.innerHTML = html;
    lista_carrinho.appendChild(div);

    total += item.total;
  });

  total.innerText = "Total: R$ " + total.toFixed(2);
}

// CHECKOUT
function irCheckout() {
  let total = carrinho.reduce((s, i) => s + i.total, 0);

  if (total < 20) {
    alert("Pedido mínimo R$20");
    return;
  }

  trocarTela("tela-checkout");
}

// WHATSAPP
function enviarPedidoWhatsApp() {
  let texto = "🧾 Pedido - Sabor do Caldo\n\n";
  let total = 0;

  carrinho.forEach(item => {
    texto += `${item.quantidade}x ${item.nome}\n`;

    item.adicionais.forEach(a => {
      texto += `+ ${a.qtd}x ${a.nome}\n`;
    });

    texto += "\n";
    total += item.total;
  });

  texto += `💰 Total: R$ ${total.toFixed(2)}\n\n`;

  texto += `Nome: ${nome.value}\n`;
  texto += `Endereço: ${endereco.value}\n`;
  texto += `Telefone: ${telefone.value}\n`;

  const pag = pagamento.value;
  texto += `Pagamento: ${pag}\n`;

  if (pag === "Dinheiro") {
    texto += `Troco: ${troco.value}\n`;
  }

  window.open(`https://wa.me/5535999711358?text=${encodeURIComponent(texto)}`);
}
