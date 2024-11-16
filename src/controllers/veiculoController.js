var veiculoModel = require("../models/veiculoModel");

function cadastrarVeiculo(req, res) {
    var placa = req.body.placa;
    var modelo = req.body.modelo;
    var ano = req.body.anoVeiculo;
    var fkEmpresa = req.body.fkEmpresa;

    console.log("ACESSEI O VEICULO CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarVeiculo():", placa, modelo, ano, fkEmpresa);

    console.log(req.body)

    if (placa == undefined) {
        res.status(400).send("A placa está undefined!");
    } else if (modelo == undefined) {
        res.status(400).send("O modelo está undefined!");
    } else if (ano == undefined) {
        res.status(400).send("O ano está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("O fkEmpresa está undefined!");
    } else {
        veiculoModel.cadastrarVeiculo(placa, modelo, ano, fkEmpresa)
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

function pegarIdUltimoVeiculo(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    console.log("ACESSEI O ROTA CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarIdUltimoVeiculo(): ", fkEmpresa);

    if (fkEmpresa == undefined) {
        res.status(400).send("A fkEmpresa está undefined!");
    } else {
        veiculoModel.pegarIdUltimoVeiculo(fkEmpresa)
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
    cadastrarVeiculo,
    pegarIdUltimoVeiculo
}