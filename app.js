// ==========================
// TROCAR TELA
// ==========================
function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

// ==========================
// VER DADOS (SEM EDITAR)
// ==========================
function verDados() {
  document.getElementById("ver-nome").innerText = localStorage.getItem("nome") || "Não informado";
  document.getElementById("ver-endereco").innerText = localStorage.getItem("endereco") || "Não informado";
  document.getElementById("ver-telefone").innerText = localStorage.getItem("telefone") || "Não informado";

  trocarTela("dados");
}

// ==========================
// EDITAR
// ==========================
function editarPerfil() {
  document.getElementById("nome").value = localStorage.getItem("nome") || "";
  document.getElementById("endereco").value = localStorage.getItem("endereco") || "";
  document.getElementById("telefone").value = localStorage.getItem("telefone") || "";

  trocarTela("editar");
}

// ==========================
// SALVAR
// ==========================
function salvar() {
  localStorage.setItem("nome", document.getElementById("nome").value);
  localStorage.setItem("endereco", document.getElementById("endereco").value);
  localStorage.setItem("telefone", document.getElementById("telefone").value);

  alert("Dados salvos!");

  trocarTela("dados");
}

// ==========================
// SAIR
// ==========================
function sair() {
  localStorage.clear();
  alert("Dados apagados!");

  trocarTela("inicio");
}
