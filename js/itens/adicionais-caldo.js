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
  },
  {
    id: 3,
    nome: "Caldo com Ovo de Codorna",
    descricao: "Com calabresa, bacon e ovos.",
    preco: 23.00,
    imagem: "https://via.placeholder.com/300",
    disponivel: true
  },
  {
    id: 4,
    nome: "Caldo com Mussarela",
    descricao: "Com calabresa, bacon e mussarela.",
    preco: 24.00,
    imagem: "https://via.placeholder.com/300",
    disponivel: true
  },
  {
    id: 5,
    nome: "Caldo Completo",
    descricao: "Completo com tudo.",
    preco: 25.00,
    imagem: "https://via.placeholder.com/300",
    disponivel: true
  }
];

// ==========================
// ADICIONAIS
// ==========================
const ADICIONAIS_CALDOS = [
  { id: 1, nome: "Cheiro verde extra", preco: 1.00 },
  { id: 2, nome: "Ovo de codorna (1 un)", preco: 1.00 },
  { id: 3, nome: "Pimenta biquinho (3 un)", preco: 1.00 },
  { id: 4, nome: "Torrada (3 un)", preco: 1.50 },
  { id: 5, nome: "Torresmo (20g)", preco: 5.00 },
  { id: 6, nome: "Calabresa (50g)", preco: 5.00 },
  { id: 7, nome: "Bacon (50g)", preco: 5.00 },
  { id: 8, nome: "Mussarela (50g)", preco: 6.00 }
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

  // pega só os adicionais desse caldo
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

  // limpa os checkboxes
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
              <label class="adicional-item">
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
