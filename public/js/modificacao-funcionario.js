function buscarUsuario() {
    // Recupera o ID do usuário do sessionStorage
    let idFuncionario = sessionStorage.ID_FUNCIONARIO;


    if (!idFuncionario) {
        console.error("ID do usuário não encontrado na sessão.");
        return;
    }

    // Recupera os campos onde os dados serão exibidos
    let nome = document.querySelector("#nome");
    let email = document.querySelector("#email");
    let cpfInput = document.querySelector("#cpf");
    let dataNasc = document.querySelector("#data");
    let permissao = document.querySelector("#permissao");
    let status = document.querySelector("#status");
    let dataContratacao = document.querySelector("#data2");


    fetch(`/modificacao/buscarFuncionario/${idFuncionario}`, {
        method: "GET", 
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao recuperar os dados do usuário!");
        }
        return response.json();
    })
    .then(data => {
        let cpfMascarado = data[0].cpf.replace(/\D+/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
        // Preenchendo os campos com os dados recebidos
        nome.value = data[0].nome;
        email.value = data[0].email;
        cpfInput.value = cpfMascarado;
        dataNasc.value = data[0].dataNasc;
        permissao.value = data[0].permissao;
        status.value = data[0].status;
        dataContratacao.value = data[0].dataContratacao;
    })
    .catch(error => {
        console.error(error);
    });
}

function salvarMudancas(){
    let idFuncionario = sessionStorage.ID_FUNCIONARIO;

    if (!idFuncionario) {
        console.error("ID do usuário não encontrado na sessão.");
        return;
    }

    let nome = document.querySelector("#nome");
    let email = document.querySelector("#email");
    let cpf = document.querySelector("#cpf");
    let dataNasc = document.querySelector("#data");
    let permissao = document.querySelector("#permissao");
    let status = document.querySelector("#status");
    let dataContratacao = document.querySelector("#data2");

    // Configura o fetch para enviar os dados via PUT
    fetch(`/modificacao/atualizarFuncionario/${idFuncionario}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: nome,
            email: email,
            cpf: cpf,
            dataNasc: dataNasc,
            permissao: permissao,
            status: status,             
            dataContratacao: dataContratacao
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao atualizar os dados do usuário!");
        }
        return response.json();
    })
    .then(data => {
        console.log(data.mensagem)
    })
    .catch(error => {
        console.error(error);

    });
}
// FUNÇÃO PARA DELETAR CONTA

function deletarConta(){
    let idFuncionario = sessionStorage.ID_FUNCIONARIO;

    if (!idFuncionario) {
        console.error("ID do usuário não encontrado na sessão.");
        return;
    }

    fetch(`/modificacao/deletarFuncionario/${idFuncionario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao deletar conta!");
            }
            return response.json();
        })
        .then(data => {
            console.log(data.mensagem);
            sessionStorage.clear(); // Limpa os dados do usuário
            window.location.href = "../index.html"; // Redireciona para a página inicial

        })
        .catch(error => {
            console.error(error);
        });
}