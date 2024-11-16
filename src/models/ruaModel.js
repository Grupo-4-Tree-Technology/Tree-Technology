var database = require("../database/config");

function cadastrarRua(rua, ordem, fkRota) {
    console.log("ACESSEI O RUA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarRua():", rua, ordem, fkRota);

    var query = `INSERT INTO rua_intermediaria
                (rua, ordem, fkRota)
                VALUES
                ('${rua}', ${ordem}, ${fkRota});`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

module.exports = {
    cadastrarRua
}