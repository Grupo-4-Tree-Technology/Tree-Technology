var express = require("express");
var router = express.Router();

var rotaController = require("../controllers/rotaController");

router.post("/cadastrarRota/:fkEmpresa", function (req, res) {
    rotaController.cadastrarRota(req, res);
})

router.get("/pegarIdUltimaRota/:fkEmpresa", function (req, res) {
    rotaController.pegarIdUltimaRota(req, res);
})

router.post("/atualizarRota/:idRota", function (req, res) {
    rotaController.atualizarRota(req, res);
})

module.exports = router;