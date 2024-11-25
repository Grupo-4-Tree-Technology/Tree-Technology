let myChart;

function buildGraphic() {
    const dadosAcidentes = JSON.parse(sessionStorage.getItem("ACIDENTES_SEMANA"));

    const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
    const data = [
        dadosAcidentes[0].total_fase_dia,
        dadosAcidentes[1].total_fase_dia,
        dadosAcidentes[2].total_fase_dia,
        dadosAcidentes[3].total_fase_dia,
        dadosAcidentes[4].total_fase_dia,
        dadosAcidentes[5].total_fase_dia,
        dadosAcidentes[6].total_fase_dia
    ];

    if (!myChart) {
        // Cria o gráfico na primeira execução
        const ctx = document.getElementById('myChart').getContext('2d');

        const config = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Número de Acidentes X Dia da semana',
                    data: data,
                    backgroundColor: '#62a065aa',
                    borderColor: '#0F7A09',
                    borderWidth: 3.5,
                    tension: 0.4
                }]
            },
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

        myChart = new Chart(ctx, config);
    } else {
        // Atualiza os dados do gráfico existente
        myChart.data.datasets[0].data = data;
        myChart.update();
    }
}


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

function obterFasesDoDia() {

    fetch(`/dashboardCrud/obterFasesDoDia`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    
                    sessionStorage.ACIDENTES_FASES_DIA = JSON.stringify(resposta);
                    
                    let plena_noite = resposta[0].total_fase_dia;
                    document.querySelector('#plena_noite').innerHTML = plena_noite

                    let pleno_dia = resposta[1].total_fase_dia;
                    document.querySelector('#pleno_dia').innerHTML = pleno_dia

                    let anoitecer = resposta[2].total_fase_dia;
                    document.querySelector('#anoitecer').innerHTML = anoitecer

                    let amanhecer = resposta[3].total_fase_dia;
                    document.querySelector('#amanhecer').innerHTML = amanhecer
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function obterAcidentesClima() {

    fetch(`/dashboardCrud/obterAcidentesClima`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    sessionStorage.ACIDENTES_CLIMA = JSON.stringify(resposta);
                    
                    let ceu_claro = resposta[0].total_fase_dia;
                    document.querySelector('#ceu_claro').innerHTML = ceu_claro

                    let sol = resposta[1].total_fase_dia;
                    document.querySelector('#sol').innerHTML = sol
                    
                    let nublado = resposta[2].total_fase_dia;
                    document.querySelector('#nublado').innerHTML = nublado

                    let chuva = resposta[3].total_fase_dia;
                    document.querySelector('#chuva').innerHTML = chuva

                    let garoa_chuvisco = resposta[4].total_fase_dia;
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
                    sessionStorage.ACIDENTES_SEMANA = JSON.stringify(resposta);
                    buildGraphic();
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

