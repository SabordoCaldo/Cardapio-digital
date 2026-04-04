// ==========================
// CALDOS
// ==========================
const CALDOS = [
  {
    id: 1,
    nome: "Caldo Tradicional",
    descricao: "Caldo de feijão cremoso e temperado.",
    preco: 20.00,
    imagem: "https://via.placeholder.com/300",
    disponivel: true
  },
  {
    id: 2,
    nome: "Caldo com Calabresa e Bacon",
    descricao: "Com calabresa e bacon.",
    preco: 22.00,
    imagem: "https://via.placeholder.com/300",
    disponivel: true
  }
];

// ==========================
// ADICIONAIS
// ==========================
const ADICIONAIS_CALDOS = [
  { nome: "Cheiro verde extra", preco: 1.00 },
  { nome: "Ovo de codorna", preco: 1.00 },
  { nome: "Pimenta biquinho", preco: 1.00 },
  { nome: "Torrada", preco: 1.50 },
  { nome: "Torresmo", preco: 5.00 },
  { nome: "Calabresa", preco: 5.00 },
  { nome: "Bacon", preco: 5.00 },
  { nome: "Mussarela", preco: 6.00 }
];

// ==========================
// CONTROLE DE QUANTIDADE
// ==========================
let qtdCaldos = {};

function aumentarCaldo(i) {
  qtdCaldos[i] = (qtdCaldos[i] || 0) + 1;
  atualizarQtdCaldo(i);
}

function diminuirCaldo(i) {
  if (!qtdCaldos[i]) return;
  qtdCaldos[i]--;
  atualizarQtdCaldo(i);
}

function atualizarQtdCaldo(i) {
  const span = document.getElementById(`qtd-caldo-${i}`);
  if (span) span.innerText = qtdCaldos[i] || 0;
}

// ==========================
// ADICIONAR AO CARRINHO
// ==========================
function adicionarCaldo(i) {
  const qtd = qtdCaldos[i] || 0;

  if (qtd === 0) {
    alert("Selecione a quantidade");
    return;
  }

  const item = CALDOS[i];

  const checks = document.querySelectorAll(`.add-${i}:checked`);

  let adicionais = [];
  let totalExtras = 0;

  checks.forEach(c => {
    adicionais.push(c.dataset.nome);
    totalExtras += parseFloat(c.dataset.preco);
  });

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push({
    nome: item.nome,
    preco: item.preco + totalExtras,
    qtd: qtd,
    adicionais: adicionais
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  qtdCaldos[i] = 0;
  atualizarQtdCaldo(i);

  // limpa adicionais
  checks.forEach(c => c.checked = false);

  alert("Adicionado com adicionais!");
}

// ==========================
// RENDERIZAR CALDOS
// ==========================
function carregarCaldos() {
  const div = document.getElementById("caldos");

  let html = "<h2>Caldos</h2>";

  CALDOS.forEach((p, i) => {
    if (!p.disponivel) return;

    html += `
      <div class="card">

        <img src="${p.imagem}" alt="">

        <div class="card-info">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <strong>R$ ${p.preco.toFixed(2)}</strong>

          <div class="adicionais">
            <p><strong>Adicionais:</strong></p>

            ${ADICIONAIS_CALDOS.map(a => `
              <label>
                <input type="checkbox" class="add-${i}" 
                  data-nome="${a.nome}" 
                  data-preco="${a.preco}">
                ${a.nome} (+R$ ${a.preco.toFixed(2)})
              </label>
            `).join("")}
          </div>

          <div class="qtd-controle">
            <button onclick="diminuirCaldo(${i})">-</button>
            <span id="qtd-caldo-${i}">0</span>
            <button onclick="aumentarCaldo(${i})">+</button>
          </div>

          <button class="btn btn-success" onclick="adicionarCaldo(${i})">
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
carregarCaldos();
