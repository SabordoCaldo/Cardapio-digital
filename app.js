let itemAtual = null;
let quantidade = 1;
let adicionaisSelecionados = {};
let carrinho = [];

document.addEventListener("DOMContentLoaded", () => {
  renderCombos();
  renderCaldos();
  renderBebidas();

  nome.value = localStorage.getItem("nome") || "";
  endereco.value = localStorage.getItem("endereco") || "";
  telefone.value = localStorage.getItem("telefone") || "";
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
  lista_combos.innerHTML = "";
  COMBOS.forEach(i => lista_combos.appendChild(criarCard(i)));
}

function renderCaldos() {
  lista_caldos.innerHTML = "";
  CALDOS.forEach(i => lista_caldos.appendChild(criarCard(i)));
}

function renderBebidas() {
  lista_bebidas.innerHTML = "";
  BEBIDAS.forEach(i => lista_bebidas.appendChild(criarCard(i)));
}

function abrirItem(item) {
  itemAtual = item;
  quantidade = 1;
  adicionaisSelecionados = {};

  item_nome.innerText = item.nome;
  item_desc.innerText = item.descricao || "";
  item_preco.innerText = "R$ " + item.preco.toFixed(2);
  qtd.innerText = quantidade;

  if (item.tipo === "caldo") renderAdicionais();
  else adicionais.innerHTML = "";

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

function addCarrinho() {
  let adicionaisArr = [];
  let total = itemAtual.preco * quantidade;

  for (let id in adicionaisSelecionados) {
    const a = ADICIONAIS_CALDOS.find(x => x.id == id);
    const qtdAdd = adicionaisSelecionados[id];

    adicionaisArr.push({ nome: a.nome, qtd: qtdAdd });
    total += a.preco * qtdAdd;
  }

  carrinho.push({
    nome: itemAtual.nome,
    quantidade,
    adicionais: adicionaisArr,
    total
  });

  atualizarSacola();
  trocarTela("tela-inicio");
}

function atualizarSacola() {
  const total = carrinho.reduce((s, i) => s + i.total, 0);
  const qtd = carrinho.length;

  total_sacola.innerText = "R$ " + total.toFixed(2);
  badge.innerText = qtd;
  sacola.style.display = qtd > 0 ? "flex" : "none";
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
  lista_carrinho.innerHTML = "";
  let total = 0;

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

  document.getElementById("total").innerText = "Total: R$ " + total.toFixed(2);
}

function irCheckout() {
  let total = carrinho.reduce((s, i) => s + i.total, 0);

  if (total < 20) {
    alert("Pedido mínimo R$20");
    return;
  }

  enviarPedidoWhatsApp();
}

function enviarPedidoWhatsApp() {
  let texto = "Pedido:\n\n";
  let total = 0;

  carrinho.forEach(item => {
    texto += `${item.quantidade}x ${item.nome}\n`;

    item.adicionais.forEach(a => {
      texto += `+ ${a.qtd}x ${a.nome}\n`;
    });

    texto += "\n";
    total += item.total;
  });

  texto += `Total: R$ ${total.toFixed(2)}\n\n`;
  texto += `Nome: ${nome.value}\n`;
  texto += `Endereço: ${endereco.value}\n`;
  texto += `Telefone: ${telefone.value}`;

  window.open(`https://wa.me/5535999711358?text=${encodeURIComponent(texto)}`);
}

// salvar dados
nome.oninput = () => localStorage.setItem("nome", nome.value);
endereco.oninput = () => localStorage.setItem("endereco", endereco.value);
telefone.oninput = () => localStorage.setItem("telefone", telefone.value);
