function cadastrarVeiculo() {
    var placaValor = document.querySelector('#placa').value;
    var modeloValor = document.querySelector("#modelo").value;
    var anoVeiculoValor = document.querySelector("#anoVeiculo").value;
    var fkEmpresaValor = sessionStorage.getItem("ID_EMPRESA");

    var mensagemErro = document.querySelector("#mensagemErro");

    if ((placaValor == "" || modeloValor == "" || anoVeiculoValor == "")) {
        mensagemErro.innerHTML = "<p style='color:red;'>Preencha todos os campos!</p>";
        
        setTimeout(() => {
            mensagemErro.innerHTML = "";
        }, 2000);
        return false;
    } else {
        data = {
            placa: placaValor,
            modelo: modeloValor,
            anoVeiculo: anoVeiculoValor,
            fkEmpresa: fkEmpresaValor
        }

        fetch("/veiculo/cadastrarVeiculo", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro no cadastro!");
            }
            return response.json();
        })
        .then(() => {
            mensagemErro.innerHTML = "<p style='color: green;'>Cadastro realizado!</p>";
            alert("Cadastro de veículo realizado!");

            document.getElementById('cadastro-veiculos').style.display = 'none';
            document.getElementById('cadastro-rotas').style.display = 'block';

        }).catch(error => {
            console.error(error);
            mensagemErro.innerHTML = "<p style='color:red;'>Erro ao cadastrar!</p>";
        })
    }
}

function cadastrarRota() {
    var ruaInicio = document.querySelector('#rua_inicial').value;
    var ruaFim = document.querySelector("#rua_final").value;
    var fkEmpresa = sessionStorage.getItem("ID_EMPRESA");

    var mensagem = document.querySelector("#mensagem");

    if ((ruaInicio == "" || ruaFim == "")) {
        mensagem.innerHTML = "<p style='color:red;'>Preencha todos os campos!</p>";
        
        setTimeout(() => {
            mensagem.innerHTML = "";
        }, 2000);
        return false;
    } else {
        data = {
            ruaInicial: ruaInicio,
            ruaFinal: ruaFim
        }

        fetch(`/rota/cadastrarRota/${fkEmpresa}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro no cadastro!");
            }
            return response.json();
        })
        .then(() => {
            mensagem.innerHTML = "<p style='color: green;'>Cadastro de rota realizado!</p>";
            pegarIdUltimaRota();

        }).catch(error => {
            console.error(error);
            mensagemErro.innerHTML = "<p style='color:red;'>Erro ao cadastrar!</p>";
        })
    }
}

function pegarIdUltimaRota() {
    var fkEmpresa = sessionStorage.getItem("ID_EMPRESA");

    fetch(`/rota/pegarIdUltimaRota/${fkEmpresa}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    
                    sessionStorage.ID_ROTA = resposta[0].idRota;
                    
                    pegarIdUltimoVeiculo();
                    cadastrarRuasIntermediarias();
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function cadastrarRuasIntermediarias() {

    var fkRota = sessionStorage.getItem("ID_ROTA");
    var mensagem = document.querySelector("#mensagem");

    // Pego nessa variável const todas as classes 'input-rua' e depois transformo em array: 
    const arrayRuasIntermediarias = Array.from(document.getElementsByClassName("input-rua"));

    var ordemRua = 0;

    arrayRuasIntermediarias.forEach(function(rua) {
        var nomeRua = rua.value;
        ordemRua++;
        console.log(nomeRua);

        if ((nomeRua == "")) {
            mensagem.innerHTML = "<p style='color:red;'>Preencha todos os campos!</p>";
            
            setTimeout(() => {
                mensagem.innerHTML = "";
            }, 2000);
            return false;
        } else {
            data = {
                rua: nomeRua,
                ordem: ordemRua
            }
    
            fetch(`/rua/cadastrarRua/${fkRota}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro no cadastro!");
                }
                return response.json();
            })
            .then(() => {
                mensagemErro.innerHTML = "<p style='color: green;'>Cadastro de rota realizado!</p>";
                
            }).catch(error => {
                console.error(error);
                mensagemErro.innerHTML = "<p style='color:red;'>Erro ao cadastrar!</p>";
            })
        }
    });

}

function pegarIdUltimoVeiculo() {
    var fkEmpresa = sessionStorage.getItem("ID_EMPRESA");

    fetch(`/veiculo/pegarIdUltimoVeiculo/${fkEmpresa}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    
                    sessionStorage.ID_VEICULO = resposta[0].idVeiculo;
                    cadastrarTrajeto();
                    
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function cadastrarTrajeto() {
    
    var fkRota = sessionStorage.getItem("ID_ROTA");
    var fkVeiculo = sessionStorage.getItem("ID_VEICULO");

    var mensagem = document.querySelector("#mensagem");

    fetch(`/trajeto/cadastrarTrajeto/${fkRota}/${fkVeiculo}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"}
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro no cadastro!");
        }
        return response.json();
    })
    .then(() => {
        mensagem.innerHTML = "<p style='color: green;'>Trajeto registrado com sucesso!</p>";

    }).catch(error => {
        console.error(error);
        mensagemErro.innerHTML = "<p style='color:red;'>Erro ao cadastrar!</p>";
    })
}