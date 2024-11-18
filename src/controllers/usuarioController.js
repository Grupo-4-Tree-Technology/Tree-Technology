const usuarioModel = require("../models/usuarioModel");

function puxarDados(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo atualizar-info.html
    var idUsuario = req.params.idUsuario;

    console.log(req.body);

    // Validações dos valores

    if (!idUsuario) {
        res.status(400).send("ID do usuário está undefined!");
        return;
    } else {
        // Passando os valores como parâmetro para o usuárioModel.js
            usuarioModel.puxarDados(idUsuario)
            .then(resultado => res.json(resultado))
            .catch(erro => {
                console.error("Houve um erro ao buscar os dados do usuário:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

// Método para atualizar os dados do usuário
function atualizarUsuario(req, res) {

    let nome = req.body.nome;
    let email = req.body.email;
    let idUsuario = req.params.idUsuario;

    // Validações básicas
    if (!idUsuario || !nome || !email) {
        return res.status(400).json({ mensagem: "Dados insuficientes para atualização!" });
    }

    // Bloco assíncrono para tratar a lógica
    (async function () {
        try {
            // Chama o model para atualizar
            const resultado = await usuarioModel.atualizarUsuario(idUsuario, nome, email);

            if (resultado.affectedRows > 0) {
                res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
            } else {
                res.status(404).json({ mensagem: "Usuário não encontrado." });
            }
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            res.status(500).json({ mensagem: "Erro interno no servidor." });
        }
    })();
}
function deletarUsuario(req, res){
    let idUsuario = req.params.idUsuario;

    console.log(req.body);

    if (!idUsuario) {
        res.status(400).send("ID do usuário está undefined!");
        return;
    } else {
        // Passando os valores como parâmetro para o usuárioModel.js
            usuarioModel.deletarUsuario(idUsuario)
            .then(resultado => res.json(resultado))
            .catch(erro => {
                console.error("Houve um erro ao buscar os dados do usuário:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    puxarDados,
    atualizarUsuario,
    deletarUsuario
};
