// Alternancia de Telas login/criar conta
const btnGoCriarConta = document.getElementById("btnGoCriarConta");
const btnGoFazerLogin = document.getElementById("btnGoFazerLogin");
const groupToggler = document.getElementsByClassName("toggler");

const toggler = () => {
  Array.from(groupToggler).forEach((element) => {
    element.classList.toggle("d-none");
  });
};

btnGoCriarConta.addEventListener("click", toggler);
btnGoFazerLogin.addEventListener("click", toggler);

/*
 * Criar conta
 *
 */

document.getElementById("btnCriarConta").addEventListener("click", () => {
  const inputCreateUser = document.getElementById("inputCreateUser").value;
  const inputCreatePassword = document.getElementById(
    "inputCreatePassword"
  ).value;
  const inputRepeatPassword = document.getElementById(
    "inputRepeatPassword"
  ).value;

  if (inputCreatePassword == null || inputCreatePassword.length < 4) {
    alert("Sua senha deve possuir pelo menos 4 digitos");
  } else if (inputCreatePassword != inputRepeatPassword) {
    alert("Senhas não coincidem ");
    return;
  } else {
    localStorage.getItem(inputCreateUser) == null
      ? saveAccount({
          login: inputCreateUser,
          password: inputCreatePassword,
          notes: [],
        })
      : alert("Nome de usuário não disponivel!");
  }
});

// Salvar conta no local Storage
function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
  sessionStorage.setItem("logged", data.login);

  alert("Conta criada com sucesso");
  window.location.href = "../index.html";
}

/*
 * Fazer login
 *
 */

// Logar no sistema
document.getElementById("btnLogin").addEventListener("click", () => {
  const inputLoginUser = document.getElementById("inputLoginUser").value;
  const inputLoginPassword =
    document.getElementById("inputLoginPassword").value;

  const account = checkAccount(inputLoginUser);

  if (!account) {
    loginError();
    return;
  } else {
    if (account.password != inputLoginPassword) {
      loginError();
      return;
    }

    saveSession(inputLoginUser);

    window.location.href = "../index.html";
  }
});

function checkAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return "";
}

function loginError() {
  alert("Verifique seu usuário e senha!");

  return;
}

function saveSession(data) {
  sessionStorage.setItem("logged", data);
}
