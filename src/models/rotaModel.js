var database = require("../database/config");

function cadastrarRota(ruaInicial, ruaFinal, fkEmpresa) {
    console.log("ACESSEI O ROTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarRota():", ruaInicial, ruaFinal, fkEmpresa);

    var query = `INSERT INTO rota
                (ponto_partida, ponto_destino, fkEmpresa)
                VALUES
                ('${ruaInicial}', '${ruaFinal}', ${fkEmpresa});`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function pegarIdUltimaRota(fkEmpresa) {
    console.log("ACESSEI O ROTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarIdUltimaRota():", fkEmpresa);

    var query = `SELECT id AS idRota
                FROM rota
                WHERE fkEmpresa = ${fkEmpresa}
                ORDER BY id DESC 
                LIMIT 1;`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function atualizarRota(ponto_partida, ponto_destino, idRota) {
    console.log("ACESSEI O ROTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarRota():", ponto_partida, ponto_destino, idRota);

    var query = `UPDATE rota
                SET ponto_partida = '${ponto_partida}', ponto_destino = '${ponto_destino}'
                WHERE id = ${idRota};`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

module.exports = {
    cadastrarRota,
    pegarIdUltimaRota,
    atualizarRota
}