document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#interviews-table tbody');
    const interviews = JSON.parse(localStorage.getItem('interviews')) || [];

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(interview => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${interview.candidateName}</td>
                <td>${interview.evaluatorName}</td>
                <td>${interview.interviewDate}</td>
                <td>${interview.interviewTime}</td>
                <td>${interview.candidateRole}</td>
                <td>${interview.totalScore}</td>
                <td>${interview.suggestedLevel}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderTable(interviews);
});
