var database = require("../database/config");

function puxarDados(idUsuario) {
    var instrucaoSql = `
        SELECT nome, email, cpf 
        FROM usuario 
        WHERE id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Método para atualizar os dados do usuário
function atualizarUsuario(idUsuario, nome, email, cpf, dataNasc, permissao, status, dataContratacao){
    const query = `
        UPDATE usuario 
        SET nome = "${nome}", email = "${email}, cpf = "${cpf}", data_nascimento = ${dataNasc}, permissao = ${permissao},status = ${status}, data_contratacao = ${dataContratacao}
        WHERE id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
};



function deletarUsuario(idUsuario) {

    const query = `DELETE FROM usuario WHERE id = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);

}

module.exports = {
    puxarDados,
    atualizarUsuario,
    deletarUsuario
};
