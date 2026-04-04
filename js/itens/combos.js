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
    disponivel: true
  }
];

// ==========================
// CONTROLE
// ==========================
let qtdCombos = {};

function aumentarCombo(i) {
  qtdCombos[i] = (qtdCombos[i] || 0) + 1;
  atualizarQtdCombo(i);
}

function diminuirCombo(i) {
  if (!qtdCombos[i]) return;
  qtdCombos[i]--;
  atualizarQtdCombo(i);
}

function atualizarQtdCombo(i) {
  const span = document.getElementById(`qtd-combo-${i}`);
  if (span) span.innerText = qtdCombos[i] || 0;
}

// ==========================
// CARRINHO
// ==========================
function adicionarCombo(i) {
  const qtd = qtdCombos[i] || 0;

  if (qtd === 0) {
    alert("Selecione a quantidade");
    return;
  }

  const item = COMBOS[i];

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push({
    nome: item.nome,
    preco: item.preco,
    qtd: qtd
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  qtdCombos[i] = 0;
  atualizarQtdCombo(i);

  alert("Adicionado ao carrinho!");
}

// ==========================
// RENDER
// ==========================
function carregarCombos() {
  const div = document.getElementById("combos");

  let html = "<h2>Combos</h2>";

  COMBOS.forEach((p, i) => {
    if (!p.disponivel) return;

    html += `
      <div class="card">
        <img src="${p.imagem}">
        <div class="card-info">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <strong>R$ ${p.preco.toFixed(2)}</strong>

          <div class="qtd-controle">
            <button onclick="diminuirCombo(${i})">-</button>
            <span id="qtd-combo-${i}">0</span>
            <button onclick="aumentarCombo(${i})">+</button>
          </div>

          <button class="btn btn-success" onclick="adicionarCombo(${i})">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    `;
  });

  div.innerHTML = html;
}

carregarCombos();
