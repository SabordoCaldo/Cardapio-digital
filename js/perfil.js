function editarPerfil() {
  trocarTela("dados");

  nome.value = localStorage.getItem("nome") || "";
  endereco.value = localStorage.getItem("endereco") || "";
  telefone.value = localStorage.getItem("telefone") || "";
}

function salvar() {
  localStorage.setItem("nome", nome.value);
  localStorage.setItem("endereco", endereco.value);
  localStorage.setItem("telefone", telefone.value);

  alert("Salvo!");
  trocarTela("perfil");
}

function sair() {
  localStorage.clear();
  trocarTela("inicio");
}

// ==========================
// HISTÓRICO
// ==========================
function carregarHistorico() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  let html = "<h3>📦 Últimos pedidos</h3>";

  if (pedidos.length === 0) {
    html += "<p>Nenhum pedido ainda</p>";
  } else {
    pedidos.slice(0, 5).forEach(p => {
      html += `<div><strong>${p.data}</strong><br>`;

      for (let nome in p.itens) {
        const i = p.itens[nome];
        html += `${i.qtd}x ${nome}<br>`;
      }

      html += `<strong>Total: R$ ${p.total.toFixed(2)}</strong></div><hr>`;
    });
  }

  document.getElementById("historico").innerHTML = html;
}
