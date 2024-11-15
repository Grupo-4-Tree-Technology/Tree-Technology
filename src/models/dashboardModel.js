var database = require("../database/config")


function obterFasesDoDia() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterFasesDoDia():");

    var instrucaoSql = `
        SELECT fase_dia, COUNT(*) AS total_fase_dia
        FROM acidente_transito
        GROUP BY fase_dia;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterAcidentesClima() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterAcidentesClima():");

    var instrucaoSql = `
        SELECT condicao_metereologica, COUNT(*) AS total_fase_dia
        FROM acidente_transito
        GROUP BY condicao_metereologica;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDadosGrafico() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosGrafico():");

    var instrucaoSql = `
        SELECT dia_semana, COUNT(*) AS total_fase_dia
        FROM acidente_transito
        GROUP BY dia_semana;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    obterFasesDoDia,
    obterAcidentesClima,
    obterDadosGrafico,
};