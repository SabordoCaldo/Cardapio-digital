function editarPerfil() {
  trocarTela("dados");

  document.getElementById("nome").value = localStorage.getItem("nome") || "";
  document.getElementById("endereco").value = localStorage.getItem("endereco") || "";
  document.getElementById("telefone").value = localStorage.getItem("telefone") || "";
}

function salvar() {
  localStorage.setItem("nome", nome.value);
  localStorage.setItem("endereco", endereco.value);
  localStorage.setItem("telefone", telefone.value);

  alert("Dados salvos!");
  trocarTela("perfil");
}

function sair() {
  if (confirm("Deseja realmente limpar seus dados?")) {
    localStorage.clear();
    alert("Dados apagados!");
    trocarTela("inicio");
  }
}

// ==========================
// MOSTRAR HISTÓRICO
// ==========================
function mostrarHistorico() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  let html = "<h3>   Histórico de pedidos</h3>";

  if (pedidos.length === 0) {
    html += "<p>Nenhum pedido ainda</p>";
  } else {
    pedidos.forEach((p, index) => {
      html += `<div style="margin-bottom:15px;">`;
      html += `<strong>${p.data}</strong><br>`;

      for (let nome in p.itens) {
        const i = p.itens[nome];
        html += `${i.qtd}x ${nome}<br>`;
      }

      html += `<strong>Total: R$ ${p.total.toFixed(2)}</strong><br>`;

      html += `
        <button onclick="pedirNovamente(${index})">🔁 Pedir novamente</button>
      `;

      html += `</div><hr>`;
    });

    html += `
      <button onclick="limparHistorico()" style="margin-top:10px;">
        🗑 Limpar histórico
      </button>
    `;
  }

  document.getElementById("historico").innerHTML = html;
}

// ==========================
// PEDIR NOVAMENTE
// ==========================
function pedirNovamente(index) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const pedido = pedidos[index];

  carrinho = [];

  for (let nome in pedido.itens) {
    const item = pedido.itens[nome];

    for (let i = 0; i < item.qtd; i++) {
      carrinho.push({
        nome: nome,
        preco: item.preco
      });
    }
  }

  alert("Itens adicionados ao carrinho!");
  trocarTela("carrinho");
}

// ==========================
// LIMPAR HISTÓRICO
// ==========================
function limparHistorico() {
  if (confirm("Deseja apagar todo o histórico?")) {
    localStorage.removeItem("pedidos");
    mostrarHistorico();
  }
}
