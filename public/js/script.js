// CHAMANDO CAMPOS DE CADASTRO
var nome = document.querySelector("#nome");
var email = document.querySelector("#email");
var senha = document.querySelector("#senha");
const cnpj = document.querySelector("#cnpj");
var confirmaSenha = document.querySelector("#confirma-senha");

//CHAMANDO CAMPOS DE LOGIN
var emailLogin = document.querySelector("#email2");
var senhaLogin = document.querySelector("#senha2");

// CHAMANDO AS DIVS RESPONSÁVEIS POR CADA TELA
var telaCadastro = document.querySelector("#cadastro");
var telaLogin = document.querySelector("#login");

//CHAMANDO DIV DE MENSAGEM DE ERRO
var mensagem = document.querySelector("#mensagem");
var mensagemErro = document.querySelector("#mensagemErro");

function validarCadastro() {

    if (
        (nome.value == "" ||
            email.value == "" ||
            senha.value == "" ||
            confirmaSenha.value == "")
    ) {
        mensagem.innerHTML =
            "<p style='color:red;'>Preencha todos os campos!</p>";
        return false;

    } else if (senha.value != confirmaSenha.value) {
        mensagem.innerHTML = "<p style='color:red;'>As senhas não correspondem.</p>";

        return false;

    } else if (!validarEmail(email.value)) {
        mensagem.innerHTML = "<p style='color:red;'>Por favor, insira um e-mail válido.</p>";
        return false;

    } else if (!validarCNPJ(cnpj.value)) {

        mensagem.innerHTML = "<p style='color:red;'>CNPJ inválido.</p>";

    } else {


        data = {
            nomeServer: nome.value,
            emailServer: email.value,
            cnpjServer: cnpj.value,
            senhaServer: senha.value
        }

        fetch("http://localhost:3333/empresa/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro no cadastro!");
                }
                return response.json();
            })
            .then(() => {
                exibirMensagem("<p style='color:green;'>Cadastro realizado!</p>", 5000);
            })
            .catch(error => {
                console.error(error);
                exibirMensagem(`<p style='color:red;'>${error.message}</p>`, 5000);
            });

        function exibirMensagem(mensagem, tempo) {
            const mensagemElement = document.getElementById('mensagem');
            mensagemElement.innerHTML = mensagem;
            setTimeout(() => {
                mensagemElement.innerHTML = '';
            }, tempo);
        }
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
    if (emailLogin.value == "" || senhaLogin.value == "") {

        mensagemErro.innerHTML = "Preencha todos os campos!";
        mensagemErro.style.color = "red";
        return false;

    } else {

        fetch("http://localhost:3333/empresa/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailLogin.value,
                senhaServer: senhaLogin.value
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;
                    window.location = "";
                });

            } else {

                mensagemErro.innerHTML = "<p style='color:red;'>Houve um erro ao tentar realizar o login!</p>";

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;

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


function validarCNPJ(cnpj) {
    // Remove tudo que não seja número
    cnpj = cnpj.replace(/[^\d]+/g, '');

    // Verifica se tem 14 dígitos
    if (cnpj.length !== 14) {
        return false;
    }

    // Verifica se os números são todos iguais (ex: 11111111111111)
    if (/^(\d)\1+$/.test(cnpj)) {
        return false;
    }

    // Apenas um exemplo para simplificar, sem cálculos avançados
    // Aqui retornamos "true" apenas se passar as verificações básicas
    return true;
}



//FUNÇÃO PARA VOLTAR A PÁGINA ANTERIOR
function voltar() {
    window.location.href = "index.html"
}
