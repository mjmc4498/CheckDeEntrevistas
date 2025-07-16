document.addEventListener('DOMContentLoaded', function() {
    const levelDistributionCtx = document.getElementById('level-distribution-chart').getContext('2d');
    const radarCtx = document.getElementById('radar-chart').getContext('2d');

    fetch('/api/interviews')
        .then(response => response.json())
        .then(interviews => {
            if (interviews.length > 0) {
                // Level Distribution Chart
                const levelCounts = interviews.reduce((acc, interview) => {
                    acc[interview.suggestedLevel] = (acc[interview.suggestedLevel] || 0) + 1;
                    return acc;
                }, {});

                new Chart(levelDistributionCtx, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(levelCounts),
                        datasets: [{
                            label: 'Número de Candidatos',
                            data: Object.values(levelCounts),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

                // Radar Chart for the last interview
                const lastInterview = interviews[interviews.length - 1];
                const radarLabels = lastInterview.skills.map(s => s.name);
                const radarData = lastInterview.skills.map(s => s.score);

                new Chart(radarCtx, {
                    type: 'radar',
                    data: {
                        labels: radarLabels,
                        datasets: [{
                            label: `Perfil de ${lastInterview.candidateName}`,
                            data: radarData,
                            fill: true,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            pointBackgroundColor: 'rgb(255, 99, 132)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(255, 99, 132)'
                        }]
                    },
                    options: {
                        elements: {
                            line: {
                                borderWidth: 3
                            }
                        }
                    }
                });
            }
        });
});
