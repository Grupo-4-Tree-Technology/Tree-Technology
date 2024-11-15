var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/obterFasesDoDia", function (req, res) {
    dashboardController.obterFasesDoDia(req, res);
})

router.get("/obterAcidentesClima", function (req, res) {
    dashboardController.obterAcidentesClima(req, res);
})

router.get("/obterDadosGrafico", function (req, res) {
    dashboardController.obterDadosGrafico(req, res);
})

module.exports = router;