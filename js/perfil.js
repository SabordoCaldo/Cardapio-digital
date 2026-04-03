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
  if (confirm("Deseja realmente limpar seus dados?")) {
    localStorage.clear();
    alert("Dados apagados!");
    trocarTela("inicio");
  }
}

// ==========================
// MOSTRAR DADOS NO PERFIL
// ==========================
function mostrarDadosCliente() {
  const nome = localStorage.getItem("nome") || "Não informado";
  const endereco = localStorage.getItem("endereco") || "Não informado";
  const telefone = localStorage.getItem("telefone") || "Não informado";

  const div = document.getElementById("dados-cliente");
  if (!div) return;

  div.innerHTML = `
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Endereço:</strong> ${endereco}</p>
    <p><strong>Telefone:</strong> ${telefone}</p>
  `;
}

// ==========================
// HISTÓRICO
// ==========================
function carregarHistorico() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  let html = "<h3>📦 Últimos pedidos</h3>";

  if (pedidos.length === 0) {
    html += "<p>Nenhum pedido ainda</p>";
  } else {
    pedidos.slice(0, 5).forEach(p => {
      html += `<div><strong>${p.data}</strong><br>`;

      for (let nome in p.itens) {
        const i = p.itens[nome];
        html += `${i.qtd}x ${nome}<br>`;
      }

      html += `<strong>Total: R$ ${p.total.toFixed(2)}</strong></div><hr>`;
    });
  }

  document.getElementById("historico").innerHTML = html;
}
