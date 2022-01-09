var timerEl = document.getElementById("countdownOutput");
const pauseEl = document.querySelector("#pause");

var startTime = Date.now();
var countDownAmount = 60000; // ms (3603000)
var countDownEnd = startTime + countDownAmount;
var tickAudio = new Audio('sounds/beep-01a.mp3');
var lastSeconds;

function formatTime(hours, minutes, seconds, mseconds) {
    hours = String(hours);
    minutes = String(minutes);
    seconds = String(seconds);
    mseconds = String(mseconds);

    while (mseconds.length < 3) {
        mseconds = "0" + mseconds;
    }
    seconds = (seconds.length < 2) ? "0" + seconds : seconds;
    minutes = (minutes.length < 2) ? "0" + minutes : minutes;
    return hours + "h  " + minutes + "m  " + seconds + "s  " + mseconds + "ms";
}

let myReq;
let isPaused = false;

function updateTimer() {
    var remainingTime = countDownEnd - Date.now();
    var hours = Math.floor(remainingTime / (60 * 60 * 1000));
    var minutes = Math.floor(remainingTime / (60 * 1000)) % 60;
    var seconds = Math.floor(remainingTime / 1000) % 60;
    var mseconds = remainingTime % 1000;

    if(lastSeconds && lastSeconds !== seconds && !hours && !minutes && seconds <= 10) {
        // tickAudio.play();
    }
    lastSeconds = seconds;
    
    if (remainingTime < 0) {
        hours = 0;
        minutes = 0;
        seconds = 0;
        mseconds = 0;
    }
    else {
        myReq = requestAnimationFrame(updateTimer);
    }
    
    // printout
    timerEl.innerHTML = formatTime(hours, minutes, seconds, mseconds);
}
    
updateTimer();

pauseEl.addEventListener('click', () => {
    if (!isPaused) {
        isPaused = true;
        cancelAnimationFrame(myReq)
    } else {
        isPaused = false
        updateTimer();
    }
})
