// ==========================
// TROCAR TELA
// ==========================
function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");

  if (id === "inicio") {
    carregarInicio();
  }

  if (id === "carrinho") {
    carregarCarrinho();
  }
}

// ==========================
// COMBOS
// ==========================
const COMBOS = [
  {
    id: 1001,
    nome: "Combo Caldo + Refrigerante Lata",
    descricao: "1 caldo + 1 refrigerante lata 350ml",
    preco: 27.00,
    imagem: "https://via.placeholder.com/300",
    tipo: "combo",
    disponivel: true
  }
];

// ==========================
// ESTADO
// ==========================
let carrinho = [];
let quantidades = {};

// ==========================
// CARREGAR INICIO
// ==========================
function carregarInicio() {
  const inicio = document.getElementById("inicio");

  let html = `
    <div class="topo">
      <div class="logo"></div>
      <h1>Sabor do Caldo</h1>
      <p>Passos - MG</p>
    </div>

    <div style="margin-top:20px;">
      <h2>🔥 Combos</h2>
  `;

  COMBOS.forEach(combo => {
    if (combo.disponivel) {
      html += `
        <div style="border:1px solid #ddd; padding:10px; border-radius:8px; margin-top:10px; display:flex; gap:10px;">
          
          <img src="${combo.imagem}" style="width:70px; height:70px; border-radius:8px;">

          <div style="flex:1;">
            <strong>${combo.nome}</strong>
            <p style="font-size:12px;">${combo.descricao}</p>
            <p><b>R$ ${combo.preco.toFixed(2)}</b></p>

            <div style="display:flex; align-items:center; gap:10px;">
              <button onclick="removerItem(${combo.id})">➖</button>
              <span id="qtd-${combo.id}">0</span>
              <button onclick="adicionarQtd(${combo.id})">➕</button>
            </div>

            <button onclick="adicionarAoCarrinho(${combo.id})" style="margin-top:5px;">
              Adicionar ao carrinho
            </button>

          </div>

        </div>
      `;
    }
  });

  html += `</div>`;

  inicio.innerHTML = html;
}

// ==========================
// ➕ ADICIONAR QTD
// ==========================
function adicionarQtd(id) {
  quantidades[id] = (quantidades[id] || 0) + 1;
  atualizarQtd(id);
}

// ==========================
// ➖ REMOVER QTD
// ==========================
function removerItem(id) {
  quantidades[id] = (quantidades[id] || 0) - 1;

  if (quantidades[id] < 0) {
    quantidades[id] = 0;
  }

  atualizarQtd(id);
}

// ==========================
// ATUALIZAR QTD NA TELA
// ==========================
function atualizarQtd(id) {
  const el = document.getElementById(`qtd-${id}`);
  if (el) {
    el.innerText = quantidades[id] || 0;
  }
}

// ==========================
// ADICIONAR AO CARRINHO
// ==========================
function adicionarAoCarrinho(id) {
  const item = COMBOS.find(c => c.id === id);
  const qtd = quantidades[id] || 0;

  if (qtd === 0) {
    alert("Escolha a quantidade!");
    return;
  }

  for (let i = 0; i < qtd; i++) {
    carrinho.push({
      nome: item.nome,
      preco: item.preco
    });
  }

  alert("Item adicionado ao carrinho!");

  // resetar quantidade
  quantidades[id] = 0;
  atualizarQtd(id);
}

// ==========================
// CARREGAR CARRINHO
// ==========================
function carregarCarrinho() {
  const tela = document.getElementById("carrinho");

  let html = `<h2>🛒 Carrinho</h2>`;

  let total = 0;

  carrinho.forEach(item => {
    html += `<p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>`;
    total += item.preco;
  });

  html += `<h3>Total: R$ ${total.toFixed(2)}</h3>`;

  tela.innerHTML = html;
}

// ==========================
// INICIAR
// ==========================
carregarInicio();
