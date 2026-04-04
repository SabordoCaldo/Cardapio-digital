function mostrarHistorico() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  let html = "<h3>Histórico de pedidos</h3>";

  if (pedidos.length === 0) {
    html += "<p>Nenhum pedido ainda</p>";
  } else {
    pedidos.forEach((p, index) => {
      html += `<div><strong>${p.data}</strong><br>`;

      for (let nome in p.itens) {
        const i = p.itens[nome];
        html += `${i.qtd}x ${nome}<br>`;
      }

      html += `<strong>Total: R$ ${p.total.toFixed(2)}</strong><br>`;
      html += `<button onclick="pedirNovamente(${index})">Pedir novamente</button>`;
      html += `</div><hr>`;
    });

    html += `<button onclick="limparHistorico()">Limpar histórico</button>`;
  }

  document.getElementById("historico").innerHTML = html;
}
