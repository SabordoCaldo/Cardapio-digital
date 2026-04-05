// ==========================
// PRODUTOS
// ==========================
const TIPOS_BEBIDA = [
    { tipo: "LATA", nome: "Refrigerante Lata 350ml", preco: 6.5 },
    { tipo: "1L", nome: "Refrigerante 1 Litro", preco: 11 },
    { tipo: "2L", nome: "Refrigerante 2 Litros", preco: 16 }
];

// ==========================
// SABORES
// ==========================
const SABORES = [
    "Coca-Cola",
    "Coca-Cola Zero",
    "Fanta Laranja",
    "Guaraná Antártica"
];

// ==========================
// HOME
// ==========================
function carregarBebidas() {
    const div = document.getElementById("bebidas");

    let html = "<h2>Bebidas</h2>";

    TIPOS_BEBIDA.forEach((b, i) => {
        html += `
            <div class="card" onclick="abrirBebida(${i})">
                <img src="https://via.placeholder.com/300">
                <div class="card-info">
                    <h3>${b.nome}</h3>
                    <strong>R$ ${b.preco.toFixed(2)}</strong>
                </div>
            </div>
        `;
    });

    div.innerHTML = html;
}

// ==========================
// ABRIR
// ==========================
let qtdSabores = {};
let bebidaAtual = null;

function abrirBebida(i) {
    bebidaAtual = TIPOS_BEBIDA[i];
    qtdSabores = {};

    let html = `
        <img src="https://via.placeholder.com/300" style="width:100%; border-radius:10px;">
        <h2>${bebidaAtual.nome}</h2>
        <strong>R$ ${bebidaAtual.preco.toFixed(2)}</strong>

        <h3>Escolha os sabores</h3>
    `;

    SABORES.forEach((s, index) => {
        html += `
            <div class="qtd-controle">
                <span>${s}</span>
                <button onclick="menos(${index})">-</button>
                <span id="qtd-${index}">0</span>
                <button onclick="mais(${index})">+</button>
            </div>
        `;
    });

    html += `
        <textarea id="obs-bebida" placeholder="Observação..."></textarea>

        <button class="btn btn-success" onclick="addCarrinho()">
            Adicionar ao carrinho
        </button>
    `;

    document.getElementById("produto-detalhe").innerHTML = html;
    trocarTela("produto");
}

// ==========================
// CONTROLE
// ==========================
function mais(i) {
    qtdSabores[i] = (qtdSabores[i] || 0) + 1;
    document.getElementById(`qtd-${i}`).innerText = qtdSabores[i];
}

function menos(i) {
    if (!qtdSabores[i]) return;
    qtdSabores[i]--;
    document.getElementById(`qtd-${i}`).innerText = qtdSabores[i];
}

// ==========================
// CARRINHO
// ==========================
function addCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let total = 0;
    let lista = [];

    SABORES.forEach((s, i) => {
        if (qtdSabores[i]) {
            total += qtdSabores[i];
            lista.push(`${s} x${qtdSabores[i]}`);
        }
    });

    if (total === 0) {
        alert("Escolha pelo menos 1");
        return;
    }

    carrinho.push({
        nome: bebidaAtual.nome,
        preco: bebidaAtual.preco,
        quantidade: total,
        adicionais: lista,
        observacao: document.getElementById("obs-bebida").value
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Adicionado!");
}

// ==========================
carregarBebidas();
