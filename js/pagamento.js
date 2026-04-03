function finalizarPedido() {
  const pagamento = document.getElementById("pagamento").value;

  if (!pagamento) {
    alert("Escolha a forma de pagamento!");
    return;
  }

  let mensagem = "*PEDIDO*\n\nItens:\n";

  let resumo = {};
  let total = 0;

  carrinho.forEach(item => {
    if (!resumo[item.nome]) {
      resumo[item.nome] = { qtd: 0, preco: item.preco };
    }
    resumo[item.nome].qtd++;
    total += item.preco;
  });

  for (let nome in resumo) {
    const item = resumo[nome];
    mensagem += `${item.qtd}x ${nome} - R$ ${(item.qtd * item.preco).toFixed(2)}\n`;
  }

  mensagem += `\nTotal: R$ ${total.toFixed(2)}\n`;
  mensagem += `Pagamento: ${pagamento}\n`;

  const numero = "5599999999999"; // SEU NUMERO

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}
