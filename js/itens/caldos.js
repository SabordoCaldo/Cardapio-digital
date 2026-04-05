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
const ADICIONAIS = [
    { nome: "Cheiro verde", preco: 1 },
    { nome: "Ovo de codorna", preco: 1 },
    { nome: "Torrada", preco: 1.5 },
    { nome: "Torresmo", preco: 5 },
    { nome: "Calabresa", preco: 5 },
    { nome: "Bacon", preco: 5 },
    { nome: "Mussarela", preco: 6 }
];

// ==========================
// LISTA (HOME)
// ==========================
function carregarCaldos() {
    const div = document.getElementById("caldos");

    let html = "<h2>Caldos</h2>";

    CALDOS.forEach((p, i) => {
        html += `
            <div class="card" onclick="abrirCaldo(${i})">
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
let qtdCaldo = 1;
let extrasCaldo = {};

function abrirCaldo(i) {
    const item = CALDOS[i];

    qtdCaldo = 1;
    extrasCaldo = {};

    let html = `
        <img src="${item.imagem}" style="width:100%; border-radius:10px;">

        <h2>${item.nome}</h2>
        <p>${item.descricao}</p>
        <strong>R$ ${item.preco.toFixed(2)}</strong>

        <div class="qtd-controle">
            <button onclick="diminuirCaldo()">-</button>
            <span id="qtd-caldo">1</span>
            <button onclick="aumentarCaldo()">+</button>
        </div>

        <h3>Adicionais</h3>

        ${ADICIONAIS.map((a, index) => `
            <div class="qtd-controle">
                <span>${a.nome} (+R$ ${a.preco})</span>
                <button onclick="diminuirExtraCaldo(${index})">-</button>
                <span id="extra-caldo-${index}">0</span>
                <button onclick="aumentarExtraCaldo(${index})">+</button>
            </div>
        `).join("")}

        <textarea id="obs-caldo" placeholder="Observação..."></textarea>

        <button class="btn btn-success" onclick="addCarrinhoCaldo(${i})">
            Adicionar ao carrinho
        </button>
    `;

    document.getElementById("produto-detalhe").innerHTML = html;
    trocarTela("produto");
}

// ==========================
// CONTROLES
// ==========================
function aumentarCaldo() {
    qtdCaldo++;
    document.getElementById("qtd-caldo").innerText = qtdCaldo;
}

function diminuirCaldo() {
    if (qtdCaldo > 1) qtdCaldo--;
    document.getElementById("qtd-caldo").innerText = qtdCaldo;
}

function aumentarExtraCaldo(i) {
    extrasCaldo[i] = (extrasCaldo[i] || 0) + 1;
    document.getElementById(`extra-caldo-${i}`).innerText = extrasCaldo[i];
}

function diminuirExtraCaldo(i) {
    if (!extrasCaldo[i]) return;
    extrasCaldo[i]--;
    document.getElementById(`extra-caldo-${i}`).innerText = extrasCaldo[i];
}

// ==========================
// CARRINHO
// ==========================
function addCarrinhoCaldo(i) {
    const item = CALDOS[i];

    let totalExtras = 0;
    let listaExtras = [];

    ADICIONAIS.forEach((a, index) => {
        if (extrasCaldo[index]) {
            totalExtras += a.preco * extrasCaldo[index];
            listaExtras.push(`${a.nome} x${extrasCaldo[index]}`);
        }
    });

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.push({
        nome: item.nome,
        preco: item.preco + totalExtras,
        quantidade: qtdCaldo,
        adicionais: listaExtras,
        observacao: document.getElementById("obs-caldo").value
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Caldo adicionado!");
}

// ==========================
carregarCaldos();
