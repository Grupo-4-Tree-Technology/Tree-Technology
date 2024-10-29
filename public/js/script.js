// CHAMANDO CAMPOS DE CADASTRO
var razao_social = document.querySelector('#razao_social');
var nome = document.querySelector("#nome_fantasia");
var email = document.querySelector("#email");
var senha = document.querySelector("#senha");
var cnpj = document.querySelector("#cnpj");
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
        (razao_social.value == "" ||
            nome.value == "" ||
            email.value == "" ||
            senha.value == "" ||
            confirmaSenha.value == "")
    ) {
        mensagem.innerHTML =
            "<p style='color:red;'>Preencha todos os campos!</p>";
        return false;

    } else if (senha.value.length < 8 || senha.value.length > 16) {
        mensagem.innerHTML = "<p style='color:red;'>A senha deve ter entre 8 e 16 caracteres.</p>";
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
        formatarCNPJ();

        data = {
            razaoSocialServer: razao_social.value,
            nomeServer: nome.value,
            emailServer: email.value,
            cnpjServer: cnpj.value,
            senhaServer: senha.value
        }

        fetch("/empresa/cadastrar", {
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

                let contador = 5;

                texto_modal.innerHTML = "Cadastro realizado";

                div_error.innerHTML = `Cadastro realizado com sucesso! Recarregando a página em ${contador}...`;
                container.style.display = "flex";

                let contagemRegressiva = setInterval(() => {
                    contador--;
                    div_error.innerHTML = `Cadastro realizado com sucesso! Recarregando a página em ${contador}...`;

                    if (contador === 0) {
                        clearInterval(contagemRegressiva);
                        sessionStorage.SESSAO_LOGIN = true;
                        window.location = "cadastro-login.html";
                    }
                }, 1000);

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

        fetch("/empresa/autenticar", {
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

                    let contador = 4;

                    div_error.innerHTML = `Login realizado com sucesso!`;
                    container.style.display = "flex";

                    texto_modal.innerHTML = "Login realizado";

                    div_error.innerHTML = `Login realizado com sucesso!`;
                    window.location = "telas-veiculos-rotas/dashboard.html";
                    

                }).catch(erro => {
                    console.error("Erro ao processar JSON:", erro);
                    mensagemErro.innerHTML = "<p style='color:red;'>Erro ao processar resposta. Verifique se o e-mail está correto.</p>";
                })

            } else {
                resposta.text().then(texto => {
                    console.error("Erro na resposta:", texto);
                    mensagemErro.innerHTML = `<p style='color:red;'>${texto}</p>`;
                }).catch(erro => {
                    console.error("Erro ao processar texto de erro:", erro);
                    mensagemErro.innerHTML = "<p style='color:red;'>Erro desconhecido ao tentar realizar o login.</p>";
                });
            }

        }).catch(function (erro) {
            console.error("Erro no fetch:", erro);
            mensagemErro.innerHTML = "<p style='color:red;'>Erro ao tentar se comunicar com o servidor.</p>";
        })

        return false;

    }
}

function mascaraCNPJ() {
    // Está função será ativado toda vez que o usuário digitar algo (por conta do onkeyup):

    var cnpj = document.querySelector("#cnpj");

    cnpj.value = cnpj.value.replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

function formatarCNPJ() {
    cnpj.value = cnpj.value.replaceAll('.', '').replace('/', '').replace('-', '');
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
    // O Comando abaixo faz com que seja removido tudo que não seja número
    cnpj = cnpj.replace(/[^\d]+/g, '');

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
