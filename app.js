// ==========================
// VARIÁVEIS
// ==========================
let itemAtual = null;
let quantidade = 1;
let adicionaisSelecionados = {};
let carrinho = [];

// ==========================
// INICIAR
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  renderCombos();
  renderCaldos();
  renderBebidas();
});

// ==========================
// TELAS
// ==========================
function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

function voltar() {
  trocarTela("tela-inicio");
}

// ==========================
// CARDS
// ==========================
function criarCard(item) {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <img src="${item.imagem}">
    <h3>${item.nome}</h3>
    <p>R$ ${item.preco.toFixed(2)}</p>
  `;

  div.addEventListener("click", () => abrirItem(item));

  return div;
}

// ==========================
// LISTAS
// ==========================
function renderCombos() {
  const c = document.getElementById("lista-combos");
  if (!c) return;
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

// ==========================
// ITEM
// ==========================
function abrirItem(item) {
  itemAtual = item;
  quantidade = 1;
  adicionaisSelecionados = {};

  document.getElementById("item-nome").innerText = item.nome;
  document.getElementById("item-desc").innerText = item.descricao || "";
  document.getElementById("item-preco").innerText = "R$ " + item.preco.toFixed(2);
  document.getElementById("qtd").innerText = quantidade;

  if (item.tipo === "caldo") {
    renderAdicionais();
  } else {
    document.getElementById("adicionais").innerHTML = "";
  }

  trocarTela("tela-item");
}

// ==========================
// QUANTIDADE
// ==========================
function aumentar() {
  quantidade++;
  document.getElementById("qtd").innerText = quantidade;
}

function diminuir() {
  if (quantidade > 1) quantidade--;
  document.getElementById("qtd").innerText = quantidade;
}

function limparItem() {
  quantidade = 1;
  adicionaisSelecionados = {};
  renderAdicionais();
}

// ==========================
// ADICIONAIS
// ==========================
function renderAdicionais() {
  const c = document.getElementById("adicionais");
  c.innerHTML = "";

  ADICIONAIS_CALDOS.forEach(a => {
    const div = document.createElement("div");

    div.innerHTML = `
      ${a.nome} (+R$ ${a.preco})
      <button onclick="menosAdicional(${a.id})">-</button>
      <span id="add-${a.id}">0</span>
      <button onclick="maisAdicional(${a.id})">+</button>
    `;

    c.appendChild(div);
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

// ==========================
// CARRINHO
// ==========================
function addCarrinho() {
  let total = itemAtual.preco * quantidade;

  carrinho.push({
    nome: itemAtual.nome,
    quantidade,
    total
  });

  alert("Adicionado ao carrinho!");
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
  const c = document.getElementById("lista-carrinho");
  const totalEl = document.getElementById("total");

  c.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    const div = document.createElement("div");
    div.innerText = `${item.quantidade}x ${item.nome}`;
    c.appendChild(div);

    total += item.total;
  });

  totalEl.innerText = "Total: R$ " + total.toFixed(2);
}

// ==========================
// CHECKOUT
// ==========================
function irCheckout() {
  let total = carrinho.reduce((s, i) => s + i.total, 0);

  if (total < 20) {
    alert("Pedido mínimo R$20");
    return;
  }

  trocarTela("tela-checkout");
}

// ==========================
// WHATSAPP
// ==========================
function enviarPedidoWhatsApp() {
  let texto = "Pedido:\n\n";
  let total = 0;

  carrinho.forEach(item => {
    texto += `${item.quantidade}x ${item.nome}\n`;
    total += item.total;
  });

  texto += `\nTotal: R$ ${total.toFixed(2)}\n`;

  window.open(`https://wa.me/5535999711358?text=${encodeURIComponent(texto)}`);
    }
