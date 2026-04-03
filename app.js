function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

/* ABRIR DADOS */
function abrirDados() {
  const dados = JSON.parse(localStorage.getItem("cliente"));

  const div = document.getElementById("dados-exibir");

  if (dados) {
    div.innerHTML = `
      <p><b>Nome:</b> ${dados.nome}</p>
      <p><b>Endereço:</b> ${dados.endereco}</p>
      <p><b>Telefone:</b> ${dados.telefone}</p>
    `;
  } else {
    div.innerHTML = "Nenhum dado cadastrado.";
  }

  trocarTela("tela-dados");
}

/* EDITAR */
function editarPerfil() {
  const dados = JSON.parse(localStorage.getItem("cliente"));

  if (dados) {
    document.getElementById("nome").value = dados.nome;
    document.getElementById("endereco").value = dados.endereco;
    document.getElementById("telefone").value = dados.telefone;
  }

  trocarTela("tela-cadastro");
}

/* SALVAR */
function salvarDados() {
  const dados = {
    nome: document.getElementById("nome").value,
    endereco: document.getElementById("endereco").value,
    telefone: document.getElementById("telefone").value
  };

  localStorage.setItem("cliente", JSON.stringify(dados));

  alert("Dados salvos!");

  trocarTela("tela-perfil");
}

/* SAIR */
function sair() {
  localStorage.removeItem("cliente");
  alert("Você saiu!");
  trocarTela("tela-inicio");
}
