let timerEl = document.querySelector("#countdownOutput");
const pauseEl = document.querySelector("#pauseBtn");
const startEl = document.querySelector("#startBtn");
const resetEl = document.querySelector("#resetBtn");
const roundsEl = document.querySelector("#rounds");
const workTimeEl = document.querySelector("#workTime");
const restTimeEl = document.querySelector("#restTime");
let roundsCounter = document.querySelector("#roundsCounter");
let theTime = document.querySelector("#theTime");


let startTime;
let rounds;
let workTime;
let restTime;
let countDownEnd;
let shortBeep = new Audio('sounds/short-Beep.mp3');
let longBeep = new Audio('sounds/beep-01a.mp3');
let beep3 = new Audio('sounds/beep3.wav')
let lastSeconds;
let remainingTime;
let myReq;
let isPaused = false;
let counter = 0

function currentTime() {
    let time = new Date()
    let clockH = (time.getHours()).toString()
    let clockM = (time.getMinutes()).toString()
    let clockS = (time.getSeconds()).toString()
    requestAnimationFrame(currentTime)

    theTime.innerHTML = clockH.padStart(2, 0) + ':' + clockM.padStart(2, 0) + ':' + clockS.padStart(2, 0)
} 

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
    return minutes + ":" + seconds + ':' + mseconds;
}

function updateTimer() {
    remainingTime = countDownEnd - Date.now();
    let hours = Math.floor(remainingTime / (60 * 60 * 1000));
    let minutes = Math.floor(remainingTime / (60 * 1000)) % 60;
    let seconds = Math.floor(remainingTime / 1000) % 60;
    let mseconds = remainingTime % 1000;
    
    roundsCounter.innerHTML = Math.ceil(rounds / 2);

    if (seconds == 3) {
        beep3.play()
    }
    
    if (remainingTime < 0 && rounds > 1 && rounds % 2 != 0) {
        hours = 0;
        minutes = 0;
        seconds = 0;
        mseconds = 0;
        countDownEnd += workTime 
        myReq = requestAnimationFrame(updateTimer);
        rounds--
    } else if (remainingTime < 0 && rounds > 1 && rounds % 2 == 0) { 
        hours = 0;
        minutes = 0;
        seconds = 0;
        mseconds = 0;
        countDownEnd += restTime
        myReq = requestAnimationFrame(updateTimer);
        rounds--
    } else if (remainingTime < 0 && rounds == 1) {
        hours = 0;
        minutes = 0;
        seconds = 0;
        mseconds = 0;
        rounds = 0
        roundsCounter.innerHTML = 0;
        myReq = cancelAnimationFrame(myReq)
    } else {
        myReq = requestAnimationFrame(updateTimer);
    }
    
    // printout
    timerEl.innerHTML = formatTime(hours, minutes, seconds, mseconds);
}

function inputValidation() {
    let pattern = /[0-9]+/
    let roundsValid = pattern.test(roundsEl.value)
    let workTValid = pattern.test(workTimeEl.value)
    let restTValid = pattern.test(restTimeEl.value)

    if (roundsValid && workTValid && restTValid) {
        return true;
    } else {
        return false;
    }
}

if (theTime) {
    currentTime()
}

if (startEl) {
    startEl.addEventListener('click', () => {
        let isInputValid = inputValidation()
        if (isInputValid) {
            rounds = (Number(roundsEl.value) * 2);
            startTime = Date.now();
            workTime = (Number(workTimeEl.value) + 1) * 1000;
            restTime = (Number(restTimeEl.value) + 1) * 1000;
            countDownEnd = startTime + workTime
            updateTimer();
        }
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
}