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

            <div style="display:flex; gap:10px;">
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
