(() => {
    const ctx = document.getElementById('winsPieCanvas').getContext('2d');

    const data = {
        labels: ["Brazil", "Argentina", "France", "Germany", "Spain", "Italy", "Portugal", "England", "Belgium", "Netherlands"],
        datasets: [{
            label: 'Wins',
            data: [4, 3, 3, 2, 3, 1, 3, 2, 1, 2],
            backgroundColor: [
                '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f',
                '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
            ],
            borderColor: 'white',
            borderWidth: 2
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right', // Puts labels neatly on the right
                    labels: {
                        font: {
                            size: 14
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            if (label) label += ': ';
                            if (context.raw !== null) label += context.raw;
                            return label + ' wins';
                        }
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
})();
