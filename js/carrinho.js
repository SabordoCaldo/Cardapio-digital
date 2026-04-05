function carregarCarrinho() {
  const tela = document.getElementById("carrinho");

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  let html = `<h2>Carrinho</h2>`;

  if (carrinho.length === 0) {
    html += `<p>Carrinho vazio</p>`;
    tela.innerHTML = html;
    return;
  }

  let total = 0;

  carrinho.forEach(item => {
    total += item.preco * item.quantidade;

    html += `
      <p>
        ${item.quantidade}x ${item.nome}<br>
        R$ ${(item.preco * item.quantidade).toFixed(2)}
      </p>
    `;

    if (item.adicionais) {
      html += `<small>${item.adicionais.join(", ")}</small><br>`;
    }

    if (item.observacao) {
      html += `<small>${item.observacao}</small><br>`;
    }

    html += `<hr>`;
  });

  html += `<h3>Total: R$ ${total.toFixed(2)}</h3>`;

  tela.innerHTML = html;
}
