function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");

  if (id === "inicio") carregarInicio();
  if (id === "carrinho") carregarCarrinho();
}

carregarInicio();
