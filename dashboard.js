document.addEventListener('DOMContentLoaded', () => {
    const interviews = JSON.parse(localStorage.getItem('interviews')) || [];

    // --- KPIs ---
    const totalInterviews = interviews.length;
    const totalScoreSum = interviews.reduce((sum, i) => sum + i.totalScore, 0);
    const averageScore = totalInterviews > 0 ? (totalScoreSum / totalInterviews).toFixed(2) : 0;
    const approvedCount = interviews.filter(i => i.decision.nextRound === 'Si').length;
    const approvalRate = totalInterviews > 0 ? ((approvedCount / totalInterviews) * 100).toFixed(1) : 0;

    const totalInterviewsEl = document.getElementById('total-interviews');
    const averageScoreEl = document.getElementById('average-score');
    const approvalRateEl = document.getElementById('approval-rate');

    if(totalInterviewsEl) totalInterviewsEl.textContent = totalInterviews;
    if(averageScoreEl) averageScoreEl.textContent = averageScore;
    if(approvalRateEl) approvalRateEl.textContent = `${approvalRate}%`;


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

    document.getElementById('export-pdf-button').addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const dashboard = document.querySelector('.container');

        html2canvas(dashboard, {
            scale: 2, // Aumenta la resolución
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save("dashboard_indicadores.pdf");
        });
    });
});
