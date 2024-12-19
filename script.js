const countdownList = document.getElementById('countdown-list');
const addCountdownButton = document.getElementById('add-countdown');

let countdownCount = 0;

function createCountdown() {
  const desiredTimeMinutes = prompt("Enter Desired Countdown Time in Minutes ( Numbers only ) :");

  if (desiredTimeMinutes) {
    if (isNaN(parseInt(desiredTimeMinutes))) {
      alert("Please Enter a Number for the Countdown Time.");
      return;
    }

    const desiredTimeInSeconds = parseInt(desiredTimeMinutes) * 60;
    const countdownId = `countdown-${countdownCount}`;
    const countdownElement = document.createElement('div');
    countdownElement.classList.add('countdown');
    countdownElement.innerHTML = `
    <div class="content">
        <span id="${countdownId}-display">00:00</span>
      <div class="countdown-buttons">
        <button id="${countdownId}-start-pause">Start</button>
        <button id="${countdownId}-reset">Reset</button>
        <button id="${countdownId}-add-time">Add Time</button>
        <button id="${countdownId}-delete">Delete</button>
      </div>
    </div>
    `;
    countdownList.appendChild(countdownElement);

    const countdownDisplay = document.getElementById(`${countdownId}-display`);
    const startPauseButton = document.getElementById(`${countdownId}-start-pause`);
    const resetButton = document.getElementById(`${countdownId}-reset`);
    const addTimeButton = document.getElementById(`${countdownId}-add-time`);
    const deleteButton = document.getElementById(`${countdownId}-delete`);

    let intervalId;
    let timeLeft = desiredTimeInSeconds * 1000;
    let isPaused = false;

    function updateCountdown() {
      if (!isPaused && timeLeft > 0) {
        timeLeft -= 1000;
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        countdownDisplay.textContent = formattedTime;
      } else if (timeLeft <= 0) {
        clearInterval(intervalId);
        startPauseButton.textContent = "Start";

        const audio = new Audio('./sound/mixkit-alarm-clock-beep-988.wav');
        audio.play();
      }
    }

    function startPauseCountdown() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        startPauseButton.textContent = 'Start';
      } else {
        intervalId = setInterval(updateCountdown, 1000);
        startPauseButton.textContent = 'Pause';
      }
    }

    function resetCountdown() {
      clearInterval(intervalId);
      timeLeft = desiredTimeInSeconds * 1000;
      updateCountdown();
      isPaused = false;
      startPauseButton.textContent = 'Start';
    }

    updateCountdown();
    startPauseButton.addEventListener('click', startPauseCountdown);
    resetButton.addEventListener('click', resetCountdown);
    addTimeButton.addEventListener('click', () => {
      const additionalTimeMinutes = prompt("Enter additional time in minutes (numbers only):");
      if (additionalTimeMinutes) {
        if (isNaN(parseInt(additionalTimeMinutes))) {
          alert("Please enter a number for the additional time.");
          return;
        }
        const additionalTimeInSeconds = parseInt(additionalTimeMinutes) * 60;
        timeLeft += additionalTimeInSeconds * 1000;
        updateCountdown();
      }
    });
    deleteButton.addEventListener('click', () => {
      countdownList.removeChild(countdownElement);
    });

    countdownCount++;
  }
}

addCountdownButton.addEventListener('click', createCountdown);