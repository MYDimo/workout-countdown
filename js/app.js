// Get DOM elements
const roundsInput = document.querySelector('#roundsInput');
const workInput = document.querySelector('#workInput');
const restInput = document.querySelector('#restInput');
const start = document.querySelector('#start');
const reset = document.querySelector('#reset');

const inputs = document.querySelector("#inputs");
const countdown = document.querySelector('#countdown');
const roundsOutput = document.querySelector("#roundsOutput");
const minutesOutput = document.querySelector("#minutesOutput");
const secondsOutput = document.querySelector("#secondsOutput");

//V2
start.addEventListener('click', () => {

    
    function play(audio_path, time_in_milisec){
        let beep = new Audio( audio_path);
        beep.loop = true;
        beep.play();
        setTimeout(() => { beep.pause(); }, time_in_milisec);
    }

    function countDowner(seconds, workTarget) {
        let sec = seconds;
    
    
        let timer = setInterval(() => {;
            sec--
            workTarget.textContent = `${(sec<10) ? '0' : ''}${sec}s`;
            // if (sec <= 2) {
            //     play('/sounds/beep-01a.mp3', 300);
            // }
            if (sec == 0) {
                clearInterval(timer);
            }
        }, 1000);
    
    }
    
    function roundDowner(roundCounter, roundTarget) {
        roundTarget.textContent = roundCounter;
        console.log(roundCounter);    
    }

    
    if(!roundsInput.value || !workInput.value || !restInput.value) {
        return;
    }
    countdown.classList.toggle("hide");
    inputs.classList.toggle("hide");
    workOutput.textContent = `${(workInput.value<10) ? '0' : ''}${workInput.value}s`


    let roundsCounter = parseInt(roundsInput.value, 10);
    let workCounter  = parseInt(workInput.value, 10);
    let restCounter = parseInt(restInput.value, 10);

    let workSetter = -1000;
    let restSetter = workCounter*1000;

    for (let i = 0; i < roundsCounter; i++) {
        let additionalSec1 = (i > 0) ? 1 : 0;
        
        //add if statement when the input is 0
        setTimeout(() => {countDowner(workCounter + additionalSec1, workOutput)},workSetter);
        setTimeout(() => {countDowner(restCounter + 1, workOutput)},restSetter);
        setTimeout(() => {roundDowner(i+1, roundsOutput)},restSetter-workCounter*1000);

        workSetter = workSetter+((workCounter+restCounter+2)*1000);
        restSetter = restSetter+((workCounter+restCounter+2)*1000);   
    }
})

reset.addEventListener('click', () => {
    location.reload(); 
})