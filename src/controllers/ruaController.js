var ruaModel = require("../models/ruaModel");

function cadastrarRua(req, res) {
    var rua = req.body.rua;
    var ordem = req.body.ordem;
    var fkRota = req.params.fkRota;

    console.log("ACESSEI O RUA CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarRua():", rua, ordem, fkRota);

    console.log(req.body)

    if (rua == undefined) {
        res.status(400).send("A rua está undefined!");
    } else if (ordem == undefined) {
        res.status(400).send("O ordem está undefined!");
    } else if (fkRota == undefined) {
        res.status(400).send("A fkRota está undefined!");
    } else {
        ruaModel.cadastrarRua(rua, ordem, fkRota)
            .then(function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function deletarRua(req, res) {
    var idRua = req.params.idRua;

    console.log("ACESSEI O RUA CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarRua():", idRua);

    if (idRua == undefined) {
        res.status(400).send("O idRua está undefined!");
    } else {
        ruaModel.deletarRua(idRua)
            .then(function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a remoção da Rua! Erro: ",
                        erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function atualizarRua(req, res) {
    var rua = req.body.rua;
    var idRuaAtualizado = req.params.idRuaAtualizado;

    console.log("ACESSEI O RUA CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarRua():", rua, idRuaAtualizado);

    console.log(req.body)

    if (rua == undefined) {
        res.status(400).send("A rua está undefined!");
    } else if (idRuaAtualizado == undefined) {
        res.status(400).send("O idRuaAtualizado está undefined!");
    } else {
        ruaModel.atualizarRua(rua, idRuaAtualizado)
            .then(function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

module.exports = {
    cadastrarRua,
    deletarRua,
    atualizarRua
}