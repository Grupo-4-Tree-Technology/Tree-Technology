function buildGraphic() {
    const ctx = document.getElementById('myChart').getContext('2d');

    const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Número de Acidentes X Dia da semana',
            data: [12, 19, 3, 10, 2, 3, 7],
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

function openSelectWithImages() {
    const selectSelected = document.querySelector('.select-selected');
    const items = document.querySelector('.select-items');

    selectSelected.addEventListener('click', function () {
        items.style.display = items.style.display == 'block' ? 'none' : 'block';
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

function irParaTelaRota() {
    window.location = 'lista-rotas.html';
}