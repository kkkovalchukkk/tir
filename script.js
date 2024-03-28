window.addEventListener('DOMContentLoaded', () => {
  const totalClicksEl = document.querySelector('.scores__shots');
  const totalScoresEl = document.querySelector('.scores__goals');
  const firstRoundEl = document.querySelector('.first-round');
  const secondRoundEl = document.querySelector('.second-round');
  const thirdRoundEl = document.querySelector('.third-round');
  const targetEls = document.querySelectorAll('.target');
  const firstScreenEl = document.querySelector('.first-run');
  const runGameBtnEl = document.querySelector('.first-run__btn');
  const loseScreenEl = document.querySelector('.lose');
  const loseBtnEl = document.querySelector('.lose__btn');
  const winScreenEl = document.querySelector('.win');
  const winBtnEl = document.querySelector('.win__btn');

  let totalClicks = 0;
  let totalShoots = 0;
  let isGamesStarted = false;
  let currentRound = 0;

  function resetClicksAndScores() {
    totalClicks = 0;
    totalShoots = 0;
    totalClicksEl.textContent = 0;
    totalScoresEl.textContent = 0;
  }

  function resetRounds() {
    firstRoundEl.classList.add('hidden');
    secondRoundEl.classList.add('hidden');
    thirdRoundEl.classList.add('hidden');
  }

  function getRandomPosition() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const randomX = Math.random() * (width - 142); // 30 - ширина элемента
    const randomY = Math.random() * (height - 142); // 30 - высота элемента
    return [randomX, randomY];
  }

  function createTarget() {
    const [x, y] = getRandomPosition();
    const target = document.createElement('div');
    target.classList.add('target');
    target.classList.add('third-round__target');
    target.style.left = x + 'px';
    target.style.top = y + 'px';
    thirdRoundEl.appendChild(target);
    setTimeout(() => {
      thirdRoundEl.querySelector('.target').classList.add('hidden');
      setTimeout(() => {
        thirdRoundEl.querySelector('.target').remove();
      }, 200);
    }, 500);
  }

  function getCursor() {
    const cursor = document.createElement('div');
    const cursorImg = document.createElement('img');
    cursorImg.src = './crosshair.svg';
    cursor.classList.add('custom-cursor');
    cursor.appendChild(cursorImg);
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function (e) {
      cursor.style.left = e.pageX - 96 / 2 + 'px';
      cursor.style.top = e.pageY - 96 / 2 + 'px';
    });

    document.body.style.cursor = 'none';
  }

  function showLoseScreen() {
    loseScreenEl.classList.remove('hidden');
  }

  function showWinScreen() {
    winScreenEl.classList.remove('hidden');
  }

  function hideWinScreen() {
    winScreenEl.classList.add('hidden');
  }

  function firstRoundLogic(e) {
    currentRound = 1;
    isGamesStarted = true;
    if (e.target.classList.contains('target')) {
      e.target.classList.add('hidden');
      totalShoots++;
    }

    totalClicks++;
    totalClicksEl.textContent = totalClicks;
    totalScoresEl.textContent = totalShoots;
    if (totalClicks >= 10) {
      isGamesStarted = false;
      stopGame();
      showLoseScreen();
    }

    if (totalShoots >= 6) {
      stopGame();
      showWinScreen();
    }
  }

  function secondRoundLogic(e) {
    currentRound = 2;
    isGamesStarted = true;

    if (e.target.classList.contains('target')) {
      e.target.classList.add('hidden');
      totalShoots++;
    }

    totalClicks++;
    totalClicksEl.textContent = totalClicks;
    totalScoresEl.textContent = totalShoots;
    if (totalClicks >= 10) {
      isGamesStarted = false;
      stopGame();
      showLoseScreen();
    }

    if (totalShoots >= 5) {
      stopGame();
      showWinScreen();
    }
  }

  function thirdRoundLogic(e) {
    currentRound = 3;
    isGamesStarted = true;

    if (e.target.classList.contains('target')) {
      e.target.classList.add('hidden');
      totalShoots++;
    }

    totalClicks++;
    totalClicksEl.textContent = totalClicks;
    totalScoresEl.textContent = totalShoots;
    if (totalClicks >= 10) {
      isGamesStarted = false;
      stopGame();
      showLoseScreen();
    }

    if (totalShoots >= 5) {
      stopGame();
      showWinScreen();
      winScreenEl.querySelector('.win__text').textContent =
        'Поздравляем! Ты выиграл!';
      winBtnEl.textContent = 'Еще раз?';
      winBtnEl.addEventListener('click', () => window.location.reload(), false);
    }
  }

  function goFirstRound() {
    hideWinScreen();
    window.addEventListener('click', firstRoundLogic);
  }

  function goSecondRound() {
    hideWinScreen();
    secondRoundEl.classList.remove('hidden');
    window.removeEventListener('click', firstRoundLogic);
    window.addEventListener('click', secondRoundLogic);
  }

  function goThirdRound() {
    hideWinScreen();
    resetClicksAndScores();
    thirdRoundEl.classList.remove('hidden');
    setInterval(createTarget, 500);
    window.removeEventListener('click', secondRoundLogic);
    window.addEventListener('click', thirdRoundLogic);
  }

  function startGame() {
    firstScreenEl.classList.add('hidden');
    setTimeout(() => {
      goFirstRound();
    }, 100);
  }

  function stopGame() {
    window.removeEventListener('click', firstRoundLogic);
    firstRoundEl.classList.add('hidden');
    resetClicksAndScores();
  }

  runGameBtnEl.addEventListener('click', startGame);
  loseBtnEl.addEventListener('click', () => window.location.reload());

  winBtnEl.addEventListener('click', () => {
    resetClicksAndScores();
    resetRounds();
    currentRound++;
    switch (currentRound) {
      case 2:
        setTimeout(() => {
          goSecondRound();
        }, 100);
        break;
      case 3:
        setTimeout(() => {
          goThirdRound();
        }, 100);
        break;

      default:
        break;
    }
  });

  getCursor();
  resetClicksAndScores();
});
