// checar se esta logado
const session = sessionStorage.getItem("logged");
function saveSession(logged) {
  sessionStorage.setItem("logged", logged);
}

// Checar se está logado
function checkLogged() {
  if (session != null) {
    sessionStorage.setItem("logged", session);
    logged = JSON.parse(localStorage.getItem(session));
    return;
  }

  window.location.href = "./pages/login.html";
}

checkLogged();

// Escrever notas na tela
function getNotas() {
  const notas = logged.notes;
  let htmlElement = ``;
  if (notas.length) {
    notas.forEach((e, index) => {
      htmlElement += `
      <tr >
        <th scope="row">${index + 1}</th>
        <td>${e.descricao}</td>
        <td>${e.detalhamento}</td>
        <td>
          <div class="container">
            <div class="row">
              <div class="col">
                <button
                  type="button"
                  id="apagar-${index}"
                  onclick="callDeleteModal(${index})"
                  class="btn btn-danger stretch-button"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <i class="bi bi-trash3-fill"></i>
                </button>
              </div>
              <div class="col">
                <button
                  type="button"
                  id="editar-${index}"
                  onclick="callEditModal(${index})"
                  class="btn btn-success stretch-button"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
              </div>
            </div>
          </div>
        </td>
      </tr>
`;
    });
  }

  document.getElementById("lista-recados").innerHTML = htmlElement;
}

getNotas();
let data = {
  notes: [],
};

// logout
document.getElementById("btn-logout").addEventListener("click", () => {
  sessionStorage.removeItem("logged");
  window.location.href = "./pages/login.html";
});

// Light / Dark mode
const switcher = document.getElementById("switcher");
const light = document.getElementById("light-icon");
const dark = document.getElementById("dark-icon");

switcher.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  document.body.classList.toggle("dark-theme");
});

// Salvar a nota no usuário logado
function saveData(data) {
  logged.notes.push(data.notes[0]);
  localStorage.setItem(logged.login, JSON.stringify(logged));

  return;
}

// Adicionar nota
document.getElementById("btnAddRecado").addEventListener("click", () => {
  const descricao = document.getElementById("inputDescricao");
  const detalhamento = document.getElementById("inputDetalhamento");

  if (descricao.value.length == 0 || detalhamento.value.length == 0) {
    alert("Preencha todos os campos");
  } else {
    console.log(descricao.value);
    data.notes.unshift({
      descricao: descricao.value,
      detalhamento: detalhamento.value,
    });

    descricao.value = "";
    detalhamento.value = "";

    saveData(data);

    getNotas();
  }
});

// delete modal
function callDeleteModal(index) {
  let btnDelete = document.getElementById("btnDelete");
  btnDelete.setAttribute("onclick", `removeNota(${index})`);
  btnDelete.setAttribute("data-bs-dismiss", "modal");
}

// Remover nota
function removeNota(index) {
  logged.notes.splice(index, 1);
  localStorage.setItem(logged.login, JSON.stringify(logged));

  getNotas();

  return;
}

// delete modal
function callEditModal(index) {
  let descricao = document.getElementById("newDescricao");
  let detalhamento = document.getElementById("newDetalhamento");
  descricao.value = logged.notes[index].descricao;
  detalhamento.value = logged.notes[index].detalhamento;
  let btnEdita = document.getElementById("btnEdita");
  btnEdita.setAttribute("onclick", `updateNota(${index})`);
  btnEdita.setAttribute("data-bs-dismiss", "modal");
}

// atualiza informação da nota
function updateNota(index) {
  let descricao = document.getElementById("newDescricao").value;
  let detalhamento = document.getElementById("newDetalhamento").value;

  logged.notes[index].descricao = descricao;
  logged.notes[index].detalhamento = detalhamento;

  localStorage.setItem(logged.login, JSON.stringify(logged));

  getNotas();
  return;
}
