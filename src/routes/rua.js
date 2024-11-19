var express = require("express");
var router = express.Router();

var ruaController = require("../controllers/ruaController");

//Recebendo os dados do html e direcionando para a função cadastrar de ruaController.js
router.post("/cadastrarRua/:fkRota", function (req, res) {
    ruaController.cadastrarRua(req, res);
})

router.post("/deletarRua/:idRua", function (req, res) {
    ruaController.deletarRua(req, res);
})

router.post("/atualizarRua/:idRuaAtualizado", function (req, res) {
    ruaController.atualizarRua(req, res);
})

module.exports = router;