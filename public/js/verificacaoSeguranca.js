function verificarPermissao() {
    let btnVisualizarListaFuncionarios = document.getElementById('item-func'); 
    let permissao = sessionStorage.getItem("PERMISSAO");
    let status = sessionStorage.getItem("STATUS");

    if (permissao == 'Leitura' || permissao == 'leitura') {
        btnVisualizarListaFuncionarios.style.display = 'none';
    } 
    
    if (status == 'Desativado' || status == 'desativado') {
        window.location = '../index.html'
    }
}

function sairDaSessao() {
    sessionStorage.clear();
    window.location = '../index.html'
}