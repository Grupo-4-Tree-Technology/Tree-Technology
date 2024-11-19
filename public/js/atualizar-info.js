// Função para exibir as informações do usuário
function buscaUsuario() {
    // Recupera o ID do usuário do sessionStorage
    let idUsuario = sessionStorage.ID_USUARIO;

    if (!idUsuario) {
        console.error("ID do usuário não encontrado na sessão.");
        return;
    }

    // Recupera os campos onde os dados serão exibidos
    let nome = document.querySelector("#nome");
    let email = document.querySelector("#email");
    let cpfInput = document.querySelector("#cpf");

    fetch(`/usuario/puxarDados/${idUsuario}`, {
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
    })
    .catch(error => {
        console.error(error);
    });
}

// FUNÇÃO PARA SALVAR ALTERAÇÕES

function salvarMudancas(){
    let idUsuario = sessionStorage.ID_USUARIO;

    if (!idUsuario) {
        console.error("ID do usuário não encontrado na sessão.");
        return;
    }

    let nome = document.querySelector("#nome").value;
    let email = document.querySelector("#email").value;

    // Configura o fetch para enviar os dados via PUT
    fetch(`/usuario/atualizarUsuario/${idUsuario}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: nome,
            email: email
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
    let idUsuario = sessionStorage.ID_USUARIO;

    if (!idUsuario) {
        console.error("ID do usuário não encontrado na sessão.");
        return;
    }

    fetch(`/usuario/deletarUsuario/${idUsuario}`, {
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

