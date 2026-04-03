// ==========================
// ESTADO
// ==========================
let carrinho = [];
let itemAtual = null;
let qtd = 1;

// ==========================
// INICIAR
// ==========================
window.onload = () => {
  renderLista(combos, "lista-combos");
  renderLista(caldos, "lista-caldos");
  renderLista(bebidas, "lista-bebidas");
};

// ==========================
// RENDER LISTA (IFOOD STYLE)
// ==========================
function renderLista(lista, id) {
  const container = document.getElementById(id);
  container.innerHTML = "";

  lista.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <img src="${item.img || ''}">
      
      <div class="info" onclick='abrirItem(${JSON.stringify(item)})'>
        <h3>${item.nome}</h3>
        <p>${item.desc || ""}</p>
        <span class="preco">R$ ${item.preco.toFixed(2)}</span>
      </div>

      <button class="add" onclick='addDireto(${JSON.stringify(item)})'>+</button>
    `;

    container.appendChild(div);
  });
}

// ==========================
// ABRIR ITEM
// ==========================
function abrirItem(item) {
  itemAtual = item;
  qtd = 1;

  document.getElementById("item-nome").innerText = item.nome;
  document.getElementById("item-desc").innerText = item.desc || "";
  document.getElementById("item-preco").innerText = "R$ " + item.preco.toFixed(2);
  document.getElementById("qtd").innerText = qtd;

  trocarTela("tela-item");
}

// ==========================
// QUANTIDADE
// ==========================
function aumentar() {
  qtd++;
  document.getElementById("qtd").innerText = qtd;
}

function diminuir() {
  if (qtd > 1) {
    qtd--;
    document.getElementById("qtd").innerText = qtd;
  }
}

// ==========================
// ADD DIRETO (BOTÃO +)
// ==========================
function addDireto(item) {
  carrinho.push({
    nome: item.nome,
    preco: item.preco,
    qtd: 1
  });

  atualizarCarrinho();
}

// ==========================
// ADD COM TELA
// ==========================
function addCarrinho() {
  carrinho.push({
    nome: itemAtual.nome,
    preco: itemAtual.preco,
    qtd: qtd
  });

  atualizarCarrinho();
  voltar();
}

// ==========================
// ATUALIZAR CARRINHO
// ==========================
function atualizarCarrinho() {
  let total = 0;
  let qtdTotal = 0;

  carrinho.forEach(i => {
    total += i.preco * i.qtd;
    qtdTotal += i.qtd;
  });

  document.getElementById("total-sacola").innerText = "R$ " + total.toFixed(2);
  document.getElementById("badge").innerText = qtdTotal;

  document.getElementById("sacola").style.display =
    carrinho.length > 0 ? "flex" : "none";
}

// ==========================
// ABRIR CARRINHO
// ==========================
function abrirCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";

  let total = 0;

  carrinho.forEach(item => {
    const div = document.createElement("div");
    div.innerText = `${item.qtd}x ${item.nome}`;
    lista.appendChild(div);

    total += item.preco * item.qtd;
  });

  document.getElementById("total").innerText =
    "Total: R$ " + total.toFixed(2);

  trocarTela("tela-carrinho");
}

// ==========================
// LIMPAR
// ==========================
function limparCarrinho() {
  carrinho = [];
  atualizarCarrinho();
  abrirCarrinho();
}

function limparItem() {
  qtd = 1;
  document.getElementById("qtd").innerText = qtd;
}

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
// CHECKOUT
// ==========================
function irCheckout() {
  trocarTela("tela-perfil");
}
