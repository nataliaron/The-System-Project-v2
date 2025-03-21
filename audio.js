let mic, amp;
let micActive = false;
let bgMusic;
let pulseFactor = 0;

function preload() {
  bgMusic = loadSound("background_music.mp3"); // Załaduj plik muzyczny
}

function startMic() {
  userStartAudio().then(() => {
    console.log("Audio context started");
    mic.start(() => {
      console.log("Microphone started successfully");
      micActive = true;
      amp.setInput(mic);
    });
  }).catch((err) => {
    console.error("Audio context error:", err);
  });
}
