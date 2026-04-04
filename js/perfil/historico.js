function mostrarHistorico() {
  const div = document.getElementById("historico");

  // 👉 SE já está aberto → fecha
  if (div.style.display === "block") {
    div.style.display = "none";
    div.innerHTML = "";
    return;
  }

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  let html = "<h3>Histórico de pedidos</h3>";

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
        <button class="btn btn-success" onclick="pedirNovamente(${index})">
          Pedir novamente
        </button>
      `;

      html += `</div><hr>`;
    });

    html += `
      <button class="btn btn-danger" onclick="limparHistorico()">
        Limpar histórico
      </button>
    `;
  }

  div.innerHTML = html;
  div.style.display = "block"; // 👉 mostra
}
