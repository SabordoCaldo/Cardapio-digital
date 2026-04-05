// ==========================
// DADOS
// ==========================
const BEBIDAS = [

    // LATA
    { id: 101, nome: "Coca-Cola Lata 350ml", subcategoria: "LATA", imagem: "https://via.placeholder.com/300" },
    { id: 102, nome: "Coca-Cola Zero Lata", subcategoria: "LATA", imagem: "https://via.placeholder.com/300" },
    { id: 103, nome: "Fanta Laranja Lata", subcategoria: "LATA", imagem: "https://via.placeholder.com/300" },
    { id: 104, nome: "Guaraná Antártica Lata", subcategoria: "LATA", imagem: "https://via.placeholder.com/300" },

    // 1L
    { id: 201, nome: "Pepsi 1L", subcategoria: "1L", imagem: "https://via.placeholder.com/300" },
    { id: 202, nome: "Sukita 1L", subcategoria: "1L", imagem: "https://via.placeholder.com/300" },
    { id: 203, nome: "Guaraná Antártica 1L", subcategoria: "1L", imagem: "https://via.placeholder.com/300" },

    // 2L
    { id: 301, nome: "Coca-Cola 2L", subcategoria: "2L", imagem: "https://via.placeholder.com/300" },
    { id: 302, nome: "Coca-Cola Zero 2L", subcategoria: "2L", imagem: "https://via.placeholder.com/300" },
    { id: 303, nome: "Fanta Laranja 2L", subcategoria: "2L", imagem: "https://via.placeholder.com/300" },
    { id: 304, nome: "Guaraná Antártica 2L", subcategoria: "2L", imagem: "https://via.placeholder.com/300" }

];

// ==========================
// PREÇOS
// ==========================
const PRECOS = {
    "LATA": 6.5,
    "1L": 11,
    "2L": 16
};

// ==========================
// LISTA (HOME)
// ==========================
function carregarBebidas() {
    const div = document.getElementById("bebidas");

    let html = "<h2>Bebidas</h2>";

    const grupos = ["LATA", "1L", "2L"];

    grupos.forEach(grupo => {

        const titulo =
            grupo === "LATA" ? "Lata 350ml" :
            grupo === "1L" ? "1 Litro" :
            "2 Litros";

        html += `<h3>${titulo}</h3>`;

        BEBIDAS
        .filter(b => b.subcategoria === grupo)
        .forEach((p) => {

            html += `
                <div class="card" onclick="abrirBebida(${p.id})">
                    <img src="${p.imagem}">
                    <div class="card-info">
                        <h3>${p.nome}</h3>
                        <strong>R$ ${PRECOS[grupo].toFixed(2)}</strong>
                    </div>
                </div>
            `;
        });

    });

    div.innerHTML = html;
}

// ==========================
// ABRIR PRODUTO
// ==========================
let qtdBebida = 1;

function abrirBebida(id) {
    const item = BEBIDAS.find(b => b.id === id);

    qtdBebida = 1;

    const preco = PRECOS[item.subcategoria];

    let html = `
        <img src="${item.imagem}" style="width:100%; border-radius:10px;">

        <h2>${item.nome}</h2>
        <strong>R$ ${preco.toFixed(2)}</strong>

        <div class="qtd-controle">
            <button onclick="diminuirBebida()">-</button>
            <span id="qtd-bebida">1</span>
            <button onclick="aumentarBebida()">+</button>
        </div>

        <textarea id="obs-bebida" placeholder="Observação..."></textarea>

        <button class="btn btn-success" onclick="addCarrinhoBebida(${id})">
            Adicionar ao carrinho
        </button>
    `;

    document.getElementById("produto-detalhe").innerHTML = html;
    trocarTela("produto");
}

// ==========================
// CONTROLE
// ==========================
function aumentarBebida() {
    qtdBebida++;
    document.getElementById("qtd-bebida").innerText = qtdBebida;
}

function diminuirBebida() {
    if (qtdBebida > 1) qtdBebida--;
    document.getElementById("qtd-bebida").innerText = qtdBebida;
}

// ==========================
// CARRINHO
// ==========================
function addCarrinhoBebida(id) {
    const item = BEBIDAS.find(b => b.id === id);
    const preco = PRECOS[item.subcategoria];

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.push({
        nome: item.nome,
        preco: preco,
        quantidade: qtdBebida,
        observacao: document.getElementById("obs-bebida").value
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Bebida adicionada!");
}

// ==========================
carregarBebidas();
