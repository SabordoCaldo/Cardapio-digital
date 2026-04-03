// ==========================
// TROCAR TELA
// ==========================
function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

// ==========================
// BLOQUEAR CAMPOS
// ==========================
function bloquearCampos(bloquear) {
  document.getElementById("nome").readOnly = bloquear;
  document.getElementById("endereco").readOnly = bloquear;
  document.getElementById("telefone").readOnly = bloquear;

  const botao = document.querySelector(".form button");
  botao.style.display = bloquear ? "none" : "block";
}

// ==========================
// ABRIR DADOS
// ==========================
function abrirDados() {
  trocarTela("dados");

  document.getElementById("nome").value = localStorage.getItem("nome") || "";
  document.getElementById("endereco").value = localStorage.getItem("endereco") || "";
  document.getElementById("telefone").value = localStorage.getItem("telefone") || "";

  const temDados = localStorage.getItem("nome");

  if (temDados) {
    bloquearCampos(true);
  } else {
    bloquearCampos(false);
  }
}

// ==========================
// SALVAR
// ==========================
function salvar() {
  localStorage.setItem("nome", document.getElementById("nome").value);
  localStorage.setItem("endereco", document.getElementById("endereco").value);
  localStorage.setItem("telefone", document.getElementById("telefone").value);

  alert("Dados salvos!");

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

  bloquearCampos(false);
}

// ==========================
// SAIR
// ==========================
function sair() {
  localStorage.clear();
  alert("Saiu!");

  trocarTela("inicio");
}
