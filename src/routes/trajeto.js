var express = require("express");
var router = express.Router();

var trajetoController = require("../controllers/trajetoController");

router.post("/cadastrarTrajeto/:fkRota/:fkVeiculo", function (req, res) {
    trajetoController.cadastrarTrajeto(req, res);
})

router.get("/carregarTrajetos/:fkEmpresa", function (req, res) {
    trajetoController.carregarTrajetos(req, res);
})

router.get("/buscarInfoTrajeto/:idTrajeto/:fkEmpresa", function (req, res) {
    trajetoController.buscarInfoTrajeto(req, res);
})

router.post("/deletarTrajeto/:idTrajeto", function (req, res) {
    trajetoController.deletarTrajeto(req, res);
})

module.exports = router;
