document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.square');
    const levelDisplay = document.getElementById('level');
    let userId = 1;  // Для тестирования. В реальном приложении получите userId от Telegram API.
    let level = 1;
    let experience = 0;

    squares.forEach(square => {
        square.addEventListener('click', () => {
            square.classList.add('brown');
            addExperience(userId, 50);
        });
    });

    function addExperience(userId, exp) {
        experience += exp;
        level = calculateLevel(experience);
        levelDisplay.textContent = `Уровень: ${level}`;
        
        fetch('/click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId }),
        })
        .then(response => response.json())
        .then(data => {
            levelDisplay.textContent = `Уровень: ${data.level}`;
        })
        .catch(error => console.error('Error:', error));
    }

    function calculateLevel(exp) {
        let level = 1;
        let requiredExp = 100;
        while (exp >= requiredExp) {
            exp -= requiredExp;
            level++;
            requiredExp += 100;
        }
        return level;
    }
});
