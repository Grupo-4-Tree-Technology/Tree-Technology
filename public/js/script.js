// CHAMANDO CAMPOS DE CADASTRO
// var razao_social = document.querySelector('#razao_social');
// var nome = document.querySelector("#nome_fantasia");
// var email = document.querySelector("#email");
// var senha = document.querySelector("#senha");
// var cnpj = document.querySelector("#cnpj");
// var confirmaSenha = document.querySelector("#confirma-senha");

//CHAMANDO CAMPOS CADASTRO FUNCIONARIO
var nome = document.querySelector("#nomeFunc");
var email = document.querySelector("#emailFunc");
var senha = document.querySelector("#senhaFunc");
var dataNasc = document.querySelector("#dataNascFunc");
var cpfFunc = document.querySelector("#cpfFunc");
var permissao = document.querySelector("#permissaoFunc");
var statusFunc = document.querySelector("#statusFunc");
var dataContratacao = document.querySelector("#dataContratacaoFunc");

//CHAMANDO CAMPOS DE LOGIN
var emailLogin = document.querySelector("#email2");
var senhaLogin = document.querySelector("#senha2");

// CHAMANDO AS DIVS RESPONSÁVEIS POR CADA TELA
var telaCadastro = document.querySelector("#cadastro");
var telaLogin = document.querySelector("#login");

//CHAMANDO DIV DE MENSAGEM DE ERRO
var mensagem = document.querySelector("#mensagem");
var mensagemErro = document.querySelector("#mensagemErro");

function validarCadastroFunc() {
    let fkEmpresa = sessionStorage.getItem("ID_EMPRESA");

    cpfFunc.value = limparCPF(cpfFunc.value);

    if (

        nome.value == "" ||
        email.value == "" ||
        senha.value == "" ||
        dataNasc.value == "" ||
        cpfFunc.value == "" ||
        permissao.value == "" ||
        statusFunc.value == "" ||
        dataContratacao.value == ""

    ) {
        mensagem.innerHTML = "<p style='color:red;'>Preencha todos os campos!</p>";
        return false;
    } else if (!validarEmail(email.value)) {
        mensagem.innerHTML = "<p style='color:red;'>Por favor, insira um e-mail válido.</p>";
        return false;

    } else if (!validarCPF(cpfFunc.value)) {

        mensagem.innerHTML = "<p style='color:red;'>CPF inválido.</p>";
        return false;

    } else {
        data = {
            nomeServer: nome.value,
            emailServer: email.value,
            senhaServer: senha.value,
            dataNascServer: dataNasc.value,
            cpfFuncServer: cpfFunc.value,
            permissaoServer: permissao.value,
            statusFuncServer: statusFunc.value,
            dataContratacaoServer: dataContratacao.value
        }

        fetch(`/funcionario/cadastrar/${fkEmpresa}`, {
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
                exibirMensagem("<p style='color:green; font-size: large;'>Cadastro realizado!</p>", 5000);

                // let contador = 5;

                mensagem.innerHTML = "Cadastro realizado";

                setTimeout(() => {
                    window.location = "lista-funcionario.html";
                }, 2000);

                // div_error.innerHTML = `Cadastro realizado com sucesso! Recarregando a página em ${contador}...`;
                // container.style.display = "flex";

                // let contagemRegressiva = setInterval(() => {
                //     contador--;
                //     div_error.innerHTML = `Cadastro realizado com sucesso! Recarregando a página em ${contador}...`;

                //     if (contador === 0) {
                //         clearInterval(contagemRegressiva);
                //         sessionStorage.SESSAO_LOGIN = true;
                //         window.location = "cadastro-login.html";
                //     }
                // }, 1000);

            })
            .catch(error => {
                console.error(error);
                exibirMensagem(`<p style='color:red;'>${error.message}</p>`, 5000);
            });
    }

}

