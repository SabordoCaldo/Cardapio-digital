function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));

  const tela = document.getElementById(id);
  if (!tela) return;

  tela.classList.add("ativa");

  if (id === "inicio") {
    carregarCombos();
    carregarCaldos();
    carregarBebidas();
  }

  if (id === "carrinho") carregarCarrinho();
}

carregarCombos();
carregarCaldos();
carregarBebidas();
