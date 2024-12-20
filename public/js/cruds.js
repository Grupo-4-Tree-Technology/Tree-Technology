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
            headers: { "Content-Type": "application/json" },
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

    let blur = document.getElementById("blur");

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
            headers: { "Content-Type": "application/json" },
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

    arrayRuasIntermediarias.forEach(function (rua) {
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
                headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro no cadastro!");
            }
            return response.json();
        })
        .then(() => {
            mensagem.innerHTML = "<p style='color: green;'>Trajeto registrado com sucesso!</p>";

            setTimeout(() => {
                window.location = "lista-trajetos.html";
            }, 1500);

        }).catch(error => {
            console.error(error);
            mensagemErro.innerHTML = "<p style='color:red;'>Erro ao cadastrar!</p>";
        })
}

function carregarTrajetos() {
    var fkEmpresa = sessionStorage.getItem("ID_EMPRESA");
    var divScroll = document.getElementById("scroll");

    divScroll.innerHTML = '';

    fetch(`/trajeto/carregarTrajetos/${fkEmpresa}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (trajetos) {

                    console.log(`Dados recebidos: ${JSON.stringify(trajetos)}`);

                    trajetos.forEach(function (trajeto) {
                        divScroll.innerHTML += `
                        <div onclick="selecionarTrajetoEspecifico(this)" class="list-routes" data-setIdTrajeto="${trajeto.id}">
        
                            <div class="text">
                                <div class="title">
                                    <h4>Rota (Início | Fim)</h4>
                                    <h4>Placa</h4>
            
                                </div>
            
                                <div class="dots">

                                    <img src="../assets/dots.png" alt="" class="open-dots">
                                    <div class="options" style="display: none;">
                                        <img src="../assets/close.jpeg" alt="" class="close-dots">
                                        <button id="button-delete" onclick="deletarTrajeto(this)">Deletar Trajeto</button>
                                        <button onclick="telaCadastroRota(this)">Editar Trajeto</button>
                                    </div>

                                </div>
                            </div>
            
                            <div class="rota">
                            
                            <p style="font-size: 80%">${trajeto.ponto_partida} | ${trajeto.ponto_destino}</p>
                                <p class="placa" style="font-size: 80%">${trajeto.placa}</p>
                            </div>
                        </div>
                        `
                    });

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function carregarTrajetos2() {
    var fkEmpresa = sessionStorage.getItem("ID_EMPRESA");
    var divScroll = document.getElementById("scroll");

    divScroll.innerHTML = '';

    fetch(`/trajeto/carregarTrajetos/${fkEmpresa}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (trajetos) {

                    console.log(`Dados recebidos: ${JSON.stringify(trajetos)}`);

                    trajetos.forEach(function (trajeto) {
                        divScroll.innerHTML += `
                        <div onclick="selecionarTrajetoEspecifico(this)" class="list-routes" data-setIdTrajeto="${trajeto.id}">
        
                            <div class="text">
                                <div class="title">
                                    <h4>Rota (Início | Fim)</h4>
                                    <h4>Placa</h4>
            
                                </div>
            
                                <div class="dots">
                                    <div class="options" style="display: none;">
                                        <img src="../assets/close.jpeg" alt="" class="close-dots">
                                        <button id="button-delete" onclick="deletarTrajeto(this)">Deletar Trajeto</button>
                                        <button onclick="telaCadastroRota(this)">Editar Trajeto</button>
                                    </div>

                                </div>
                            </div>
            
                            <div class="rota">
                            
                            <p style="font-size: 80%">${trajeto.ponto_partida} | ${trajeto.ponto_destino}</p>
                                <p class="placa" style="font-size: 80%">${trajeto.placa}</p>
                            </div>
                        </div>
                        `
                    });

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function selecionarTrajetoEspecifico(elemento) {

    // Obtém o valor do atributo data-setIdTrajeto
    const idTrajeto = elemento.getAttribute('data-setIdTrajeto');
    // Estou inserindo o ID do trajeto no sessionStorage
    sessionStorage.ID_TRAJETO_ESPECIFICO = idTrajeto;

    var fkEmpresa = sessionStorage.getItem("ID_EMPRESA");

    var divInfoRota = document.getElementById('info-rota');

    fetch(`/trajeto/selecionarTrajetoEspecifico/${idTrajeto}/${fkEmpresa}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (trajeto) {

                    console.log(`Dados recebidos: ${JSON.stringify(trajeto)}`);

                    divInfoRota.innerHTML = `
                    <span>Início: ${trajeto[0].ponto_partida} - Final: ${trajeto[0].ponto_destino}</span>
                    <span>${trajeto[0].placa}</span>
                    `

                    sessionStorage.PONTO_PARTIDA = trajeto[0].ponto_partida;
                    sessionStorage.PONTO_DESTINO = trajeto[0].ponto_destino;
                    sessionStorage.PLACA = trajeto[0].placa;
                    sessionStorage.PARADAS = trajeto[0].ruas_intermediarias;
                    
                    window.location = "dashboard.html";
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
    
}

function exibeInfoTrajetoSelecionado() {
    var divInfoRota = document.getElementById('info-rota');
    var ponto_partida = sessionStorage.getItem("PONTO_PARTIDA");
    var ponto_destino = sessionStorage.getItem("PONTO_DESTINO");
    var placa = sessionStorage.getItem("PLACA");

    if (ponto_partida == null || ponto_destino == null || placa == null) {
        divInfoRota.style.display = 'block';
        divInfoRota.innerHTML = `<span style="cursor: pointer" onclick="abrirBox()">Selecione</span> um trajeto para visualizar.`
    } else {
        divInfoRota.innerHTML = `
                        <span>Início: ${ponto_partida} | Final: ${ponto_destino}</span>
                        <span>${placa}</span>`
    }

}

function buscarInfoTrajeto() {
    var placa = document.getElementById("placa");
    var modelo = document.getElementById("modelo");
    var ano = document.getElementById("ano");
    var ponto_partida = document.getElementById("ponto_partida");
    var ponto_destino = document.getElementById("ponto_destino");

    var fkEmpresa = sessionStorage.getItem("ID_EMPRESA");
    var idTrajeto = sessionStorage.getItem("ID_TRAJETO");

    fetch(`/trajeto/buscarInfoTrajeto/${idTrajeto}/${fkEmpresa}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (infosTrajeto) {

                    console.log(`Dados recebidos: ${JSON.stringify(infosTrajeto)}`);

                    sessionStorage.ID_ROTA = infosTrajeto[0].rota_id;
                    sessionStorage.ID_VEICULO = infosTrajeto[0].veiculo_id;

                    placa.value = infosTrajeto[0].placa;
                    modelo.value = infosTrajeto[0].modelo;
                    ano.value = infosTrajeto[0].anoVeiculo;
                    ponto_partida.value = infosTrajeto[0].ponto_partida;
                    ponto_destino.value = infosTrajeto[0].ponto_destino;

                    var divComScroll = document.getElementById('containerMensagem');
                    var ruasIntermediarias = document.getElementById('ruasIntermediarias');

                    if (infosTrajeto[0].ruas_intermediarias == null) {
                        ruasIntermediarias.style.display = 'none';
                        divComScroll.innerHTML = `<input id="containerMensagem" placeholder="Não há Pontos de Parada" disabled></input>`

                    } else {

                        const listaRuas = infosTrajeto[0].ruas_intermediarias.split(' | ');
                        const listaIdRuas = infosTrajeto[0].idRuas.split(' | ');

                        divComScroll.style.display = 'none';
                        var contadorRua = 0;

                        for (let i = 0; i < listaIdRuas.length; i++) {
                            contadorRua++

                            ruasIntermediarias.insertAdjacentHTML('beforeend', `
                                <div id="${listaIdRuas[i]}" class="input-ruas">
                                    <input type="text" name="ruaIntermediaria" id="inputRua${contadorRua}" class="input-rua">
                                    <p type="p" class="paragrafoRua" onclick="deletarRua('${listaIdRuas[i]}')" style="color: red; cursor: pointer;">
                                        X
                                    </p>
                                </div>
                            `);

                            let inputRuaDaVez = document.getElementById(`inputRua${contadorRua}`);
                            inputRuaDaVez.value = listaRuas[i];
                        }
                    }
                });

            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function deletarTrajeto(button) {
    var parentDiv = button.closest(".list-routes");
    parentDiv.remove();

    if (parentDiv) {
        // Obtenho o atributo data-setIdTrajeto e transformo em INTEIRO!
        var dataSetNumber = parseInt(parentDiv.getAttribute("data-setIdTrajeto"), 10);
        console.log(`ID Trajeto selecionado: ${dataSetNumber}`);

        // Estou inserindo o ID do trajeto no sessionStorage
        sessionStorage.ID_TRAJETO = dataSetNumber;

        fetch(`/trajeto/deletarTrajeto/${dataSetNumber}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro no cadastro!");
                }
                return response.json();
            })
            .then(() => {
                console.log("Trajeto retirado com sucesso!")
                sessionStorage.ID_TRAJETO = 0;

            }).catch(error => {
                console.error(error);
                mensagemErro.innerHTML = "<p style='color:red;'>Erro ao retirar trajeto!</p>";
            })

    } else {
        console.error("Não foi possível encontrar o trajeto associado.");
    }
}

function deletarRua(id) {
    var ruaParaRemover = document.getElementById(id);
    ruaParaRemover.remove();

    var idRua = parseInt(id, 10);

    fetch(`/rua/deletarRua/${idRua}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro no cadastro!");
            }
            return response.json();
        })
        .then(() => {
            console.log("Rua retirada com sucesso!")

        }).catch(error => {
            console.error(error);
        })
}

function atualizarVeiculo() {
    let placaInput = document.getElementById('placa').value;
    let modeloInput = document.getElementById('modelo').value;
    let anoInput = document.getElementById('ano').value;

    var idVeiculo = sessionStorage.getItem("ID_VEICULO");

    data = {
        placa: placaInput,
        modelo: modeloInput,
        ano: anoInput
    }

    fetch(`/veiculo/atualizarVeiculo/${idVeiculo}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao atualizar o veículo!");
            }
            return response.json();
        })
        .then(() => {
            console.log('Atualização do veículo feita com sucesso!');
            atualizarRota();

        }).catch(error => {
            console.error(error);
        })
}

function atualizarRota() {
    let ponto_partida = document.getElementById('ponto_partida').value;
    let ponto_destino = document.getElementById('ponto_destino').value;

    var idRota = sessionStorage.getItem("ID_ROTA");

    data = {
        ponto_partida: ponto_partida,
        ponto_destino: ponto_destino
    }

    fetch(`/rota/atualizarRota/${idRota}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao atualizar a rota!");
            }
            return response.json();
        })
        .then(() => {
            console.log('Atualização da rota feita com sucesso!');
            atualizarRuas();

        }).catch(error => {
            console.error(error);
        })
}

function atualizarRuas() {
    var ordemRua = 0;
    let ruasValidas = 0; // Para contar o total de ruas com nome

    const arrayRuasIntermediarias = Array.from(document.getElementsByClassName("input-rua"));

    // Contar quantas ruas têm um nome preenchido
    arrayRuasIntermediarias.forEach(function (rua) {
        if (rua.value.trim() !== "") {
            ruasValidas++;
        }
    });

    // Se o total de ruas válidas for 0, não faz nada
    if (ruasValidas === 0) {
        console.log("Nenhuma rua preenchida, não há o que atualizar.");
        return; // Sai da função sem fazer nada
    }

    // Caso contrário, começa o processamento
    arrayRuasIntermediarias.forEach(function (rua) {
        let idRuaAtualizado = rua.closest('.input-ruas');
        idRuaAtualizado = idRuaAtualizado.id;

        var nomeRua = rua.value;
        ordemRua++;

        if (nomeRua === "") {
            return; // Ignora as ruas sem nome
        } else {
            const data = { rua: nomeRua };

            fetch(`/rua/atualizarRua/${idRuaAtualizado}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erro no cadastro!");
                    }
                    return response.json();
                })
                .then(() => {
                    console.log('Atualização da rua feita com sucesso! ' + nomeRua);
                    window.location.href = "../telas-veiculos-rotas/lista-trajetos.html";
                })
                .catch(error => {
                    console.error(error);
                });
        }
    });
}
