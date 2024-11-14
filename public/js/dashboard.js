

function openSelectWithImages() {
    const selectSelected = document.querySelector('.select-selected');
    const items = document.querySelector('.select-items');

    selectSelected.addEventListener('click', function () {
        items.style.display = items.style.display == 'block' ? 'none' : 'block';

        if (items.style.display == 'block') {
            seta.innerHTML = '&#9652;';
        } else {
            seta.innerHTML = '&#9662;';
        }

    });

    document.querySelectorAll('.select-items div').forEach(item => {
        item.addEventListener('click', function () {
            const selected = document.querySelector('.select-selected');
            const img = this.querySelector('img').src;
            const text = this.textContent.trim();

            if (text == "Rota Original") {
                selectSelected.style.gap = '22.5em';
                selected.innerHTML = `
                    <span class="text-icon" style="width: 13vw;">
                        ${text}
                        <img src="${img}" alt="${text}">
                    </span>
                    <span class="arrow" style="font-size: 32pt;">&#9662;</span>
                    `;
            } else {
                selectSelected.style.gap = '17em';
                selected.innerHTML = `
                    <span class="text-icon" style="width: 21vw;">
                        ${text}
                        <img src="${img}" alt="${text}">
                    </span>
                    <span class="arrow" style="font-size: 32pt;">&#9662;</span>
                    `;
            }
            items.style.display = 'none';
        });
    });

    window.onclick = function (event) {
        if (!event.target.matches('.custom-select') && !event.target.closest('.custom-select')) {
            items.style.display = 'none';
        }
    }
}

/*function irParaTelaRota() {
    window.location = 'lista-rotas.html';
}*/

