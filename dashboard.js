document.addEventListener('DOMContentLoaded', () => {
    const levelDistributionCtx = document.getElementById('level-distribution-chart').getContext('2d');
    const radarCtx = document.getElementById('radar-chart').getContext('2d');
    const interviews = JSON.parse(localStorage.getItem('interviews')) || [];

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
                    backgroundColor: 'rgba(37, 117, 252, 0.5)',
                    borderColor: 'rgba(37, 117, 252, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#fff'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#fff'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff'
                        }
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
                    backgroundColor: 'rgba(106, 17, 203, 0.5)',
                    borderColor: 'rgb(106, 17, 203)',
                    pointBackgroundColor: 'rgb(106, 17, 203)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(106, 17, 203)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        },
                        pointLabels: {
                            color: '#fff'
                        },
                        ticks: {
                            color: '#fff',
                            backdropColor: 'transparent'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff'
                        }
                    }
                }
            }
        });
    }
});
