const modificacaoModel = require("../models/modificacaoModel");

function buscarFuncionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo atualizar-info.html
    var idFuncionario = req.params.idFuncionario;

    console.log(req.body);

    // Validações dos valores

    if (!idFuncionario) {
        res.status(400).send("ID do usuário está undefined!");
        return;
    } else {
        // Passando os valores como parâmetro para o usuárioModel.js
            modificacaoModel.puxarDados(idFuncionario)
            .then(resultado => res.json(resultado))
            .catch(erro => {
                console.error("Houve um erro ao buscar os dados do usuário:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}
// Método para atualizar os dados do usuário
function atualizarFuncionario(req, res) {

    let nome = req.body.nome;
    let email = req.body.email;
    let idFuncionario = req.params.idFuncionario;
    let cpf = req.body.cpf;
    let dataNasc = req.body.dataNasc;
    let permissao = req.body.permissao;
    let status = req.body.status;
    let dataContratacao = req.body.dataContratacao;

    // Validações básicas
    if (!idFuncionario || !nome || !email || !cpf || !dataNasc || !permissao || !status || !dataContratacao) {
        return res.status(400).json({ mensagem: "Dados insuficientes para atualização!" });
    }

    // Bloco assíncrono para tratar a lógica
    (async function () {
        try {
            // Chama o model para atualizar
            const resultado = await modificacaoModel.atualizarFuncionario(idFuncionario, nome, email, cpf, dataNasc, permissao, status, dataContratacao);

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
function deletarFuncionario(req, res){
    let idFuncionario = req.params.idFuncionario;

    console.log(req.body);

    if (!idFuncionario) {
        res.status(400).send("ID do usuário está undefined!");
        return;
    } else {
        // Passando os valores como parâmetro para o usuárioModel.js
            modificacaoModel.deletarUsuario(idFuncionario)
            .then(resultado => res.json(resultado))
            .catch(erro => {
                console.error("Houve um erro ao buscar os dados do usuário:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarFuncionario,
    atualizarFuncionario,
    deletarFuncionario

}