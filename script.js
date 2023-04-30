var minutes = document.querySelector("input#minutes");
var minutesValue = Number(minutes.value);

var seconds = document.querySelector("input#seconds");
var secondsValue = Number(seconds.value);

const buttonSend = document.querySelector("button#send");
const buttonStop = document.querySelector("button#stop");

var display = document.querySelector("h2.time__display");

function playCronometer(minutes, seconds) {
  const interval = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--;
      showNumbers(minutes, seconds);
    } else {
      if (minutes.value > 0) {
        seconds.value = 59;
        minutes.value--;
        showNumbers(minutes, seconds);
      } else {
        stopCronometer(interval);
        
       // reload();
      }
    }

    buttonStop.addEventListener("click", (event) => {
      event.preventDefault();
     
      stopCronometer(interval);

      minutes.style.color = "black";
      seconds.style.color = "black";
    });
  }, 1000);
}

function showNumbers(minutes, seconds) {
	display.innerHTML = minutes.value.padStart(2, 0)
	+ ' : ';
	display.innerHTML += seconds.value.padStart(2, 0);
}

function stopCronometer(interval) {
	clearInterval(interval);
	minutes.value = '';
	seconds.value = '';
	
  display.innerHTML = "00 : 00";
  
  minutes.removeAttribute('disabled', '');
  seconds.removeAttribute('disabled', '');
  buttonSend.removeAttribute('disabled', '');
  
  minutes.style.color = "black";
	seconds.style.color = "black";
  
  //reload();
}

buttonSend.addEventListener("click", (event) => {
  event.preventDefault();

  minutes.style.color = "transparent";
  seconds.style.color = "transparent";
  
  minutes.setAttribute('disabled', '');
  seconds.setAttribute('disabled', '');
  buttonSend.setAttribute('disabled', '');
  
  showNumbers(minutes, seconds);

  playCronometer(minutes, seconds);
  
});

function reload () {
		document.location.reload();
	}
