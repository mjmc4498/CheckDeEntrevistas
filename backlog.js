document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('interviews-table-body');
    const searchInput = document.getElementById('searchInput');
    const modalBody = document.getElementById('modal-body-content');
    const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
    let interviews = JSON.parse(localStorage.getItem('interviews')) || [];

    function renderTable(data) {
        tableBody.innerHTML = '';
        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="8" class="text-center">No hay registros para mostrar.</td></tr>';
            return;
        }
        data.forEach(interview => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${interview.candidateName}</td>
                <td>${interview.candidateRole}</td>
                <td>${new Date(interview.interviewDate).toLocaleDateString()}</td>
                <td>${interview.evaluatorName}</td>
                <td><span class="badge bg-primary">${interview.totalScore}</span></td>
                <td><span class="badge bg-info">${interview.suggestedLevel}</span></td>
                <td><span class="badge bg-secondary">${interview.tracking.processStatus}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary view-details" data-id="${interview.id}">Ver</button>
                    <button class="btn btn-sm btn-outline-secondary edit-record" data-id="${interview.id}">Editar</button>
                    <button class="btn btn-sm btn-outline-danger delete-record" data-id="${interview.id}">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function showDetails(id) {
        const interview = interviews.find(i => i.id == id);
        if (interview) {
            modalBody.innerHTML = `
                <h5>Datos Generales</h5>
                <p><strong>Candidato:</strong> ${interview.candidateName}</p>
                <p><strong>Rol:</strong> ${interview.candidateRole}</p>

                <h5>Dimensiones de Evaluación</h5>
                <ul>
                    <li>Conocimiento Técnico: ${interview.dimensions.conocimientoTecnico}/5</li>
                    <li>Resolución de Problemas: ${interview.dimensions.resolucionProblemas}/5</li>
                    <li>Comunicación: ${interview.dimensions.comunicacion}/5</li>
                    <li>Criterio Profesional: ${interview.dimensions.criterioProfesional}/5</li>
                    <li>Fit Cultural: ${interview.dimensions.fitCultural}/5</li>
                    <li>Motivación: ${interview.dimensions.motivacion}/5</li>
                </ul>

                <h5>Feedback</h5>
                <p><strong>Puntos Fuertes:</strong> ${interview.feedback.strongPoints}</p>
                <p><strong>Oportunidades de Mejora:</strong> ${interview.feedback.improvementOpportunities}</p>

                <h5>Decisión</h5>
                <p><strong>Recomendación:</strong> ${interview.decision.recommendation}</p>
            `;
            detailsModal.show();
        }
    }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredData = interviews.filter(i =>
            i.candidateName.toLowerCase().includes(query) ||
            i.candidateRole.toLowerCase().includes(query) ||
            i.evaluatorName.toLowerCase().includes(query)
        );
        renderTable(filteredData);
    });

    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details')) {
            const id = e.target.dataset.id;
            showDetails(id);
        } else if (e.target.classList.contains('delete-record')) {
            const id = e.target.dataset.id;
            if (confirm('¿Está seguro de que desea eliminar este registro?')) {
                interviews = interviews.filter(i => i.id != id);
                localStorage.setItem('interviews', JSON.stringify(interviews));
                renderTable(interviews);
            }
        } else if (e.target.classList.contains('edit-record')) {
            const id = e.target.dataset.id;
            window.location.href = `index.html?id=${id}`;
        }
    });

    renderTable(interviews);
});
