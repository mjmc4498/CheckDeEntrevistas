document.addEventListener('DOMContentLoaded', () => {
    const interviews = JSON.parse(localStorage.getItem('interviews')) || [];

    // --- KPIs ---
    const totalInterviews = interviews.length;
    const totalScoreSum = interviews.reduce((sum, i) => sum + i.totalScore, 0);
    const averageScore = totalInterviews > 0 ? (totalScoreSum / totalInterviews).toFixed(2) : 0;
    const approvedCount = interviews.filter(i => i.decision.nextRound === 'Si').length;
    const approvalRate = totalInterviews > 0 ? ((approvedCount / totalInterviews) * 100).toFixed(1) : 0;

    document.getElementById('total-interviews').textContent = totalInterviews;
    document.getElementById('average-score').textContent = averageScore;
    document.getElementById('approval-rate').textContent = `${approvalRate}%`;

    // --- Gráfico de Distribución de Niveles ---
    const levelsCtx = document.getElementById('levels-chart');
    if (levelsCtx) {
        const levelCounts = interviews.reduce((acc, i) => {
            acc[i.suggestedLevel] = (acc[i.suggestedLevel] || 0) + 1;
            return acc;
        }, {});
        new Chart(levelsCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(levelCounts),
                datasets: [{
                    label: 'Distribución de Niveles',
                    data: Object.values(levelCounts),
                    backgroundColor: ['#0d6efd', '#6c757d', '#198754'],
                }]
            }
        });
    }

    // --- Gráfico de Estado del Proceso ---
    const statusCtx = document.getElementById('status-chart');
    if (statusCtx) {
        const statusCounts = interviews.reduce((acc, i) => {
            acc[i.tracking.processStatus] = (acc[i.tracking.processStatus] || 0) + 1;
            return acc;
        }, {});
        new Chart(statusCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    label: 'Estado del Proceso',
                    data: Object.values(statusCounts),
                    backgroundColor: '#6f42c1',
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
    }
});
