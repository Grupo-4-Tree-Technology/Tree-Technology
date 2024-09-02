var nome = document.querySelector("#nome");
var email = document.querySelector("#email");
var senha = document.querySelector("#senha");
var confirmaSenha = document.querySelector("#confirma-senha");

var telaCadastro = document.querySelector("#cadastro");
var telaLogin = document.querySelector("#login");

var mensagem = document.querySelector("#mensagem");

function validar(){
    if(nome.value == "" || email.value == "" || senha.value == "" || confirmaSenha.value == ""){
        mensagem.innerHTML = "Preencha todos os campos!";
        mensagem.style.color = "red";
        return false;
    }else if(senha.value != confirmaSenha.value){
        mensagem.innerHTML = "As senhas estão diferentes!";
        mensagem.style.color = "red";
        return false;
    }else{
        window.location = "";
    }
}


function logar(){
    telaCadastro.style.display = "none";
    telaLogin.style.display = "flex";
    title = "Login"
}

function cadastrar(){
    telaCadastro.style.display = "flex";
    telaLogin.style.display = "none";
    title = "Cadastro"
    
}


