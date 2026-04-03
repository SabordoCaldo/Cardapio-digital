let itemAtual = null;
let quantidade = 1;
let adicionaisSelecionados = {};
let carrinho = [];

document.addEventListener("DOMContentLoaded", () => {
  renderCombos();
  renderCaldos();
  renderBebidas();
});

function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

function voltar() {
  trocarTela("tela-inicio");
}

function criarCard(item) {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <img src="${item.imagem}">
    <h3>${item.nome}</h3>
    <p>R$ ${item.preco.toFixed(2)}</p>
  `;

  div.onclick = () => abrirItem(item);
  return div;
}

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

function abrirItem(item) {
  itemAtual = item;
  quantidade = 1;
  adicionaisSelecionados = {};

  document.getElementById("item-nome").innerText = item.nome;
  document.getElementById("item-desc").innerText = item.descricao || "";
  document.getElementById("item-preco").innerText = "R$ " + item.preco.toFixed(2);
  document.getElementById("qtd").innerText = quantidade;

  trocarTela("tela-item");
}

function aumentar() {
  quantidade++;
  document.getElementById("qtd").innerText = quantidade;
}

function diminuir() {
  if (quantidade > 1) quantidade--;
  document.getElementById("qtd").innerText = quantidade;
}

function addCarrinho() {
  carrinho.push({
    nome: itemAtual.nome,
    quantidade,
    total: itemAtual.preco * quantidade,
    adicionais: []
  });

  atualizarSacola();
  trocarTela("tela-inicio");
}

function atualizarSacola() {
  const total = carrinho.reduce((s, i) => s + i.total, 0);
  const qtd = carrinho.length;

  document.getElementById("total-sacola").innerText = "R$ " + total.toFixed(2);
  document.getElementById("badge").innerText = qtd;
  document.getElementById("sacola").style.display = qtd > 0 ? "flex" : "none";
}

function abrirCarrinho() {
  renderCarrinho();
  trocarTela("tela-carrinho");
}

function limparCarrinho() {
  carrinho = [];
  atualizarSacola();
  renderCarrinho();
}

function renderCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";

  let total = 0;

  carrinho.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `${item.quantidade}x ${item.nome}`;
    lista.appendChild(div);

    total += item.total;
  });

  document.getElementById("total").innerText = "Total: R$ " + total.toFixed(2);
}

function irCheckout() {
  let total = carrinho.reduce((s, i) => s + i.total, 0);

  if (total < 20) {
    alert("Pedido mínimo R$20");
    return;
  }

  window.open("https://wa.me/5535999711358");
}
