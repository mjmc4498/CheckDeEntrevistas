document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#interviews-table tbody');
    const searchInput = document.getElementById('search-input');
    const exportButton = document.getElementById('export-csv');
    let interviews = JSON.parse(localStorage.getItem('interviews')) || [];

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(interview => {
            const row = document.createElement('tr');
            const indicators = interview.indicators;
            const attitudeScore = indicators ? Object.values(indicators).reduce((acc, category) => {
                return acc + Object.values(category).reduce((sum, value) => sum + parseInt(value), 0);
            }, 0) : 0;

            row.innerHTML = `
                <td>${interview.candidateName}</td>
                <td>${interview.evaluatorName}</td>
                <td>${interview.interviewDate}</td>
                <td>${interview.interviewTime}</td>
                <td>${interview.candidateRole}</td>
                <td>${interview.totalScore}</td>
                <td>${attitudeScore}</td>
                <td>${interview.suggestedLevel}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function filterData(query) {
        const lowerCaseQuery = query.toLowerCase();
        return interviews.filter(interview => {
            return Object.values(interview).some(value => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(lowerCaseQuery);
                }
                if (typeof value === 'number') {
                    return value.toString().includes(lowerCaseQuery);
                }
                return false;
            });
        });
    }

    function exportToCsv() {
        const headers = ['Candidato', 'Evaluador', 'Fecha', 'Hora', 'Rol', 'Puntaje Técnico', 'Puntaje Actitudinal', 'Nivel Sugerido'];
        const rows = interviews.map(i => {
            const indicators = i.indicators;
            const attitudeScore = indicators ? Object.values(indicators).reduce((acc, category) => {
                return acc + Object.values(category).reduce((sum, value) => sum + parseInt(value), 0);
            }, 0) : 0;
            return [i.candidateName, i.evaluatorName, i.interviewDate, i.interviewTime, i.candidateRole, i.totalScore, attitudeScore, i.suggestedLevel];
        });
        let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "registros_entrevistas.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    if(searchInput) searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        const filteredData = filterData(query);
        renderTable(filteredData);
    });

    if(exportButton) exportButton.addEventListener('click', exportToCsv);

    renderTable(interviews);
});
