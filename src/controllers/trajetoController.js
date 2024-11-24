var trajetoModel = require("../models/trajetoModel");

function cadastrarTrajeto(req, res) {
    var fkRota = req.params.fkRota;
    var fkVeiculo = req.params.fkVeiculo;

    console.log("ACESSEI O TRAJETO CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarTrajeto():", fkRota, fkVeiculo);

    console.log(req.body)

    if (fkRota == undefined) {
        res.status(400).send("A fkRota está undefined!");
    } else if (fkVeiculo == undefined) {
        res.status(400).send("A fkVeiculo está undefined!");
    } else {
        trajetoModel.cadastrarTrajeto(fkRota, fkVeiculo)
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

function carregarTrajetos(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    console.log("ACESSEI O TRAJETO CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function carregarTrajetos():", fkEmpresa);

    if (fkEmpresa == undefined) {
        res.status(400).send("A fkEmpresa está undefined!");
    } else {
        trajetoModel.carregarTrajetos(fkEmpresa)
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

function buscarInfoTrajeto(req, res) {
    var idTrajeto = req.params.idTrajeto;
    var fkEmpresa = req.params.fkEmpresa;

    console.log("ACESSEI O TRAJETO CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarInfoTrajeto():", idTrajeto, fkEmpresa);

    if (idTrajeto == undefined) {
        res.status(400).send("O idTrajeto está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A fkEmpresa está undefined!");
    } else {
        trajetoModel.buscarInfoTrajeto(idTrajeto, fkEmpresa)
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

function deletarTrajeto(req, res) {
    var idTrajeto = req.params.idTrajeto;

    console.log("ACESSEI O TRAJETO CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarTrajeto():", idTrajeto);

    console.log(req.body)

    if (idTrajeto == undefined) {
        res.status(400).send("A idTrajeto está undefined!");
    } else {
        trajetoModel.deletarTrajeto(idTrajeto)
            .then(function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a remoção do trajeto! Erro: ",
                        erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function selecionarTrajetoEspecifico(req, res) {
    var idTrajeto = req.params.idTrajeto;
    var fkEmpresa = req.params.fkEmpresa;

    console.log("ACESSEI O TRAJETO CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function selecionarTrajetoEspecifico():", idTrajeto, fkEmpresa);

    if (idTrajeto == undefined) {
        res.status(400).send("O idTrajeto está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A fkEmpresa está undefined!");
    } else {
        trajetoModel.selecionarTrajetoEspecifico(idTrajeto, fkEmpresa)
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
    cadastrarTrajeto,
    carregarTrajetos,
    buscarInfoTrajeto,
    deletarTrajeto,
    selecionarTrajetoEspecifico
}