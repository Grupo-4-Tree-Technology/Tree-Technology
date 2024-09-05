// CHAMANDO CAMPOS DE CADASTRO
var nome = document.querySelector("#nome");
var email = document.querySelector("#email");
var senha = document.querySelector("#senha");
var confirmaSenha = document.querySelector("#confirma-senha");

//CHAMANDO CAMPOS DE LOGIN
var nomeLogin = document.querySelector("#nome2");
var senhaLogin = document.querySelector("#senha2");

// CHAMANDO AS DIVS RESPONSÁVEIS POR CADA TELA
var telaCadastro = document.querySelector("#cadastro");
var telaLogin = document.querySelector("#login");

//CHAMANDO DIV DE MENSAGEM DE ERRO
var mensagem = document.querySelector("#mensagem");
var mensagem = document.querySelector("#mensagemErro");

function validarCadastro() {

    //VALIDA SE CMPOS ESTÃO VAZIOS
    if (nome.value == "" || email.value == "" || senha.value == "" || confirmaSenha.value == "") {
        mensagem.innerHTML = "Preencha todos os campos!";
        mensagem.style.color = "red";
        return false;

    //VALIDA SE AS SENHA BATEM
    } else if (senha.value != confirmaSenha.value) {

        mensagem.innerHTML = "As senhas estão diferentes!";
        mensagem.style.color = "red";
        return false;

    //VALIDA SE E-MAIL
    } else if (!validarEmail(email)) {

        mensagem_erro.innerHTML = "Por favor, insira um e-mail válido.";
        return false;

    }else{
        window.location = "";
    }

        
}

//FUNÇÃO PARA VALIDAÇÃO DE E-MAIL

function validarEmail(email) {
    var arroba = -1;
    var ponto = -1;

    for (var i = 0; i < email.length; i++) {
        if (email[i] === '@') {
            arroba = i;
        } else if (email[i] === '.') {
            ponto = i;
        }
    }

    return arroba > 0 && ponto > arroba + 1 && ponto < email.length - 1;
}

//VALIDA SE OS CAMPOS ESTÃO VAZIOS NA TELA DE LOGIN
function validarLogin() {
    if (nomeLogin.value == "" || senhaLogin.value == "") {

        mensagemErro.innerHTML = "Preencha todos os campos!";
        mensagemErro.style.color = "red";
        return false;

    } else {

        window.location = "";
    }
}


function logar() {
    telaCadastro.style.display = "none";
    telaLogin.style.display = "flex";
   
}

function cadastrar() {
    telaCadastro.style.display = "flex";
    telaLogin.style.display = "none";
   

}

//FUNÇÃO PARA VOLTAR A PÁGINA ANTERIOR
function voltar() {
    window.location.href = "index.html"
}
