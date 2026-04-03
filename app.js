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
  const form = document.getElementById("form-cadastro");
  form.classList.remove("hidden");

  // carregar dados salvos
  document.getElementById("nome").value = localStorage.getItem("nome") || "";
  document.getElementById("endereco").value = localStorage.getItem("endereco") || "";
  document.getElementById("telefone").value = localStorage.getItem("telefone") || "";
}

function salvar() {
  localStorage.setItem("nome", document.getElementById("nome").value);
  localStorage.setItem("endereco", document.getElementById("endereco").value);
  localStorage.setItem("telefone", document.getElementById("telefone").value);

  alert("Dados salvos!");
}

// ==========================
// SAIR (AGORA FUNCIONA)
// ==========================
function sair() {
  localStorage.removeItem("nome");
  localStorage.removeItem("endereco");
  localStorage.removeItem("telefone");

  document.getElementById("form-cadastro").classList.add("hidden");

  alert("Dados removidos!");
}
