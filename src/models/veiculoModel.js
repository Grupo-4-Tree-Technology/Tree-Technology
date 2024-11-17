var database = require("../database/config");

function cadastrarVeiculo(placa, modelo, ano, fkEmpresa) {
    console.log("ACESSEI O VEICULO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarVeiculo():", placa, modelo, ano, fkEmpresa);

    var query = `INSERT INTO veiculo
                (placa, modelo, ano, fkEmpresa)
                VALUES
                ('${placa}', '${modelo}', ${ano}, ${fkEmpresa});`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function pegarIdUltimoVeiculo(fkEmpresa) {
    console.log("ACESSEI O ROTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarIdUltimoVeiculo():", fkEmpresa);

    var query = `SELECT id AS idVeiculo
                FROM veiculo
                WHERE fkEmpresa = ${fkEmpresa}
                ORDER BY id DESC 
                LIMIT 1;`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function atualizarVeiculo(placa, modelo, ano, idVeiculo) {
    console.log("ACESSEI O VEICULO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarVeiculo():", idVeiculo);

    var query = `
                UPDATE veiculo
                SET placa = '${placa}', modelo = '${modelo}', ano = ${ano}
                WHERE id = ${idVeiculo};`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

module.exports = {
    cadastrarVeiculo,
    pegarIdUltimoVeiculo,
    atualizarVeiculo
}