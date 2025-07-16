document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('interview-form');

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
            id: Date.now(),
            // Datos Generales
            candidateName: document.getElementById('candidateName').value,
            evaluatorName: document.getElementById('evaluatorName').value,
            interviewDate: document.getElementById('interviewDate').value,
            interviewTime: document.getElementById('interviewTime').value,
            candidateRole: document.getElementById('candidateRole').value,
            totalScore: totalScore,
            suggestedLevel: suggestedLevel,
            // Dimensiones de Evaluación
            dimensions: {
                conocimientoTecnico: document.getElementById('conocimientoTecnico').value,
                resolucionProblemas: document.getElementById('resolucionProblemas').value,
                comunicacion: document.getElementById('comunicacion').value,
                criterioProfesional: document.getElementById('criterioProfesional').value,
                fitCultural: document.getElementById('fitCultural').value,
                motivacion: document.getElementById('motivacion').value,
            },
            // Evaluación Técnica
            technicalTest: {
                applied: document.querySelector('input[name="pruebaTecnica"]:checked').value,
                result: document.getElementById('resultadoPrueba').value,
                tools: document.getElementById('herramientas').value,
            },
            // Feedback del Entrevistador
            feedback: {
                strongPoints: document.getElementById('puntosFuertes').value,
                improvementOpportunities: document.getElementById('oportunidadesMejora').value,
                additionalComments: document.getElementById('comentariosAdicionales').value,
            },
            // Decisión y Avance
            decision: {
                nextRound: document.getElementById('pasaRonda').value,
                recommendation: document.getElementById('recomendacion').value,
                detectedLevel: document.getElementById('nivelDetectado').value,
                roleAlignment: document.getElementById('alineamientoRol').value,
            },
            // Trazabilidad del Registro
            tracking: {
                processStatus: document.getElementById('estadoProceso').value,
                cvLink: document.getElementById('linkCV').value,
                recordingLink: document.getElementById('linkGrabacion').value,
                registeredBy: document.getElementById('usuarioRegistro').value,
                registrationDate: new Date().toISOString(),
            }
        };

        // Guardar en localStorage
        let interviews = JSON.parse(localStorage.getItem('interviews')) || [];
        interviews.push(interviewData);
        localStorage.setItem('interviews', JSON.stringify(interviews));

        // Resetear formulario y mostrar alerta
        form.reset();
        alert('Registro de entrevista guardado exitosamente!');
    });
});
