// ==========================
// PRODUTO ÚNICO (LATA)
// ==========================
const BEBIDA_LATA = {
    nome: "Refrigerante Lata 350ml",
    preco: 6.5,
    imagem: "https://via.placeholder.com/300"
};

// ==========================
// SABORES
// ==========================
const SABORES_LATA = [
    "Coca-Cola",
    "Coca-Cola Zero",
    "Fanta Laranja",
    "Guaraná Antártica"
];

// ==========================
// LISTA (HOME)
// ==========================
function carregarBebidas() {
    const div = document.getElementById("bebidas");

    let html = `
        <h2>Bebidas</h2>

        <div class="card" onclick="abrirLata()">
            <img src="${BEBIDA_LATA.imagem}">
            <div class="card-info">
                <h3>${BEBIDA_LATA.nome}</h3>
                <strong>R$ ${BEBIDA_LATA.preco.toFixed(2)}</strong>
            </div>
        </div>
    `;

    div.innerHTML = html;
}

// ==========================
// ABRIR PRODUTO
// ==========================
let quantidadesSabores = {};

function abrirLata() {
    quantidadesSabores = {};

    let html = `
        <img src="${BEBIDA_LATA.imagem}" style="width:100%; border-radius:10px;">

        <h2>${BEBIDA_LATA.nome}</h2>
        <strong>R$ ${BEBIDA_LATA.preco.toFixed(2)}</strong>

        <h3>Escolha os sabores</h3>
    `;

    SABORES_LATA.forEach((sabor, i) => {
        html += `
            <div class="qtd-controle">
                <span>${sabor}</span>
                <button onclick="diminuirSabor(${i})">-</button>
                <span id="sabor-${i}">0</span>
                <button onclick="aumentarSabor(${i})">+</button>
            </div>
        `;
    });

    html += `
        <textarea id="obs-bebida" placeholder="Observação..."></textarea>

        <button class="btn btn-success" onclick="addCarrinhoLata()">
            Adicionar ao carrinho
        </button>
    `;

    document.getElementById("produto-detalhe").innerHTML = html;
    trocarTela("produto");
}

// ==========================
// CONTROLE
// ==========================
function aumentarSabor(i) {
    quantidadesSabores[i] = (quantidadesSabores[i] || 0) + 1;
    document.getElementById(`sabor-${i}`).innerText = quantidadesSabores[i];
}

function diminuirSabor(i) {
    if (!quantidadesSabores[i]) return;
    quantidadesSabores[i]--;
    document.getElementById(`sabor-${i}`).innerText = quantidadesSabores[i];
}

// ==========================
// CARRINHO
// ==========================
function addCarrinhoLata() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let totalQtd = 0;
    let lista = [];

    SABORES_LATA.forEach((sabor, i) => {
        if (quantidadesSabores[i]) {
            totalQtd += quantidadesSabores[i];
            lista.push(`${sabor} x${quantidadesSabores[i]}`);
        }
    });

    if (totalQtd === 0) {
        alert("Escolha pelo menos 1 unidade");
        return;
    }

    carrinho.push({
        nome: BEBIDA_LATA.nome,
        preco: BEBIDA_LATA.preco,
        quantidade: totalQtd,
        adicionais: lista,
        observacao: document.getElementById("obs-bebida").value
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Adicionado!");
}

// ==========================
carregarBebidas();
