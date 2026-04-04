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
// CONTROLE DE QUANTIDADE
// ==========================
let qtdCombos = {};

function aumentar(i) {
  qtdCombos[i] = (qtdCombos[i] || 0) + 1;
  atualizarQtd(i);
}

function diminuir(i) {
  if (!qtdCombos[i]) return;
  qtdCombos[i]--;
  atualizarQtd(i);
}

function atualizarQtd(i) {
  const span = document.getElementById(`qtd-${i}`);
  if (span) {
    span.innerText = qtdCombos[i] || 0;
  }
}

// ==========================
// ADICIONAR AO CARRINHO
// ==========================
function adicionar(i) {
  const qtd = qtdCombos[i] || 0;

  if (qtd === 0) {
    alert("Selecione a quantidade");
    return;
  }

  const combo = COMBOS[i];

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push({
    nome: combo.nome,
    preco: combo.preco,
    qtd: qtd
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // resetar quantidade
  qtdCombos[i] = 0;
  atualizarQtd(i);

  alert("Adicionado ao carrinho!");
}

// ==========================
// RENDERIZAR COMBOS
// ==========================
function carregarCombos() {
  const div = document.getElementById("produtos");

  let html = "<h2>Combos</h2>";

  COMBOS.forEach((p, i) => {
    if (!p.disponivel) return;

    html += `
      <div class="card">

        <img src="${p.imagem}" alt="">

        <div class="card-info">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <strong>R$ ${p.preco.toFixed(2)}</strong>

          <div class="qtd-controle">
            <button onclick="diminuir(${i})">-</button>
            <span id="qtd-${i}">0</span>
            <button onclick="aumentar(${i})">+</button>
          </div>

          <button class="btn btn-success" onclick="adicionar(${i})">
            Adicionar ao carrinho
          </button>
        </div>

      </div>
    `;
  });

  div.innerHTML = html;
}

// ==========================
// INICIAR
// ==========================
carregarCombos();
