document.addEventListener('DOMContentLoaded', () => {
    loadSchedule();
});

const schedule = generateDummyGames(300);
const correctPassword = 'fightballadmin3';

function generateDummyGames(number) {
    const games = [];
    for (let i = 1; i <= number; i++) {
        games.push({
            game: i,
            date: `2024-06-${String(i % 30 + 1).padStart(2, '0')}`,
            time: `${String(i % 24).padStart(2, '0')}:00`,
            teams: `Team ${i % 20 + 1} vs Team ${i % 20 + 2}`,
            venue: `Court ${i % 10 + 1}`,
            result: ''
        });
    }
    return games;
}

function loadSchedule() {
    const tableBody = document.querySelector('#schedule-table tbody');
    tableBody.innerHTML = '';
    schedule.forEach((game) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${game.game}</td>
            <td>${game.date}</td>
            <td>${game.time}</td>
            <td>${game.teams}</td>
            <td>${game.venue}</td>
            <td>${game.result}</td>
        `;
        tableBody.appendChild(row);
    });
}

function showPasswordPrompt() {
    document.getElementById('password-modal').style.display = 'flex';
}

function closePasswordModal() {
    document.getElementById('password-modal').style.display = 'none';
}

function checkPassword() {
    const password = document.getElementById('password-input').value;
    if (password === correctPassword) {
        closePasswordModal();
        openEditSchedule();
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function openEditSchedule() {
    document.getElementById('edit-schedule-modal').style.display = 'flex';
    const tableBody = document.querySelector('#edit-schedule-table tbody');
    tableBody.innerHTML = '';
    schedule.forEach((game, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${game.game}</td>
            <td><input type="date" value="${game.date}"></td>
            <td><input type="time" value="${game.time}"></td>
            <td><input type="text" value="${game.teams}"></td>
            <td><input type="text" value="${game.venue}"></td>
            <td><input type="text" value="${game.result}"></td>
            <td><button class="secondary-btn" onclick="deleteGame(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function closeEditSchedule() {
    document.getElementById('edit-schedule-modal').style.display = 'none';
}

function saveSchedule() {
    const rows = document.querySelectorAll('#edit-schedule-table tbody tr');
    schedule.length = 0;
    rows.forEach((row) => {
        const game = {
            game: parseInt(row.cells[0].textContent, 10),
            date: row.cells[1].querySelector('input').value,
            time: row.cells[2].querySelector('input').value,
            teams: row.cells[3].querySelector('input').value,
            venue: row.cells[4].querySelector('input').value,
            result: row.cells[5].querySelector('input').value,
        };
        schedule.push(game);
    });
    closeEditSchedule();
    loadSchedule();
}

function deleteGame(index) {
    schedule.splice(index, 1);
    openEditSchedule();
}

function addNewGame() {
    const newGame = {
        game: schedule.length + 1,
        date: '',
        time: '',
        teams: '',
        venue: '',
        result: ''
    };
    schedule.push(newGame);
    openEditSchedule();
}
