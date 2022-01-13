let timerEl = document.getElementById("countdownOutput");
const pauseEl = document.querySelector("#pauseBtn");
const startEl = document.querySelector("#startBtn");
const resetEl = document.querySelector("#resetBtn");
const roundsEl = document.querySelector("#rounds");
const workTimeEl = document.querySelector("#workTime");
const restTimeEl = document.querySelector("#restTime");


let startTime;
let rounds; // ms (3603000)
let workTime; // ms (3603000)
let restTime; // ms (3603000)
let countDownEnd;
let tickAudio = new Audio('sounds/beep-01a.mp3');
let lastSeconds;
let remainingTime;

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
    return hours + "h  " + minutes + "m  " + seconds + "s  ";
}

let myReq;
let isPaused = false;

function updateTimer() {
    remainingTime = countDownEnd - Date.now();
    let hours = Math.floor(remainingTime / (60 * 60 * 1000));
    let minutes = Math.floor(remainingTime / (60 * 1000)) % 60;
    let seconds = Math.floor(remainingTime / 1000) % 60;
    let mseconds = remainingTime % 1000;

    if(lastSeconds && lastSeconds !== seconds && !hours && !minutes && seconds <= 10) {
        // tickAudio.play();
    }
    lastSeconds = seconds;
    
    if (remainingTime < 0 && rounds > 0 && rounds % 2 == 0) {
        hours = 0;
        minutes = 0;
        seconds = 0;
        mseconds = 0;
        countDownEnd += workTime
        myReq = requestAnimationFrame(updateTimer);
        console.log(rounds);
        rounds--
    } else if (remainingTime < 0 && rounds > 0 && rounds % 2 != 0) { 
        hours = 0;
        minutes = 0;
        seconds = 0;
        mseconds = 0;
        countDownEnd += restTime
        myReq = requestAnimationFrame(updateTimer);
        console.log(rounds);
        rounds--
    } else if (remainingTime < 0 && rounds == 0) {
        hours = 0;
        minutes = 0;
        seconds = 0;
        mseconds = 0;
        myReq = cancelAnimationFrame(myReq)
    } else {
        myReq = requestAnimationFrame(updateTimer);
    }
    
    // printout
    timerEl.innerHTML = formatTime(hours, minutes, seconds, mseconds);
}
    
startEl.addEventListener('click', () => {
    rounds = (Number(roundsEl.value) * 2) - 1;
    startTime = Date.now();
    workTime = (Number(workTimeEl.value) + 1) * 1000;
    restTime = (Number(restTimeEl.value) + 1) * 1000;
    countDownEnd = startTime + workTime
    updateTimer();
})


pauseEl.addEventListener('click', () => {
    if (!isPaused) {
        isPaused = true;
        cancelAnimationFrame(myReq);
    } else {
        isPaused = false
        countDownEnd = Date.now() + (Math.ceil(remainingTime / 1000) * 1000 - 1000);
        updateTimer();
    }
})

resetEl.addEventListener('click', () => {
    cancelAnimationFrame(myReq)
    timerEl.innerHTML = formatTime(0, 0, 0, 0)
})
