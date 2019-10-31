
const playSound = (sound) => {
    var context = new (window.AudioContext || window.webkitAudioContext)();
	var oscillator = context.createOscillator();
	var gain = context.createGain();
	oscillator.connect(gain);
	gain.connect(context.destination);    

	function rightSound() {
		var now = context.currentTime;
        //gain.gain.value = 0.2;
		gain.gain.setValueAtTime(100, now);
		gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        gain.gain.value = 1;
		oscillator.type = "square";
		oscillator.frequency.value = 720;
        oscillator.frequency.setValueAtTime(990, context.currentTime + 0.2);
		oscillator.start(now);
		oscillator.stop(now + 1);
	}

    function wrongSound() {
		var now = context.currentTime;
		gain.gain.setValueAtTime(100, now);
		gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        gain.gain.value = 1;
		oscillator.type = "sawtooth";
		oscillator.frequency.value = 180;
        oscillator.frequency.setValueAtTime(150, context.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(120, context.currentTime + 0.2);
		oscillator.start(now);
		oscillator.stop(now + 1.2);
	}

    if (sound === "rightSound") {
        rightSound();
    }
    if (sound === "wrongSound") {
        wrongSound();
    }
    
}

export default playSound;