var database = require("../database/config");

function cadastrarTrajeto(fkRota, fkVeiculo) {
    console.log("ACESSEI O TRAJETO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarTrajeto():", fkRota, fkVeiculo);

    var query = `INSERT INTO trajeto
                (fkRota, fkVeiculo)
                VALUES
                ('${fkRota}', '${fkVeiculo}');`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

module.exports = {
    cadastrarTrajeto
}