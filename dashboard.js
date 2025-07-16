document.addEventListener('DOMContentLoaded', () => {
    const levelDistributionCtx = document.getElementById('level-distribution-chart');
    const radarCtx = document.getElementById('radar-chart');
    const attitudeRadarCtx = document.getElementById('attitude-radar-chart');
    const interviews = JSON.parse(localStorage.getItem('interviews')) || [];

    if (interviews.length > 0) {
        // Level Distribution Chart
        const levelCounts = interviews.reduce((acc, interview) => {
            acc[interview.suggestedLevel] = (acc[interview.suggestedLevel] || 0) + 1;
            return acc;
        }, {});

        if(levelDistributionCtx) new Chart(levelDistributionCtx, {
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

        // Radar Chart for the last interview's technical skills
        const lastInterview = interviews[interviews.length - 1];
        const radarLabels = lastInterview.skills.map(s => s.name);
        const radarData = lastInterview.skills.map(s => s.score);

        if(radarCtx) new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: radarLabels,
                datasets: [{
                    label: `Perfil Técnico de ${lastInterview.candidateName}`,
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

        // Radar chart for attitudinal indicators
        const attitudeIndicators = lastInterview.indicators;
        const attitudeLabels = Object.keys(attitudeIndicators);
        const attitudeData = attitudeLabels.map(key => {
            const category = attitudeIndicators[key];
            const total = Object.values(category).reduce((sum, value) => sum + parseInt(value), 0);
            return total / Object.values(category).length; // Average score for the category
        });

        if(attitudeRadarCtx) new Chart(attitudeRadarCtx, {
            type: 'radar',
            data: {
                labels: attitudeLabels.map(l => l.charAt(0).toUpperCase() + l.slice(1)), // Capitalize labels
                datasets: [{
                    label: `Perfil Actitudinal de ${lastInterview.candidateName}`,
                    data: attitudeData,
                    fill: true,
                    backgroundColor: 'rgba(252, 37, 117, 0.5)',
                    borderColor: 'rgb(252, 37, 117)',
                    pointBackgroundColor: 'rgb(252, 37, 117)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(252, 37, 117)'
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
