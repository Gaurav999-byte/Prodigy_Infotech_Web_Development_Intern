let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    startStopButton.textContent = "Pause";
    startStopButton.style.background = "#ffcc00";
    isRunning = true;
}

function pauseStopwatch() {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    startStopButton.textContent = "Resume";
    startStopButton.style.background = "#00ffcc";
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timer);
    minutesDisplay.textContent = "00";
    secondsDisplay.textContent = "00";
    millisecondsDisplay.textContent = "00";
    startStopButton.textContent = "Start";
    startStopButton.style.background = "#00ffcc";
    elapsedTime = 0;
    isRunning = false;
    lapsList.innerHTML = "";
}

function updateTime() {
    const currentTime = Date.now() - startTime;
    const minutes = Math.floor(currentTime / (1000 * 60));
    const seconds = Math.floor((currentTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((currentTime % 1000) / 10);

    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
    millisecondsDisplay.textContent = milliseconds.toString().padStart(2, "0");
}

function addLap() {
    if (!isRunning) return;
    const lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

startStopButton.addEventListener("click", function () {
    isRunning ? pauseStopwatch() : startStopwatch();
});

resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", addLap);
