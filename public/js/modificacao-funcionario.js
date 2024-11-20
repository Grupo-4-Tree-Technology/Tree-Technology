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

        let dtNascFormatada = formatarData(data[0].data_nascimento);
        let dtContratFormatada = formatarData(data[0].data_contratacao);

        // Preenchendo os campos com os dados recebidos
        nome.value = data[0].nome;
        email.value = data[0].email;
        cpfInput.value = cpfMascarado;
        dataNasc.value = dtNascFormatada;
        permissao.value = data[0].permissao;
        status.value = data[0].status;
        dataContratacao.value = dtContratFormatada;
    })
    .catch(error => {
        console.error(error);
    });
}

function formatarData(data) {
    data = data.substring(0, 10).replaceAll("-", "/");
    const [ano, mes, dia] = data.split("/");

    return `${dia}/${mes}/${ano}`;
}

function formatarData2(data) {
    data = data.substring(0, 10).replaceAll("/", "-");
    const [dia, mes, ano] = data.split("-");

    return `${ano}-${mes}-${dia}`;
}

function salvarMudancas(){

    let blur = document.getElementById("blur");

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

    cpf = cpf.value.replaceAll(".", "");
    cpf = cpf.replaceAll("-", "");

    // Configura o fetch para enviar os dados via PUT
    fetch(`/modificacao/atualizarFuncionario/${idFuncionario}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: nome.value,
            email: email.value,
            cpf: cpf,
            dataNasc: formatarData2(dataNasc.value),
            permissao: permissao.value,
            status: status.value,             
            dataContratacao: formatarData2(dataContratacao.value)
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
        div_error.innerHTML = `Mudança realizada com sucesso!`;
        container.style.display = "flex";
        blur.style.display="block";
    })
    .catch(error => {
        console.error(error);
        div_error.innerHTML = `Erro na alteração!`;
        container.style.display = "flex";
        blur.style.display="block";

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
            window.location.href = "../telas-trajetos-func/lista-funcionario.html"; // Redireciona para a página lista-funcionario.html

        })
        .catch(error => {
            console.error(error);
        });
}