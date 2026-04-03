// ==========================
// TROCAR TELA
// ==========================
function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

// ==========================
// SALVAR
// ==========================
function salvar() {
  localStorage.setItem("nome", document.getElementById("nome").value);
  localStorage.setItem("endereco", document.getElementById("endereco").value);
  localStorage.setItem("telefone", document.getElementById("telefone").value);

  alert("Dados salvos!");

  // volta para perfil
  trocarTela("perfil");
}

// ==========================
// EDITAR PERFIL
// ==========================
function editarPerfil() {
  trocarTela("dados");

  document.getElementById("nome").value = localStorage.getItem("nome") || "";
  document.getElementById("endereco").value = localStorage.getItem("endereco") || "";
  document.getElementById("telefone").value = localStorage.getItem("telefone") || "";
}

// ==========================
// SAIR
// ==========================
function sair() {
  localStorage.clear();
  alert("Saiu!");

  trocarTela("inicio");
}
