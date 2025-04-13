function playClickSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
  
    oscillator.type = "sine"; // Tonality (prova anche "square" o "triangle")
    oscillator.frequency.value = 800; // Frequenza in Hz (più alta = più acuto)
    gainNode.gain.value = 0.3; // Volume (da 0 a 1)
  
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
  
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3); // Fade-out
    oscillator.stop(audioContext.currentTime + 0.3); // Durata in secondi
}

function playBarpSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
  
    oscillator.type = "sawtooth"; // Suono più "grezzo"
    oscillator.frequency.value = 150; // Frequenza bassa
    gainNode.gain.value = 0.5;
  
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
  
    oscillator.start();
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5); // Effetto "caduta"
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Prendi i bottoni dal DOM (Document Object Model)
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");

// Aggiungi event listeners per il mouse e il touch (mobile)
function setupButton(button, soundType) {

  // Quando il bottone è premuto (mouse o touch)
  button.addEventListener("mousedown", () => {
    button.classList.add("pressed");
    if (soundType === "click") playClickSound();
    if (soundType === "barp") playBarpSound();
  });
  button.addEventListener("touchstart", () => {
    button.classList.add("pressed");
    if (soundType === "click") playClickSound();
    if (soundType === "barp") playBarpSound();
  });

  // Quando il bottone è rilasciato (mouse o touch)
  button.addEventListener("mouseup", () => {
    button.classList.remove("pressed");
  });
  button.addEventListener("touchend", () => {
    button.classList.remove("pressed");
  });

  // Se il mouse esce dal bottone mentre è premuto
  button.addEventListener("mouseleave", () => {
    if (button.classList.contains("pressed")) {
      button.classList.remove("pressed");
    }
  });

}

// Configura entrambi i bottoni
setupButton(button1, "click");
setupButton(button2, "barp");