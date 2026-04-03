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
  localStorage.clear();
  trocarTela("inicio");
}

function carregarHistorico() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  let html = "<h3>📦 Últimos pedidos</h3>";

  if (pedidos.length === 0) {
    html += "<p>Nenhum pedido ainda</p>";
  } else {
    pedidos.slice(0, 5).forEach(p => {
      html += `<div style="margin-bottom:10px;">`;
      html += `<strong>${p.data}</strong><br>`;

      for (let nome in p.itens) {
        const item = p.itens[nome];
        html += `${item.qtd}x ${nome}<br>`;
      }

      html += `<strong>Total: R$ ${p.total.toFixed(2)}</strong>`;
      html += `</div><hr>`;
    });
  }

  document.getElementById("historico").innerHTML = html;
}
