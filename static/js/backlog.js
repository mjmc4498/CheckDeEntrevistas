document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#interviews-table tbody');
    const filterInput = document.getElementById('filter-input');
    const exportButton = document.getElementById('export-csv');
    const headers = document.querySelectorAll('#interviews-table th');
    let interviews = JSON.parse(localStorage.getItem('interviews')) || [];
    let sortColumn = '';
    let sortDirection = 'asc';

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(interview => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${interview.candidateName}</td>
                <td>${interview.evaluatorName}</td>
                <td>${interview.interviewDate}</td>
                <td>${interview.totalScore}</td>
                <td>${interview.suggestedLevel}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function sortData(data, column, direction) {
        return data.sort((a, b) => {
            const valA = a[column];
            const valB = b[column];
            if (valA < valB) return direction === 'asc' ? -1 : 1;
            if (valA > valB) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    function filterData(data, query) {
        const lowerCaseQuery = query.toLowerCase();
        return data.filter(interview => {
            return Object.values(interview).some(value =>
                String(value).toLowerCase().includes(lowerCaseQuery)
            );
        });
    }

    function exportToCsv(data) {
        const headers = ['Candidate Name', 'Evaluator Name', 'Date', 'Total Score', 'Suggested Level'];
        const rows = data.map(i => [i.candidateName, i.evaluatorName, i.interviewDate, i.totalScore, i.suggestedLevel]);
        let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "interviews.csv");
        document.body.appendChild(link);
        link.click();
    }

    renderTable(interviews);

    if (filterInput) {
        filterInput.addEventListener('input', (e) => {
            const query = e.target.value;
            const filtered = filterData(interviews, query);
            renderTable(filtered);
        });
    }

    if (exportButton) {
        exportButton.addEventListener('click', () => {
            exportToCsv(interviews);
        });
    }

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.sort;
            if (sortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'asc';
            }
            const sorted = sortData(interviews, sortColumn, sortDirection);
            renderTable(sorted);
        });
    });
});
