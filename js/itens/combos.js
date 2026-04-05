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
// ADICIONAIS (MESMO DO CALDO)
// ==========================
const ADICIONAIS_COMBO = [
    { nome: "Cheiro verde", preco: 1 },
    { nome: "Ovo de codorna", preco: 1 },
    { nome: "Torrada", preco: 1.5 },
    { nome: "Torresmo", preco: 5 },
    { nome: "Calabresa", preco: 5 },
    { nome: "Bacon", preco: 5 },
    { nome: "Mussarela", preco: 6 }
];

// ==========================
// LISTA
// ==========================
function carregarCombos() {
    const div = document.getElementById("combos");

    let html = "<h2>Combos</h2>";

    COMBOS.forEach((p, i) => {
        html += `
            <div class="card" onclick="abrirCombo(${i})">
                <img src="${p.imagem}">
                <div class="card-info">
                    <h3>${p.nome}</h3>
                    <p>${p.descricao}</p>
                    <strong>R$ ${p.preco.toFixed(2)}</strong>
                </div>
            </div>
        `;
    });

    div.innerHTML = html;
}

// ==========================
// ABRIR PRODUTO
// ==========================
let qtdCombo = 1;
let extrasCombo = {};

function abrirCombo(i) {
    const item = COMBOS[i];

    qtdCombo = 1;
    extrasCombo = {};

    let html = `
        <img src="${item.imagem}" style="width:100%; border-radius:10px;">

        <h2>${item.nome}</h2>
        <p>${item.descricao}</p>
        <strong>R$ ${item.preco.toFixed(2)}</strong>

        <div class="qtd-controle">
            <button onclick="diminuirCombo()">-</button>
            <span id="qtd-combo">1</span>
            <button onclick="aumentarCombo()">+</button>
        </div>

        <h3>Adicionais</h3>

        ${ADICIONAIS_COMBO.map((a, index) => `
            <div class="qtd-controle">
                <span>${a.nome} (+R$ ${a.preco})</span>
                <button onclick="diminuirExtraCombo(${index})">-</button>
                <span id="extra-combo-${index}">0</span>
                <button onclick="aumentarExtraCombo(${index})">+</button>
            </div>
        `).join("")}

        <textarea id="obs-combo" placeholder="Observação..."></textarea>

        <button class="btn btn-success" onclick="addCarrinhoCombo(${i})">
            Adicionar ao carrinho
        </button>
    `;

    document.getElementById("produto-detalhe").innerHTML = html;
    trocarTela("produto");
}

// ==========================
// CONTROLE
// ==========================
function aumentarCombo() {
    qtdCombo++;
    document.getElementById("qtd-combo").innerText = qtdCombo;
}

function diminuirCombo() {
    if (qtdCombo > 1) qtdCombo--;
    document.getElementById("qtd-combo").innerText = qtdCombo;
}

function aumentarExtraCombo(i) {
    extrasCombo[i] = (extrasCombo[i] || 0) + 1;
    document.getElementById(`extra-combo-${i}`).innerText = extrasCombo[i];
}

function diminuirExtraCombo(i) {
    if (!extrasCombo[i]) return;
    extrasCombo[i]--;
    document.getElementById(`extra-combo-${i}`).innerText = extrasCombo[i];
}

// ==========================
// CARRINHO
// ==========================
function addCarrinhoCombo(i) {
    const item = COMBOS[i];

    let totalExtras = 0;
    let listaExtras = [];

    ADICIONAIS_COMBO.forEach((a, index) => {
        if (extrasCombo[index]) {
            totalExtras += a.preco * extrasCombo[index];
            listaExtras.push(`${a.nome} x${extrasCombo[index]}`);
        }
    });

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.push({
        nome: item.nome,
        preco: item.preco + totalExtras,
        quantidade: qtdCombo,
        adicionais: listaExtras,
        observacao: document.getElementById("obs-combo").value
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Combo adicionado!");
}

// ==========================
carregarCombos();
