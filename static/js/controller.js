class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Initial setup
        this.onThemeChanged(localStorage.getItem('theme') || 'light');
        this.onInterviewsChanged(this.model.getInterviews());
        this.onDashboardChanged();

        // Bind view handlers
        this.view.bindAddSkill(this.handleAddSkill);
        this.view.bindRemoveSkill(this.handleRemoveSkill);
        this.view.bindSubmitForm(this.handleSubmitForm);
        this.view.bindFilter(this.handleFilter);
        this.view.bindSort(this.handleSort);
        this.view.bindExport(this.handleExport);
        this.view.bindThemeSwitch(this.handleThemeSwitch);
    }

    onInterviewsChanged = (interviews) => {
        this.view.renderTable(interviews);
    };

    onDashboardChanged = () => {
        const levelCounts = this.model.getLevelCounts();
        const lastInterview = this.model.getLastInterview();
        this.view.renderLevelDistributionChart(levelCounts);
        this.view.renderRadarChart(lastInterview);
    };

    onThemeChanged = (theme) => {
        this.view.setTheme(theme);
    }

    handleAddSkill = () => {
        this.view.appendSkill(Date.now());
    };

    handleRemoveSkill = (skillGroup) => {
        this.view.removeSkill(skillGroup);
    };

    handleSubmitForm = () => {
        const formData = this.view.getFormData();
        this.model.addInterview(formData);
        this.view.resetForm();
        alert('Entrevista guardada exitosamente!');
    };

    handleFilter = (query) => {
        const interviews = this.model.getInterviews();
        const lowerCaseQuery = query.toLowerCase();
        const filtered = interviews.filter(interview => {
            return Object.values(interview).some(value =>
                String(value).toLowerCase().includes(lowerCaseQuery)
            );
        });
        this.onInterviewsChanged(filtered);
    };

    handleSort = (column) => {
        // This is a simplified sort. A more robust implementation would be needed for production.
        const interviews = this.model.getInterviews();
        const sorted = interviews.sort((a, b) => {
            if (a[column] < b[column]) return -1;
            if (a[column] > b[column]) return 1;
            return 0;
        });
        this.onInterviewsChanged(sorted);
    };

    handleExport = () => {
        const interviews = this.model.getInterviews();
        const headers = ['Candidate Name', 'Evaluator Name', 'Date', 'Time', 'Role', 'Total Score', 'Suggested Level'];
        const rows = interviews.map(i => [i.candidateName, i.evaluatorName, i.interviewDate, i.interviewTime, i.candidateRole, i.totalScore, i.suggestedLevel]);
        let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "interviews.csv");
        document.body.appendChild(link);
        link.click();
    };

    handleThemeSwitch = (isChecked) => {
        const theme = isChecked ? 'dark' : 'light';
        this.onThemeChanged(theme);
        localStorage.setItem('theme', theme);
    }
}

export default Controller;
