var express = require("express");
var router = express.Router();

var veiculoController = require("../controllers/veiculoController");

//Recebendo os dados do html e direcionando para a função cadastrar de veiculoController.js
router.post("/cadastrarVeiculo", function (req, res) {
    veiculoController.cadastrarVeiculo(req, res);
})

router.get("/pegarIdUltimoVeiculo/:fkEmpresa", function (req, res) {
    veiculoController.pegarIdUltimoVeiculo(req, res);
})

module.exports = router;