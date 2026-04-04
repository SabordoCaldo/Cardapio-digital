function carregarCombos() {
  const div = document.getElementById("combos");

  let html = "<h2>Combos</h2>";

  COMBOS.forEach((p, i) => {
    if (!p.disponivel) return;

    html += `
      <div class="card">

        <img src="${p.imagem}" alt="">

        <div class="card-info">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <strong>R$ ${p.preco.toFixed(2)}</strong>

          <div class="qtd-controle">
            <button onclick="diminuir(${i})">-</button>
            <span id="qtd-${i}">0</span>
            <button onclick="aumentar(${i})">+</button>
          </div>

          <button class="btn btn-success" onclick="adicionar(${i})">
            Adicionar ao carrinho
          </button>
        </div>

      </div>
    `;
  });

  div.innerHTML = html;
}
