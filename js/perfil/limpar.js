function sair() {
  if (confirm("Deseja realmente limpar seus dados?")) {
    localStorage.clear();
    alert("Dados apagados!");
    trocarTela("inicio");
  }
}

function limparHistorico() {
  if (confirm("Deseja apagar o histórico?")) {
    localStorage.removeItem("pedidos");
    mostrarHistorico();
  }
}
