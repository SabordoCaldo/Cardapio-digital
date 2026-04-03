// ==========================
// TROCAR TELA
// ==========================
function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

// ==========================
// PERFIL
// ==========================
function abrirCadastro() {
  document.getElementById("form-cadastro").classList.remove("hidden");
}

function salvar() {
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;

  localStorage.setItem("nome", nome);
  localStorage.setItem("endereco", endereco);
  localStorage.setItem("telefone", telefone);

  alert("Salvo com sucesso!");
}

function editarPerfil() {
  document.getElementById("form-cadastro").classList.remove("hidden");

  document.getElementById("nome").value = localStorage.getItem("nome") || "";
  document.getElementById("endereco").value = localStorage.getItem("endereco") || "";
  document.getElementById("telefone").value = localStorage.getItem("telefone") || "";
}

function sair() {
  localStorage.clear();
  alert("Saiu!");
}
