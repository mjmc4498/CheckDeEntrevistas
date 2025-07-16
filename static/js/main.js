document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('checkbox');
    if (themeSwitch) {
        // Function to set the theme
        const setTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeSwitch.checked = theme === 'dark';
        };

        // Check for saved theme in local storage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }

        themeSwitch.addEventListener('change', function(event) {
            if (event.target.checked) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        });
    }

    const addSkillButton = document.getElementById('add-skill');
    const technicalSkillsDiv = document.getElementById('technical-skills');
    const interviewForm = document.getElementById('interview-form');
    let skillCount = 0;

    if (addSkillButton) {
        addSkillButton.addEventListener('click', function() {
            skillCount++;
            const skillDiv = document.createElement('div');
            skillDiv.classList.add('form-group', 'skill-group');
            skillDiv.innerHTML = `
                <label for="skill-name-${skillCount}">Competencia:</label>
                <input type="text" id="skill-name-${skillCount}" class="skill-name" required>
                <label for="skill-score-${skillCount}">Puntaje (1-10):</label>
                <input type="number" id="skill-score-${skillCount}" class="skill-score" min="1" max="10" required>
                <button type="button" class="remove-skill">Eliminar</button>
            `;
            technicalSkillsDiv.appendChild(skillDiv);
        });
    }

    if (technicalSkillsDiv) {
        technicalSkillsDiv.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-skill')) {
                e.target.parentElement.remove();
            }
        });
    }

    if (interviewForm) {
        interviewForm.addEventListener('submit', function(e) {
            e.preventDefault();

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

            const interviewData = {
                candidateName: document.getElementById('candidate-name').value,
                evaluatorName: document.getElementById('evaluator-name').value,
                interviewDate: document.getElementById('interview-date').value,
                skills: skills,
                totalScore: totalScore,
                suggestedLevel: level,
                additionalNotes: document.getElementById('additional-notes').value
            };

            let interviews = JSON.parse(localStorage.getItem('interviews')) || [];
            interviews.push(interviewData);
            localStorage.setItem('interviews', JSON.stringify(interviews));

            alert('Entrevista guardada exitosamente!');
            interviewForm.reset();
            technicalSkillsDiv.innerHTML = '';
        });
    }
});
