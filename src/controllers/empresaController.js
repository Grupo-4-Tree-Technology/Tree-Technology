var empresaModel = require("../models/empresaModel");

function listar(req, res) {
    empresaModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email || !senha) {
        return res.status(400).json({ "msg:": "erro ao cadastrar" })
    } else {
        empresaModel.autenticar(email, senha)
            .then((response) => {

                if (response[0] == undefined) {
                    return res.status(204).json({ "msg": "e-mail ou Senha estão incorretos!" })
                } else {
                    return res.status(200).json({ "msg": "Usuário autenticado", response })
                }

            })
            .catch((error) => { return res.status(400).json({ "msg": "error ao autenticar: " + error }) })
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var razao_social = req.body.razaoSocialServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cnpj = req.body.cnpjServer;

    console.log(req.body)

    // Faça as validações dos valores
    if (razao_social == undefined) {
        res.status(400).send("Sua razão social está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu CNPJ está undefined!");
    } else  {

        // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
        empresaModel.cadastrar(razao_social, nome, email, senha, cnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
   listar,
    autenticar,
    cadastrar
}