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
  if (span) {
    span.innerText = qtdCaldos[i] || 0;
  }
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

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push({
    nome: item.nome,
    preco: item.preco,
    qtd: qtd
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  qtdCaldos[i] = 0;
  atualizarQtdCaldo(i);

  alert("Adicionado ao carrinho!");
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
