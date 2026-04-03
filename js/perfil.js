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
