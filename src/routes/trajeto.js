var express = require("express");
var router = express.Router();

var trajetoController = require("../controllers/trajetoController");

router.post("/cadastrarTrajeto/:fkRota/:fkVeiculo", function (req, res) {
    trajetoController.cadastrarTrajeto(req, res);
})

module.exports = router;
