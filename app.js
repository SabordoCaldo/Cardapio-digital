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
// BLOQUEAR CAMPOS
// ==========================
function bloquearCampos(bloquear) {
  document.getElementById("nome").readOnly = bloquear;
  document.getElementById("endereco").readOnly = bloquear;
  document.getElementById("telefone").readOnly = bloquear;

  const botao = document.querySelector(".form button");
  botao.style.display = bloquear ? "none" : "block";
}

// ==========================
// ABRIR DADOS
// ==========================
function abrirDados() {
  trocarTela("dados");

  document.getElementById("nome").value = localStorage.getItem("nome") || "";
  document.getElementById("endereco").value = localStorage.getItem("endereco") || "";
  document.getElementById("telefone").value = localStorage.getItem("telefone") || "";

  const temDados = localStorage.getItem("nome");

  if (temDados) {
    bloquearCampos(true);
  } else {
    bloquearCampos(false);
  }
}

// ==========================
// SALVAR
// ==========================
function salvar() {
  localStorage.setItem("nome", document.getElementById("nome").value);
  localStorage.setItem("endereco", document.getElementById("endereco").value);
  localStorage.setItem("telefone", document.getElementById("telefone").value);

  alert("Dados salvos!");

  trocarTela("perfil");
}

// ==========================
// EDITAR PERFIL
// ==========================
function editarPerfil() {
  trocarTela("dados");

  document.getElementById("nome").value = localStorage.getItem("nome") || "";
  document.getElementById("endereco").value = localStorage.getItem("endereco") || "";
  document.getElementById("telefone").value = localStorage.getItem("telefone") || "";

  bloquearCampos(false);
}

// ==========================
// SAIR
// ==========================
function sair() {
  localStorage.clear();
  alert("Saiu!");

  trocarTela("inicio");
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
// CARREGAR INÍCIO
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
              <button onclick="adicionarItem(${combo.id})">➕</button>
            </div>
          </div>

        </div>
      `;
    }
  });

  html += `</div>`;

  inicio.innerHTML = html;
}

// ==========================
// ADICIONAR
// ==========================
function adicionarItem(id) {
  const item = COMBOS.find(c => c.id === id);

  carrinho.push({
    nome: item.nome,
    preco: item.preco
  });

  quantidades[id] = (quantidades[id] || 0) + 1;

  atualizarQtd(id);
}

// ==========================
// REMOVER
// ==========================
function removerItem(id) {
  const item = COMBOS.find(c => c.id === id);

  const index = carrinho.findIndex(i => i.nome === item.nome);

  if (index !== -1) {
    carrinho.splice(index, 1);
    quantidades[id]--;

    if (quantidades[id] < 0) quantidades[id] = 0;

    atualizarQtd(id);
  }
}

// ==========================
// ATUALIZAR QTD
// ==========================
function atualizarQtd(id) {
  const el = document.getElementById(`qtd-${id}`);
  if (el) el.innerText = quantidades[id] || 0;
                }
