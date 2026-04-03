function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));

  const tela = document.getElementById(id);
  if (!tela) return;

  tela.classList.add("ativa");

  if (id === "inicio") carregarInicio();
  if (id === "carrinho") carregarCarrinho();

  if (id === "perfil") {
    if (typeof carregarHistorico === "function") {
      carregarHistorico();
    }

    if (typeof mostrarDadosCliente === "function") {
      mostrarDadosCliente();
    }
  }
}

carregarInicio();
