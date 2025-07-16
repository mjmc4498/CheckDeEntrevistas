document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('interview-form');
    const urlParams = new URLSearchParams(window.location.search);
    const interviewId = urlParams.get('id');
    let interviews = JSON.parse(localStorage.getItem('interviews')) || [];

    if (interviewId) {
        const interview = interviews.find(i => i.id == interviewId);
        if (interview) {
            // Pre-fill form
            document.getElementById('candidateName').value = interview.candidateName;
            document.getElementById('evaluatorName').value = interview.evaluatorName;
            document.getElementById('interviewDate').value = interview.interviewDate;
            document.getElementById('interviewTime').value = interview.interviewTime;
            document.getElementById('candidateRole').value = interview.candidateRole;

            document.getElementById('conocimientoTecnico').value = interview.dimensions.conocimientoTecnico;
            document.getElementById('resolucionProblemas').value = interview.dimensions.resolucionProblemas;
            document.getElementById('comunicacion').value = interview.dimensions.comunicacion;
            document.getElementById('criterioProfesional').value = interview.dimensions.criterioProfesional;
            document.getElementById('fitCultural').value = interview.dimensions.fitCultural;
            document.getElementById('motivacion').value = interview.dimensions.motivacion;

            if(interview.technicalTest.applied === 'Si') {
                document.getElementById('pruebaTecnicaSi').checked = true;
            } else {
                document.getElementById('pruebaTecnicaNo').checked = true;
            }
            document.getElementById('resultadoPrueba').value = interview.technicalTest.result;
            document.getElementById('herramientas').value = interview.technicalTest.tools;

            document.getElementById('puntosFuertes').value = interview.feedback.strongPoints;
            document.getElementById('oportunidadesMejora').value = interview.feedback.improvementOpportunities;
            document.getElementById('comentariosAdicionales').value = interview.feedback.additionalComments;

            document.getElementById('pasaRonda').value = interview.decision.nextRound;
            document.getElementById('recomendacion').value = interview.decision.recommendation;
            document.getElementById('nivelDetectado').value = interview.decision.detectedLevel;
            document.getElementById('alineamientoRol').value = interview.decision.roleAlignment;

            document.getElementById('estadoProceso').value = interview.tracking.processStatus;
            document.getElementById('linkCV').value = interview.tracking.cvLink;
            document.getElementById('linkGrabacion').value = interview.tracking.recordingLink;
            document.getElementById('usuarioRegistro').value = interview.tracking.registeredBy;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Calcular puntaje total de dimensiones
        const dimensiones = [
            parseInt(document.getElementById('conocimientoTecnico').value),
            parseInt(document.getElementById('resolucionProblemas').value),
            parseInt(document.getElementById('comunicacion').value),
            parseInt(document.getElementById('criterioProfesional').value),
            parseInt(document.getElementById('fitCultural').value),
            parseInt(document.getElementById('motivacion').value),
        ];
        const totalScore = dimensiones.reduce((acc, score) => acc + score, 0);

        // Determinar nivel sugerido
        let suggestedLevel = 'Junior';
        if (totalScore >= 25) {
            suggestedLevel = 'Senior';
        } else if (totalScore >= 15) {
            suggestedLevel = 'Semi Senior';
        }

        const interviewData = {
            id: interviewId ? parseInt(interviewId) : Date.now(),
            candidateName: document.getElementById('candidateName').value,
            evaluatorName: document.getElementById('evaluatorName').value,
            interviewDate: document.getElementById('interviewDate').value,
            interviewTime: document.getElementById('interviewTime').value,
            candidateRole: document.getElementById('candidateRole').value,
            totalScore: totalScore,
            suggestedLevel: suggestedLevel,
            dimensions: {
                conocimientoTecnico: document.getElementById('conocimientoTecnico').value,
                resolucionProblemas: document.getElementById('resolucionProblemas').value,
                comunicacion: document.getElementById('comunicacion').value,
                criterioProfesional: document.getElementById('criterioProfesional').value,
                fitCultural: document.getElementById('fitCultural').value,
                motivacion: document.getElementById('motivacion').value,
            },
            technicalTest: {
                applied: document.querySelector('input[name="pruebaTecnica"]:checked').value,
                result: document.getElementById('resultadoPrueba').value,
                tools: document.getElementById('herramientas').value,
            },
            feedback: {
                strongPoints: document.getElementById('puntosFuertes').value,
                improvementOpportunities: document.getElementById('oportunidadesMejora').value,
                additionalComments: document.getElementById('comentariosAdicionales').value,
            },
            decision: {
                nextRound: document.getElementById('pasaRonda').value,
                recommendation: document.getElementById('recomendacion').value,
                detectedLevel: document.getElementById('nivelDetectado').value,
                roleAlignment: document.getElementById('alineamientoRol').value,
            },
            tracking: {
                processStatus: document.getElementById('estadoProceso').value,
                cvLink: document.getElementById('linkCV').value,
                recordingLink: document.getElementById('linkGrabacion').value,
                registeredBy: document.getElementById('usuarioRegistro').value,
                registrationDate: interviewId ? interviews.find(i=>i.id==interviewId).tracking.registrationDate : new Date().toISOString(),
            }
        };

        if (interviewId) {
            // Update existing record
            const index = interviews.findIndex(i => i.id == interviewId);
            interviews[index] = interviewData;
        } else {
            // Add new record
            interviews.push(interviewData);
        }

        localStorage.setItem('interviews', JSON.stringify(interviews));

        // Resetear formulario y redirigir
        form.reset();
        alert('Registro guardado exitosamente!');
        window.location.href = 'backlog.html';
    });
});
