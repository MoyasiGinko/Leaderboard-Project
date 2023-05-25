import './style.css';

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const gameId = 'hVP6NCUqQoKaqSViTvF8';
const leaderboardElement = document.querySelector('.lists');

const addScore = async (user, score) => {
  try {
    const response = await fetch(`${apiUrl}/games/${gameId}/scores/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, score }),
    });
    const data = await response.json();
    console.log(data.result);
  } catch (error) {
    console.error('Error adding score:', error);
  }
};

const getScores = async () => {
  try {
    const response = await fetch(`${apiUrl}/games/${gameId}/scores/`);
    const data = await response.json();
    return data.result.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Error getting scores:', error);
    return [];
  }
};

const updateLeaderboard = (scores) => {
  leaderboardElement.innerHTML = '';

  scores.forEach((score) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>${score.user}: </span><span>${score.score}</span>`;
    leaderboardElement.appendChild(listItem);
  });
};

const handleRefresh = async () => {
  const scores = await getScores();
  updateLeaderboard(scores);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('nameInput');
  const scoreInput = document.getElementById('scoreInput');

  // Add the score to the game
  await addScore(nameInput.value, scoreInput.value);

  // Get the updated scores
  const scores = await getScores();
  updateLeaderboard(scores);

  // Clear the input fields
  nameInput.value = '';
  scoreInput.value = '';
};

const refreshButton = document.querySelector('.ref-btn');
refreshButton.addEventListener('click', handleRefresh);

const submitButton = document.querySelector('.sub-btn');
submitButton.addEventListener('click', handleSubmit);

handleRefresh();
