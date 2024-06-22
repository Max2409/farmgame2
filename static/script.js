document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', () => {
        square.classList.toggle('brown');
        fetch('/click', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: square.getAttribute('data-user-id') })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('level').textContent = data.level;
            document.getElementById('experience').textContent = data.experience;
        });
    });
});