function exibirMensagem(mensagem, tempo) {
    const mensagemElement = document.getElementById('mensagem');
    mensagemElement.innerHTML = mensagem;
    setTimeout(() => {
        mensagemElement.innerHTML = '';
    }, tempo);
}

function buscarFuncionarios() {
    let fkEmpresa = sessionStorage.getItem("ID_EMPRESA");

    fetch(`/funcionario/listar/${fkEmpresa}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            exibirFuncionariosNaTela(data);  // Chama a função para exibir os funcionários na tela
        })
        .catch(error => {
            console.error('Erro ao buscar funcionários:', error);
        });
}

function exibirFuncionariosNaTela(funcionarios) {
    const listaFuncionarios = document.getElementById('scroll');

    funcionarios.forEach(funcionario => {

        const dataContratacaoFormatada = formatarData(funcionario.data_contratacao);

        const funcionarioDiv = document.createElement('div');
        funcionarioDiv.classList.add('list-routes');

        funcionarioDiv.innerHTML = `
        <div class="text">
            <div class="title">
                <h4 id="nome">${funcionario.nome}</h4>
                <h4>Data de contratação</h4>
            </div>
            <div class="dots">
                <img src="../assets/dots.png" alt="" class="open-dots" onclick="abrirDots(${funcionario.id})">
                <div class="options" id="options-${funcionario.id}" style="display:none; width: 387px;">
                    <img src="../assets/close.jpeg" alt="" onclick="fecharDots(${funcionario.id})">
                    <button  class="button-delete" onclick="deletarFuncionario(${funcionario.id})" style="background-color:#f75050;">Deletar funcionário</button>
                    <button onclick="editarFuncionario(${funcionario.id})">Editar funcionário</button>
                </div>
            </div>
        </div>
        <div class="rota">
            <p>Permissão: <span id="permissao">${funcionario.permissao}</span> | Status: <span id="status">${funcionario.status}</span></p>
            <p id="data_contratacao">${dataContratacaoFormatada}</p>
        </div>
    `;

        listaFuncionarios.appendChild(funcionarioDiv);
    });
}

function editarFuncionario(id) {
    sessionStorage.ID_FUNCIONARIO = id;

    window.location = '../telas-veiculos-rotas/modificacao-funcionario.html'; 
}

function formatarData(dataBanco) {
    let data = new Date(dataBanco);


    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();

    return `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;
}


function abrirDots(id) {
    const options = document.getElementById(`options-${id}`);
    options.style.display = 'block';
}

function fecharDots(id){
    const options = document.getElementById(`options-${id}`);
    options.style.display = 'none';
}

function deletarFuncionario(id) {

    fetch(`/funcionario/deletar/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {

                let mensagemElement = document.getElementById('mensagem');
                mensagemElement = "Funcionário deletado!";
                exibirMensagem(`<p style='color:green;'>${mensagemElement}</p>`, 5000);

                location.reload();

            } else {

                let mensagemElement = document.getElementById('mensagem');
                mensagemElement = "Não foi possível deletar";
                exibirMensagem(`<p style='color:red;'>${mensagemElement}</p>`, 5000);
            }
        })
        .catch(error => {
            console.error(error);
        });

    cancelarMensagem();
}

function cancelarMensagem(){

}

// function validarCadastro() {

//     if (
//         (razao_social.value == "" ||
//             nome.value == "" ||
//             email.value == "" ||
//             senha.value == "" ||
//             confirmaSenha.value == "")
//     ) {
//         mensagem.innerHTML =
//             "<p style='color:red;'>Preencha todos os campos!</p>";
//         return false;

//     } else if (senha.value.length < 8 || senha.value.length > 16) {
//         mensagem.innerHTML = "<p style='color:red;'>A senha deve ter entre 8 e 16 caracteres.</p>";
//         return false;

//     } else if (senha.value != confirmaSenha.value) {
//         mensagem.innerHTML = "<p style='color:red;'>As senhas não correspondem.</p>";

//         return false;

//     } else if (!validarEmail(email.value)) {
//         mensagem.innerHTML = "<p style='color:red;'>Por favor, insira um e-mail válido.</p>";
//         return false;

//     } else if (!validarCNPJ(cnpj.value)) {

//         mensagem.innerHTML = "<p style='color:red;'>CNPJ inválido.</p>";

//     } else {
//         formatarCNPJ();

//         data = {
//             razaoSocialServer: razao_social.value,
//             nomeServer: nome.value,
//             emailServer: email.value,
//             cnpjServer: cnpj.value,
//             senhaServer: senha.value
//         }

//         fetch("/empresa/cadastrar", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data)
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error("Erro no cadastro!");
//                 }
//                 return response.json();
//             })
//             .then(() => {
//                 exibirMensagem("<p style='color:green;'>Cadastro realizado!</p>", 5000);

//                 let contador = 5;

//                 texto_modal.innerHTML = "Cadastro realizado";

//                 div_error.innerHTML = `Cadastro realizado com sucesso! Recarregando a página em ${contador}...`;
//                 container.style.display = "flex";

//                 let contagemRegressiva = setInterval(() => {
//                     contador--;
//                     div_error.innerHTML = `Cadastro realizado com sucesso! Recarregando a página em ${contador}...`;

//                     if (contador === 0) {
//                         clearInterval(contagemRegressiva);
//                         sessionStorage.SESSAO_LOGIN = true;
//                         window.location = "cadastro-login.html";
//                     }
//                 }, 1000);

//             })
//             .catch(error => {
//                 console.error(error);
//                 exibirMensagem(`<p style='color:red;'>${error.message}</p>`, 5000);
//             });

//         function exibirMensagem(mensagem, tempo) {
//             const mensagemElement = document.getElementById('mensagem');
//             mensagemElement.innerHTML = mensagem;
//             setTimeout(() => {
//                 mensagemElement.innerHTML = '';
//             }, tempo);
//         }
//     }
// }

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

                    sessionStorage.ID_USUARIO = json.response[0].id;
                    sessionStorage.EMAIL_USUARIO = json.response[0].email;
                    sessionStorage.ID_EMPRESA = json.response[0].idEmpresa;
                    sessionStorage.PERMISSAO = json.response[0].permissao;
                    sessionStorage.STATUS = json.response[0].status;

                    div_error.innerHTML = `Login realizado com sucesso!`;
                    container.style.display = "flex";

                    texto_modal.innerHTML = "Login realizado";
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

// function mascaraData() {
//     var data = document.querySelector("#data");

//     data.value = data.value.replace(/\D+/g, '') // Remove caracteres não numéricos       
//         .replace(/(\d{2})(\d)/, '$1/$2')       // Adiciona a primeira barra após o dia      
//         .replace(/(\d{2})(\d)/, '$1/$2')       // Adiciona a segunda barra após o mês       
//         .replace(/(\d{4})\d+?$/, '$1');        // Limita o ano a quatro dígitos}

// }

function mascaraCPF() {
    var cpf = document.querySelector("#cpfFunc");
    cpf.value = cpf.value.replace(/\D+/g, '') // Remove caracteres não numéricos
        .replace(/(\d{3})(\d)/, '$1.$2')     // Adiciona o primeiro ponto
        .replace(/(\d{3})(\d)/, '$1.$2')     // Adiciona o segundo ponto
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço antes dos dois últimos dígitos
}

function validarCPF(cpf) {

    cpf = cpf.replace(/[.\-]/g, "");

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let peso = 10;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * peso--;
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf[9])) {
        return false;
    }

    soma = 0;
    peso = 11;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * peso--;
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf[10])) {
        return false;
    }


    return true;
}

function limparCPF(cpf) {
    // Remove pontos (.) e traços (-) do CPF
    return cpf.replace(/[.\-]/g, "");
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
