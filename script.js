document.addEventListener('DOMContentLoaded', () => {
    const addSkillBtn = document.querySelector('.btn-add-skill');
    const skillsSection = document.querySelector('.skills-section');
    const form = document.querySelector('.neumorphism-form');

    // Function to add a new skill input group
    const addSkill = () => {
        const skillId = Date.now();
        const skillGroup = document.createElement('div');
        skillGroup.classList.add('skill-group');
        skillGroup.setAttribute('data-id', skillId);
        skillGroup.innerHTML = `
            <input type="text" class="skill-name" placeholder="Nombre de la competencia" required>
            <input type="number" class="skill-score" min="1" max="10" placeholder="Puntaje (1-10)" required>
            <button type="button" class="btn-remove-skill">&times;</button>
        `;
        skillsSection.appendChild(skillGroup);

        // Add event listener to the new remove button
        skillGroup.querySelector('.btn-remove-skill').addEventListener('click', () => {
            removeSkill(skillId);
        });
    };

    // Function to remove a skill input group
    const removeSkill = (id) => {
        const skillGroup = document.querySelector(`.skill-group[data-id='${id}']`);
        if (skillGroup) {
            skillGroup.remove();
        }
    };

    // Event listener for adding a skill
    addSkillBtn.addEventListener('click', addSkill);

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather skills data
        const skills = [];
        const skillGroups = document.querySelectorAll('.skill-group');
        let totalScore = 0;

        skillGroups.forEach(group => {
            const name = group.querySelector('.skill-name').value;
            const score = parseInt(group.querySelector('.skill-score').value);
            if (name && score) {
                skills.push({ name, score });
                totalScore += score;
            }
        });

        // Determine suggested level
        let suggestedLevel = 'Junior';
        if (totalScore >= 35) {
            suggestedLevel = 'Senior';
        } else if (totalScore >= 21) {
            suggestedLevel = 'Semi Senior';
        }

        // Gather all form data
        const interviewData = {
            candidateName: document.getElementById('candidate-name').value,
            evaluatorName: document.getElementById('evaluator-name').value,
            interviewDate: document.getElementById('interview-date').value,
            interviewTime: document.getElementById('interview-time').value,
            candidateRole: document.getElementById('candidate-role').value,
            skills,
            totalScore,
            suggestedLevel,
            additionalNotes: document.getElementById('additional-notes').value,
        };

        // Save to localStorage
        let interviews = JSON.parse(localStorage.getItem('interviews')) || [];
        interviews.push(interviewData);
        localStorage.setItem('interviews', JSON.stringify(interviews));

        // Display results
        displayResults(interviewData);

        // Reset form
        form.reset();
        skillsSection.innerHTML = '';
    });

    // Function to display results
    const displayResults = (data) => {
        let resultsContainer = document.querySelector('.results-container');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.classList.add('results-container');
            form.insertAdjacentElement('afterend', resultsContainer);
        }

        resultsContainer.innerHTML = `
            <h2>Resultados de la Evaluación</h2>
            <p><strong>Puntaje Total:</strong> ${data.totalScore}</p>
            <p><strong>Nivel Sugerido:</strong> ${data.suggestedLevel}</p>
        `;
    };
});
