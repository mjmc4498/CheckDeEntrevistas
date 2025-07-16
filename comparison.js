document.addEventListener('DOMContentLoaded', () => {
    const selectionArea = document.getElementById('selection-area');
    const comparisonResults = document.getElementById('comparison-results');
    const interviews = JSON.parse(localStorage.getItem('interviews')) || [];
    const MAX_COMPARE = 3;

    function initializeSelectors() {
        for (let i = 1; i <= MAX_COMPARE; i++) {
            const col = document.createElement('div');
            col.className = 'col-md-4';

            const select = document.createElement('select');
            select.className = 'form-select';
            select.id = `select-candidate-${i}`;
            select.innerHTML = '<option selected>Seleccionar Candidato...</option>';

            interviews.forEach(interview => {
                const option = document.createElement('option');
                option.value = interview.id;
                option.textContent = interview.candidateName;
                select.appendChild(option);
            });

            select.addEventListener('change', renderComparison);
            col.appendChild(select);
            selectionArea.appendChild(col);
        }
    }

    function renderComparison() {
        comparisonResults.innerHTML = '';
        const selectedIds = [];

        for (let i = 1; i <= MAX_COMPARE; i++) {
            const select = document.getElementById(`select-candidate-${i}`);
            if (select.value && select.value !== 'Seleccionar Candidato...') {
                selectedIds.push(parseInt(select.value));
            }
        }

        const selectedInterviews = interviews.filter(i => selectedIds.includes(i.id));

        selectedInterviews.forEach(interview => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5>${interview.candidateName}</h5>
                        <small class="text-muted">${interview.candidateRole}</small>
                    </div>
                    <div class="card-body">
                        <p><strong>Puntaje Total:</strong> <span class="badge bg-primary">${interview.totalScore}</span></p>
                        <p><strong>Nivel Sugerido:</strong> <span class="badge bg-info">${interview.suggestedLevel}</span></p>
                        <hr>
                        <h6>Dimensiones</h6>
                        <ul>
                            <li>Conocimiento Técnico: ${interview.dimensions.conocimientoTecnico}/5</li>
                            <li>Resolución de Problemas: ${interview.dimensions.resolucionProblemas}/5</li>
                            <li>Comunicación: ${interview.dimensions.comunicacion}/5</li>
                            <li>Criterio Profesional: ${interview.dimensions.criterioProfesional}/5</li>
                            <li>Fit Cultural: ${interview.dimensions.fitCultural}/5</li>
                            <li>Motivación: ${interview.dimensions.motivacion}/5</li>
                        </ul>
                        <hr>
                        <h6>Decisión</h6>
                        <p><strong>Recomendación:</strong> ${interview.decision.recommendation}</p>
                    </div>
                </div>
            `;
            comparisonResults.appendChild(col);
        });
    }

    initializeSelectors();
});
