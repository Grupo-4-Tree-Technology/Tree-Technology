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

function carregarTrajetos(fkEmpresa) {
    console.log("ACESSEI O ROTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function carregarTrajetos():", fkEmpresa);

    var query = `SELECT
                    traj.id,
                    rota.ponto_partida, rota.ponto_destino,
                    veic.placa
                FROM trajeto AS traj
                JOIN rota ON traj.fkRota = rota.id
                JOIN veiculo AS veic ON traj.fkVeiculo = veic.id
                WHERE rota.fkEmpresa = ${fkEmpresa}
                ORDER BY traj.id;`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function buscarInfoTrajeto(idTrajeto, fkEmpresa) {
    console.log("ACESSEI O ROTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarInfoTrajeto():", idTrajeto, fkEmpresa);

    var query = `
                SELECT
                    trajeto.id,
                    rota.id AS rota_id,
                    rota.ponto_partida,
                    GROUP_CONCAT(rua_intermed.id ORDER BY rua_intermed.id SEPARATOR ' | ') AS idRuas,
                    GROUP_CONCAT(rua_intermed.rua ORDER BY rua_intermed.ordem SEPARATOR ' | ') AS ruas_intermediarias,
                    GROUP_CONCAT(rua_intermed.ordem ORDER BY rua_intermed.ordem SEPARATOR ' | ') AS ordem_ruas,
                    COUNT(*) AS total_ruas,
                    rota.ponto_destino,
                    veiculo.id AS veiculo_id,
                    GROUP_CONCAT(DISTINCT veiculo.placa ORDER BY veiculo.placa SEPARATOR ' | ') AS placa,
                    GROUP_CONCAT(DISTINCT veiculo.modelo ORDER BY veiculo.modelo SEPARATOR ' | ') AS modelo,
                    GROUP_CONCAT(DISTINCT veiculo.ano ORDER BY veiculo.ano SEPARATOR ' | ') AS anoVeiculo
                FROM rota
                LEFT JOIN rua_intermediaria AS rua_intermed
                    ON rota.id = rua_intermed.fkRota
                JOIN trajeto
                    ON trajeto.fkRota = rota.id
                JOIN veiculo
                    ON veiculo.id = trajeto.fkVeiculo
                WHERE rota.fkEmpresa = ${fkEmpresa} and trajeto.id = ${idTrajeto}
                GROUP BY rota.id, veiculo.id;`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function deletarTrajeto(idTrajeto) {
    console.log("ACESSEI O TRAJETO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarTrajeto():", idTrajeto);

    var query = `DELETE FROM trajeto WHERE id = ${idTrajeto};`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function selecionarTrajetoEspecifico(idTrajeto, fkEmpresa) {
    console.log("ACESSEI O ROTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function selecionarTrajetoEspecifico():", idTrajeto, fkEmpresa);

    var query = `
                SELECT
                    trajeto.id,
                    rota.id AS rota_id,
                    rota.ponto_partida,
                    GROUP_CONCAT(rua_intermed.id ORDER BY rua_intermed.id SEPARATOR ' | ') AS idRuas,
                    GROUP_CONCAT(rua_intermed.rua ORDER BY rua_intermed.ordem SEPARATOR ' | ') AS ruas_intermediarias,
                    GROUP_CONCAT(rua_intermed.ordem ORDER BY rua_intermed.ordem SEPARATOR ' | ') AS ordem_ruas,
                    COUNT(*) AS total_ruas,
                    rota.ponto_destino,
                    veiculo.id AS veiculo_id,
                    GROUP_CONCAT(DISTINCT veiculo.placa ORDER BY veiculo.placa SEPARATOR ' | ') AS placa,
                    GROUP_CONCAT(DISTINCT veiculo.modelo ORDER BY veiculo.modelo SEPARATOR ' | ') AS modelo,
                    GROUP_CONCAT(DISTINCT veiculo.ano ORDER BY veiculo.ano SEPARATOR ' | ') AS anoVeiculo
                FROM rota
                LEFT JOIN rua_intermediaria AS rua_intermed
                    ON rota.id = rua_intermed.fkRota
                JOIN trajeto
                    ON trajeto.fkRota = rota.id
                JOIN veiculo
                    ON veiculo.id = trajeto.fkVeiculo
                WHERE rota.fkEmpresa = ${fkEmpresa} and trajeto.id = ${idTrajeto}
                GROUP BY rota.id, veiculo.id;`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

module.exports = {
    cadastrarTrajeto,
    carregarTrajetos,
    buscarInfoTrajeto,
    deletarTrajeto,
    selecionarTrajetoEspecifico
}