function obterFasesDoDia() {

    fetch(`/dashboardCrud/obterFasesDoDia`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    // resposta.reverse();
                    // console.log(JSON.stringify(response[0].total_fase_dia))
                    sessionStorage.PLENO_DIA = resposta[0].total_fase_dia
                    sessionStorage.ANOITECER = resposta[1].total_fase_dia
                    sessionStorage.AMANHECER = resposta[2].total_fase_dia
                    sessionStorage.PLENA_NOITE = resposta[3].total_fase_dia
                    
                    let pleno_dia = sessionStorage.PLENO_DIA;
                    document.querySelector('#pleno_dia').innerHTML = pleno_dia

                    let anoitecer = sessionStorage.ANOITECER;
                    document.querySelector('#anoitecer').innerHTML = anoitecer

                    let amanhecer = sessionStorage.AMANHECER;
                    document.querySelector('#amanhecer').innerHTML = amanhecer

                    let plena_noite = sessionStorage.PLENA_NOITE;
                    document.querySelector('#plena_noite').innerHTML = plena_noite

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function obterAcidentesDia() {

    fetch(`/dashboardCrud/obterAcidentesDia`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    // resposta.reverse();
                    // console.log(JSON.stringify(response[0].total_fase_dia))
                    sessionStorage.CEU_CLARO = resposta[0].total_fase_dia
                    sessionStorage.CHUVA = resposta[1].total_fase_dia
                    sessionStorage.NUBLADO = resposta[2].total_fase_dia
                    sessionStorage.SOL = resposta[3].total_fase_dia
                    sessionStorage.GAROA_CHUVISCO = resposta[4].total_fase_dia

                    
                    let ceu_claro = sessionStorage.CEU_CLARO;
                    document.querySelector('#ceu_claro').innerHTML = ceu_claro

                    let chuva = sessionStorage.CHUVA;
                    document.querySelector('#chuva').innerHTML = chuva

                    let nublado = sessionStorage.NUBLADO;
                    document.querySelector('#nublado').innerHTML = nublado

                    let sol = sessionStorage.SOL;
                    document.querySelector('#sol').innerHTML = sol

                    let garoa_chuvisco = sessionStorage.GAROA_CHUVISCO;
                    document.querySelector('#garoa_chuvisco').innerHTML = garoa_chuvisco

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function obterDadosGrafico() {

    fetch(`/dashboardCrud/obterDadosGrafico`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();
                    plotarGrafico(resposta);

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// function plotarGrafico(resposta, idUsuario) {

//     console.log('iniciando plotagem do gráfico...');

//     // Criando estrutura para plotar gráfico - labels
//     let labels = ["fase1", "fase2"];

//     // Criando estrutura para plotar gráfico - dados
//     let dados = {
//         labels: labels,
//         datasets: [{
//             label: 'Número de Acidentes X Dia da semana',
//             data: [],
//             fill: false,
//             backgroundColor: ['rgb(149, 108, 70)', 'rgb(114, 173, 74)',],
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1,
//         }]
//     };

//     console.log('----------------------------------------------')
//     console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
//     console.log(resposta)

//     // Inserindo valores recebidos em estrutura para plotar o gráfico
//     for (i = 0; i < resposta.length; i++) {
//         var registro = resposta[i];
//         // labels.push(registro.momento_grafico);
//         dados.datasets[0].data.push(registro.fase1);
//         dados.datasets[0].data.push(registro.fase2);
//         // dados.datasets[0].data.push(registro.total);
//     }

//     console.log('----------------------------------------------')
//     console.log('O gráfico será plotado com os respectivos valores:')
//     console.log('Labels:')
//     console.log(labels)
//     console.log('Dados:')
//     console.log(dados.datasets)
//     console.log('----------------------------------------------')

//     // Criando estrutura para plotar gráfico - config
//     const config = {
//         type: 'bar',
//         data: dados,
//         options: {
//             scales: {
//                 y: {
//                     ticks: {
//                         stepSize: 1
//                     }
//                 }
//             }
//         }
//     };

//     // Adicionando gráfico criado em div na tela
//     let myChart = new Chart(
//         document.getElementById(`myChart`),
//         config
//     );

// }

// function plotarGrafico(resposta) {

//     console.log('iniciando plotagem do gráfico...');

//     const ctx = document.getElementById('myChart').getContext('2d');

//     const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
//     const data = {
//         labels: labels,
//         datasets: [{
//             label: 'Número de Acidentes X Dia da semana',
//             data: [12, 19, 3, 10, 2, 3, 7],
//             backgroundColor: '#fff',
//             borderColor: '#0F7A09',
//             borderWidth: 3.5,
//             tension: 0.4,
//             animations: {
//                 y: {
//                     duration: 0
//                 }
//             }
//         }]
//     };

//     console.log('----------------------------------------------')
//     console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
//     console.log(resposta)

//     // Inserindo valores recebidos em estrutura para plotar o gráfico
//     for (i = 0; i < resposta.length; i++) {
//         var total_fase_dia = resposta[i];
//         // labels.push(registro.momento_grafico);
//         dados.datasets[0].data.push(total_fase_dia.Seg);
//         dados.datasets[1].data.push(total_fase_dia.Ter);
//         dados.datasets[2].data.push(total_fase_dia.Qua);
//         dados.datasets[3].data.push(total_fase_dia.Qui);
//         dados.datasets[4].data.push(total_fase_dia.Sex);
//         dados.datasets[5].data.push(total_fase_dia.Sab);
//         dados.datasets[6].data.push(total_fase_dia.Dom);
//         // dados.datasets[0].data.push(registro.total);
//     }

//     console.log('----------------------------------------------')
//     console.log('O gráfico será plotado com os respectivos valores:')
//     console.log('Labels:')
//     console.log(labels)
//     console.log('Dados:')
//     console.log(dados.datasets)
//     console.log('----------------------------------------------')

//     const config = {
//         type: 'line',
//         data: data,
//         options: {
//             plugins: {
//                 legend: {
//                     display: false
//                 }
//             },
//             scales: {
//                 x: {
//                     title: {
//                         display: true,
//                         text: 'Dias da semana',
//                         font: {
//                             size: 18,
//                             weight: 'bold'
//                         },
//                         color: '#0E3D0B'
//                     },
//                     ticks: {
//                         font: {
//                             size: 14,
//                             color: '#0E3D0B'
//                         }
//                     }
//                 },
//                 y: {
//                     beginAtZero: true,
//                     title: {
//                         display: true,
//                         text: "Número de acidentes",
//                         font: {
//                             size: 18,
//                             weight: 'bold'
//                         },
//                         color: '#0E3D0B'
//                     }
//                 }
//             },
//             elements: {
//                 line: {
//                     borderWidth: 5,
//                     borderColor: '#000'
//                 },
//                 point: {
//                     backgroundColor: 'rgb(75, 192, 192)'
//                 }
//             }
//         }
//     };

//     const myChart = new Chart(ctx, config);
// }

function plotarGrafico(resposta) {

    console.log('iniciando plotagem do gráfico...');

    const ctx = document.getElementById('myChart').getContext('2d');

    const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Número de Acidentes X Dia da semana',
            data: [0, 0, 0, 0, 0, 0, 0], // Inicializa com 0 para cada dia da semana
            backgroundColor: '#fff',
            borderColor: '#0F7A09',
            borderWidth: 3.5,
            tension: 0.4,
            animations: {
                y: {
                    duration: 0
                }
            }
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Mapeando os valores de 'resposta' para os dias da semana corretos
    for (let i = 0; i < resposta.length; i++) {
        const item = resposta[i];
        
        switch (item.dia_semana) {
            case 'Segunda-feira':
                data.datasets[0].data[0] = item.total_fase_dia;
                break;
            case 'Terça-feira':
                data.datasets[0].data[1] = item.total_fase_dia;
                break;
            case 'Quarta-feira':
                data.datasets[0].data[2] = item.total_fase_dia;
                break;
            case 'Quinta-feira':
                data.datasets[0].data[3] = item.total_fase_dia;
                break;
            case 'Sexta-feira':
                data.datasets[0].data[4] = item.total_fase_dia;
                break;
            case 'Sabado':
                data.datasets[0].data[5] = item.total_fase_dia;
                break;
            case 'Domingo':
                data.datasets[0].data[6] = item.total_fase_dia;
                break;
            default:
                console.warn(`Dia da semana "${item.dia_semana}" não reconhecido.`);
        }
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(data.datasets[0].data)
    console.log('----------------------------------------------')

    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Dias da semana',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        color: '#0E3D0B'
                    },
                    ticks: {
                        font: {
                            size: 14,
                            color: '#0E3D0B'
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Número de acidentes",
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        color: '#0E3D0B'
                    },
                    ticks: {
                        // Exibir apenas números inteiros
                        callback: function(value) {
                            return Number.isInteger(value) ? value : null;
                        }
                    }
                }
            },
            elements: {
                line: {
                    borderWidth: 5,
                    borderColor: '#000'
                },
                point: {
                    backgroundColor: 'rgb(75, 192, 192)'
                }
            }
        }
    };

    const myChart = new Chart(ctx, config);
}


