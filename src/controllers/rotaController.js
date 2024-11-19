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

function atualizarRota(req, res) {
    var ponto_partida = req.body.ponto_partida;
    var ponto_destino = req.body.ponto_destino;
    var idRota = req.params.idRota;

    console.log("ACESSEI O ROTA CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarRota():", ponto_partida, ponto_destino, idRota);

    console.log(req.body)

    if (ponto_partida == undefined) {
        res.status(400).send("O ponto_partida está undefined!");
    } else if (ponto_destino == undefined) {
        res.status(400).send("O ponto_destino está undefined!");
    } else if (idRota == undefined) {
        res.status(400).send("O idRota está undefined!");
    } else {
        rotaModel.atualizarRota(ponto_partida, ponto_destino, idRota)
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
    cadastrarRota,
    pegarIdUltimaRota,
    atualizarRota
}