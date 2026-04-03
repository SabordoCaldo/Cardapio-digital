// ==========================
// VARIÁVEIS
// ==========================
let carrinho = [];
let itemAtual = null;
let quantidade = 1;
let adicionaisSelecionados = {};


// ==========================
// TROCAR TELA
// ==========================
function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}


// ==========================
// ABRIR ITEM
// ==========================
function abrirItem(item) {
  itemAtual = item;
  quantidade = 1;
  adicionaisSelecionados = {};

  document.getElementById("item-nome").innerText = item.nome;
  document.getElementById("item-desc").innerText = item.descricao || "";
  document.getElementById("item-preco").innerText = "R$ " + item.preco.toFixed(2);

  document.getElementById("qtd").innerText = quantidade;

  const divAdicionais = document.getElementById("adicionais");
  divAdicionais.innerHTML = "";

  if (item.adicionais) {
    item.adicionais.forEach((ad, i) => {
      adicionaisSelecionados[i] = 0;

      divAdicionais.innerHTML += `
        <div class="linha-adicional">
          <span>${ad.nome} (+R$ ${ad.preco})</span>
          <button onclick="diminuirAdicional(${i})">-</button>
          <span id="ad-qtd-${i}">0</span>
          <button onclick="aumentarAdicional(${i})">+</button>
        </div>
      `;
    });
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


// ==========================
// ADICIONAIS
// ==========================
function aumentarAdicional(i) {
  adicionaisSelecionados[i]++;
  document.getElementById(`ad-qtd-${i}`).innerText = adicionaisSelecionados[i];
}

function diminuirAdicional(i) {
  if (adicionaisSelecionados[i] > 0) {
    adicionaisSelecionados[i]--;
    document.getElementById(`ad-qtd-${i}`).innerText = adicionaisSelecionados[i];
  }
}


// ==========================
// LIMPAR ITEM
// ==========================
function limparItem() {
  quantidade = 1;
  adicionaisSelecionados = {};

  document.getElementById("qtd").innerText = 1;

  document.querySelectorAll("[id^='ad-qtd-']").forEach(el => {
    el.innerText = 0;
  });
}


// ==========================
// ADICIONAR AO CARRINHO
// ==========================
function addCarrinho() {
  let totalItem = itemAtual.preco;

  let adicionais = [];

  if (itemAtual.adicionais) {
    itemAtual.adicionais.forEach((ad, i) => {
      let qtd = adicionaisSelecionados[i];

      if (qtd > 0) {
        adicionais.push({
          nome: ad.nome,
          preco: ad.preco,
          qtd
        });

        totalItem += ad.preco * qtd;
      }
    });
  }

  carrinho.push({
    nome: itemAtual.nome,
    preco: totalItem,
    qtd: quantidade,
    adicionais
  });

  atualizarCarrinho();

  trocarTela("tela-inicio");
}


// ==========================
// ATUALIZAR CARRINHO
// ==========================
function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const total = document.getElementById("total");
  const badge = document.getElementById("badge");
  const sacola = document.getElementById("sacola");
  const totalSacola = document.getElementById("total-sacola");

  lista.innerHTML = "";

  let totalGeral = 0;
  let totalItens = 0;

  carrinho.forEach(item => {
    totalGeral += item.preco * item.qtd;
    totalItens += item.qtd;

    lista.innerHTML += `
      <div>
        ${item.qtd}x ${item.nome} - R$ ${(item.preco * item.qtd).toFixed(2)}
      </div>
    `;
  });

  total.innerText = "Total: R$ " + totalGeral.toFixed(2);
  badge.innerText = totalItens;
  totalSacola.innerText = "R$ " + totalGeral.toFixed(2);

  sacola.style.display = totalItens > 0 ? "flex" : "none";
}


// ==========================
// ABRIR CARRINHO
// ==========================
function abrirCarrinho() {
  atualizarCarrinho();
  trocarTela("tela-carrinho");
}


// ==========================
// LIMPAR CARRINHO
// ==========================
function limparCarrinho() {
  carrinho = [];
  atualizarCarrinho();
}


// ==========================
// FINALIZAR PEDIDO
// ==========================
function irCheckout() {
  alert("Pedido enviado!");
}


// ==========================
// CARREGAR PRODUTOS
// ==========================
function carregarProdutos() {
  const listaCombos = document.getElementById("lista-combos");
  const listaCaldos = document.getElementById("lista-caldos");
  const listaBebidas = document.getElementById("lista-bebidas");

  combos.forEach(item => {
    listaCombos.innerHTML += criarCard(item);
  });

  caldos.forEach(item => {
    listaCaldos.innerHTML += criarCard(item);
  });

  bebidas.forEach(item => {
    listaBebidas.innerHTML += criarCard(item);
  });
}


// ==========================
// CRIAR CARD
// ==========================
function criarCard(item) {
  return `
    <div class="card" onclick='abrirItem(${JSON.stringify(item)})'>
      <p>${item.nome}</p>
      <span>R$ ${item.preco.toFixed(2)}</span>
    </div>
  `;
}


// ==========================
// INICIAR
// ==========================
carregarProdutos();
