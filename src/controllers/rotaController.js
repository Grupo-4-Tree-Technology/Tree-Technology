var rotaModel = require("../models/rotaModel");

function cadastrarRota(req, res) {
    var ruaInicial = req.body.ruaInicial;
    var ruaFinal = req.body.ruaFinal;
    var fkEmpresa = req.params.fkEmpresa;

    console.log("ACESSEI O ROTA CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarRota():", ruaInicial, ruaFinal, fkEmpresa);

    console.log(req.body)

    if (ruaInicial == undefined) {
        res.status(400).send("A ruaInicial está undefined!");
    } else if (ruaFinal == undefined) {
        res.status(400).send("A ruaFinal está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A fkEmpresa está undefined!");
    } else {
        rotaModel.cadastrarRota(ruaInicial, ruaFinal, fkEmpresa)
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

function pegarIdUltimaRota(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    console.log("ACESSEI O ROTA CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarIdUltimaRota(): ", fkEmpresa);

    if (fkEmpresa == undefined) {
        res.status(400).send("A fkEmpresa está undefined!");
    } else {
        rotaModel.pegarIdUltimaRota(fkEmpresa)
            .then(function (resultado) {
                res.json(resultado);
            }
        ).catch( function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage)
            res.status(500).json(erro.sqlMessage);
        })
    }
}

module.exports = {
    cadastrarRota,
    pegarIdUltimaRota
}