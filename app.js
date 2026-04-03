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
// ATUALIZAR QTD
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

  quantidades[id] = 0;
  atualizarQtd(id);
}

// ==========================
// 🛒 CARREGAR CARRINHO
// ==========================
function carregarCarrinho() {
  const tela = document.getElementById("carrinho");

  let html = `<h2>🛒 Carrinho</h2>`;

  if (carrinho.length === 0) {
    html += `<p>Carrinho vazio</p>`;
    tela.innerHTML = html;
    return;
  }

  let resumo = {};
  let total = 0;

  carrinho.forEach(item => {
    if (!resumo[item.nome]) {
      resumo[item.nome] = { qtd: 0, preco: item.preco };
    }
    resumo[item.nome].qtd++;
    total += item.preco;
  });

  html += `<h3>Itens:</h3>`;

  for (let nome in resumo) {
    const item = resumo[nome];
    html += `<p>${item.qtd}x ${nome} &nbsp;&nbsp;&nbsp; R$ ${(item.preco * item.qtd).toFixed(2)}</p>`;
  }

  html += `<hr>`;
  html += `<h3>Total: R$ ${total.toFixed(2)}</h3>`;

  html += `
    <button onclick="irParaPagamento()" style="margin-top:10px;">
      Finalizar pedido
    </button>
  `;

  tela.innerHTML = html;
}

// ==========================
// 💳 PAGAMENTO
// ==========================
function irParaPagamento() {
  const tela = document.getElementById("carrinho");

  const nome = localStorage.getItem("nome") || "";
  const endereco = localStorage.getItem("endereco") || "";
  const telefone = localStorage.getItem("telefone") || "";

  let html = `
    <h2>💳 Finalizar Pedido</h2>

    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Endereço:</strong> ${endereco}</p>
    <p><strong>Telefone:</strong> ${telefone}</p>

    <h3>Forma de pagamento:</h3>

    <select id="pagamento" onchange="verificarPagamento()">
      <option value="">Selecione</option>
      <option value="dinheiro">Dinheiro</option>
      <option value="pix">Pix</option>
      <option value="cartao">Cartão</option>
    </select>

    <div id="troco-area" style="margin-top:10px;"></div>

    <button onclick="finalizarPedido()" style="margin-top:15px;">
      Confirmar Pedido
    </button>
  `;

  tela.innerHTML = html;
}

// ==========================
// 💰 TROCO
// ==========================
function verificarPagamento() {
  const tipo = document.getElementById("pagamento").value;
  const area = document.getElementById("troco-area");

  if (tipo === "dinheiro") {
    area.innerHTML = `
      <p>Precisa de troco?</p>
      <input id="troco" type="number" placeholder="Digite o valor">
    `;
  } else {
    area.innerHTML = "";
  }
}

// ==========================
// 📲 FINALIZAR PEDIDO
// ==========================
function finalizarPedido() {
  const pagamento = document.getElementById("pagamento").value;
  const trocoInput = document.getElementById("troco");

  if (!pagamento) {
    alert("Escolha a forma de pagamento!");
    return;
  }

  if (pagamento === "dinheiro") {
    if (!trocoInput || trocoInput.value === "") {
      alert("Digite o valor para troco!");
      return;
    }
  }

  let mensagem = "*PEDIDO*\n\n";
  mensagem += "Itens:\n";

  let resumo = {};
  let total = 0;

  carrinho.forEach(item => {
    if (!resumo[item.nome]) {
      resumo[item.nome] = { qtd: 0, preco: item.preco };
    }
    resumo[item.nome].qtd++;
    total += item.preco;
  });

  for (let nome in resumo) {
    const item = resumo[nome];
    mensagem += `${item.qtd}x ${nome} - R$ ${(item.preco * item.qtd).toFixed(2)}\n`;
  }

  mensagem += `\nTotal: R$ ${total.toFixed(2)}\n`;
  mensagem += `Pagamento: ${pagamento}\n`;

  if (pagamento === "dinheiro") {
    mensagem += `Troco para: R$ ${trocoInput.value}\n`;
  }

  const numero = "5599999999999";

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}

// ==========================
// 👤 PERFIL (CORRIGIDO)
// ==========================
function editarPerfil() {
  trocarTela("dados");

  document.getElementById("nome").value = localStorage.getItem("nome") || "";
  document.getElementById("endereco").value = localStorage.getItem("endereco") || "";
  document.getElementById("telefone").value = localStorage.getItem("telefone") || "";
}

function salvar() {
  localStorage.setItem("nome", document.getElementById("nome").value);
  localStorage.setItem("endereco", document.getElementById("endereco").value);
  localStorage.setItem("telefone", document.getElementById("telefone").value);

  alert("Dados salvos!");
  trocarTela("perfil");
}

function sair() {
  localStorage.clear();
  alert("Saiu!");
  trocarTela("inicio");
}

// ==========================
// INICIAR
// ==========================
carregarInicio();
