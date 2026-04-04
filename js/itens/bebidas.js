// ==========================
// CONTROLE DE QUANTIDADE
// ==========================
let qtdBebidas = {};

function aumentarBebida(i) {
  qtdBebidas[i] = (qtdBebidas[i] || 0) + 1;
  atualizarQtdBebida(i);
}

function diminuirBebida(i) {
  if (!qtdBebidas[i]) return;
  qtdBebidas[i]--;
  atualizarQtdBebida(i);
}

function atualizarQtdBebida(i) {
  const span = document.getElementById(`qtd-bebida-${i}`);
  if (span) {
    span.innerText = qtdBebidas[i] || 0;
  }
}

// ==========================
// ADICIONAR AO CARRINHO
// ==========================
function adicionarBebida(i) {
  const qtd = qtdBebidas[i] || 0;

  if (qtd === 0) {
    alert("Selecione a quantidade");
    return;
  }

  const item = BEBIDAS[i];

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push({
    nome: item.nome,
    preco: item.preco,
    qtd: qtd
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  qtdBebidas[i] = 0;
  atualizarQtdBebida(i);

  alert("Adicionado ao carrinho!");
}

// ==========================
// RENDERIZAR BEBIDAS
// ==========================
function carregarBebidas() {
  const div = document.getElementById("bebidas");

  let html = "<h2>Bebidas</h2>";

  BEBIDAS.forEach((p, i) => {
    if (!p.disponivel) return;

    html += `
      <div class="card">

        <img src="${p.imagem}" alt="">

        <div class="card-info">
          <h3>${p.nome}</h3>
          <p>${p.descricao || ""}</p>
          <strong>R$ ${p.preco.toFixed(2)}</strong>

          <div class="qtd-controle">
            <button onclick="diminuirBebida(${i})">-</button>
            <span id="qtd-bebida-${i}">0</span>
            <button onclick="aumentarBebida(${i})">+</button>
          </div>

          <button class="btn btn-success" onclick="adicionarBebida(${i})">
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
carregarBebidas();
