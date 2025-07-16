document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('interviews-table-body');
    const searchInput = document.getElementById('searchInput');
    const modalBody = document.getElementById('modal-body-content');
    const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
    let interviews = JSON.parse(localStorage.getItem('interviews')) || [];

    function renderTable(data) {
        tableBody.innerHTML = '';
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
                    <button class="btn btn-sm btn-outline-primary view-details" data-id="${interview.id}">Ver Detalles</button>
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
        }
    });

    document.getElementById('export-button').addEventListener('click', () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        const headers = [
            "ID", "Nombre Candidato", "Nombre Evaluador", "Fecha Entrevista", "Hora Entrevista", "Rol", "Puntaje Total", "Nivel Sugerido",
            "Conocimiento Técnico", "Resolución de Problemas", "Comunicación", "Criterio Profesional", "Fit Cultural", "Motivación",
            "Prueba Técnica Aplicada", "Resultado Prueba", "Herramientas",
            "Puntos Fuertes", "Oportunidades de Mejora", "Comentarios Adicionales",
            "Pasa a Siguiente Ronda", "Recomendación", "Nivel Detectado", "Alineamiento con Rol",
            "Estado del Proceso", "Link CV", "Link Grabación", "Usuario que Registró", "Fecha de Registro"
        ];
        csvContent += headers.join(",") + "\r\n";

        interviews.forEach(interview => {
            const row = [
                interview.id,
                `"${interview.candidateName}"`,
                `"${interview.evaluatorName}"`,
                interview.interviewDate,
                interview.interviewTime,
                `"${interview.candidateRole}"`,
                interview.totalScore,
                `"${interview.suggestedLevel}"`,
                interview.dimensions.conocimientoTecnico,
                interview.dimensions.resolucionProblemas,
                interview.dimensions.comunicacion,
                interview.dimensions.criterioProfesional,
                interview.dimensions.fitCultural,
                interview.dimensions.motivacion,
                `"${interview.technicalTest.applied}"`,
                `"${interview.technicalTest.result.replace(/"/g, '""')}"`,
                `"${interview.technicalTest.tools}"`,
                `"${interview.feedback.strongPoints.replace(/"/g, '""')}"`,
                `"${interview.feedback.improvementOpportunities.replace(/"/g, '""')}"`,
                `"${interview.feedback.additionalComments.replace(/"/g, '""')}"`,
                `"${interview.decision.nextRound}"`,
                `"${interview.decision.recommendation}"`,
                `"${interview.decision.detectedLevel}"`,
                `"${interview.decision.roleAlignment}"`,
                `"${interview.tracking.processStatus}"`,
                `"${interview.tracking.cvLink}"`,
                `"${interview.tracking.recordingLink}"`,
                `"${interview.tracking.registeredBy}"`,
                interview.tracking.registrationDate
            ];
            csvContent += row.join(",") + "\r\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "registros_entrevistas.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    renderTable(interviews);
});
