class View {
    constructor() {
        this.app = this.getElement('#root');

        // Form elements
        this.form = this.getElement('#interview-form');
        this.addSkillButton = this.getElement('#add-skill');
        this.technicalSkillsDiv = this.getElement('#technical-skills');

        // Backlog elements
        this.tableBody = this.getElement('#interviews-table tbody');
        this.filterInput = this.getElement('#filter-input');
        this.exportButton = this.getElement('#export-csv');
        this.headers = document.querySelectorAll('#interviews-table th');

        // Dashboard elements
        this.levelDistributionCtx = this.getElement('#level-distribution-chart') ? this.getElement('#level-distribution-chart').getContext('2d') : null;
        this.radarCtx = this.getElement('#radar-chart') ? this.getElement('#radar-chart').getContext('2d') : null;

        // Theme switch
        this.themeSwitch = this.getElement('#checkbox');
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    renderTable(data) {
        if (!this.tableBody) return;
        this.tableBody.innerHTML = '';
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
            this.tableBody.appendChild(row);
        });
    }

    renderLevelDistributionChart(levelCounts) {
        if (!this.levelDistributionCtx) return;
        new Chart(this.levelDistributionCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(levelCounts),
                datasets: [{
                    label: 'Número de Candidatos',
                    data: Object.values(levelCounts),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
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

    renderRadarChart(lastInterview) {
        if (!this.radarCtx || !lastInterview) return;
        const radarLabels = lastInterview.skills.map(s => s.name);
        const radarData = lastInterview.skills.map(s => s.score);

        new Chart(this.radarCtx, {
            type: 'radar',
            data: {
                labels: radarLabels,
                datasets: [{
                    label: `Perfil de ${lastInterview.candidateName}`,
                    data: radarData,
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }]
            }
        });
    }

    bindAddSkill(handler) {
        if (this.addSkillButton) {
            this.addSkillButton.addEventListener('click', () => {
                handler();
            });
        }
    }

    bindRemoveSkill(handler) {
        if (this.technicalSkillsDiv) {
            this.technicalSkillsDiv.addEventListener('click', event => {
                if (event.target.className === 'remove-skill') {
                    const skillGroup = event.target.parentElement;
                    handler(skillGroup);
                }
            });
        }
    }

    bindSubmitForm(handler) {
        if (this.form) {
            this.form.addEventListener('submit', event => {
                event.preventDefault();
                handler();
            });
        }
    }

    bindFilter(handler) {
        if (this.filterInput) {
            this.filterInput.addEventListener('input', event => {
                handler(event.target.value);
            });
        }
    }

    bindSort(handler) {
        if (this.headers) {
            this.headers.forEach(header => {
                header.addEventListener('click', () => {
                    const column = header.dataset.sort;
                    handler(column);
                });
            });
        }
    }

    bindExport(handler) {
        if (this.exportButton) {
            this.exportButton.addEventListener('click', () => {
                handler();
            });
        }
    }

    bindThemeSwitch(handler) {
        if (this.themeSwitch) {
            this.themeSwitch.addEventListener('change', event => {
                handler(event.target.checked);
            });
        }
    }

    appendSkill(skillCount) {
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('form-group', 'skill-group');
        skillDiv.innerHTML = `
            <label for="skill-name-${skillCount}">Competencia:</label>
            <input type="text" id="skill-name-${skillCount}" class="skill-name" required>
            <label for="skill-score-${skillCount}">Puntaje (1-10):</label>
            <input type="number" id="skill-score-${skillCount}" class="skill-score" min="1" max="10" required>
            <button type="button" class="remove-skill">Eliminar</button>
        `;
        this.technicalSkillsDiv.appendChild(skillDiv);
    }

    removeSkill(skillGroup) {
        skillGroup.remove();
    }

    getFormData() {
        const skills = [];
        const skillGroups = document.querySelectorAll('.skill-group');
        let totalScore = 0;

        skillGroups.forEach(group => {
            const name = group.querySelector('.skill-name').value;
            const score = parseInt(group.querySelector('.skill-score').value);
            skills.push({ name, score });
            totalScore += score;
        });

        let level = 'Junior';
        if (totalScore >= 35) {
            level = 'Senior';
        } else if (totalScore >= 21) {
            level = 'Semi Senior';
        }

        return {
            candidateName: this.getElement('#candidate-name').value,
            evaluatorName: this.getElement('#evaluator-name').value,
            interviewDate: this.getElement('#interview-date').value,
            interviewTime: this.getElement('#interview-time').value,
            candidateRole: this.getElement('#candidate-role').value,
            skills: skills,
            totalScore: totalScore,
            suggestedLevel: level,
            additionalNotes: this.getElement('#additional-notes').value
        };
    }

    resetForm() {
        if (this.form) {
            this.form.reset();
            this.technicalSkillsDiv.innerHTML = '';
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (this.themeSwitch) {
            this.themeSwitch.checked = theme === 'dark';
        }
    }
}

export default View;
