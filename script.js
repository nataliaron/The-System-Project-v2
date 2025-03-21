let video;
let poseNet;
let mode = 1;
let clearButton;


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  poseNet = ml5.poseNet(video, 'single', modelReady);
  poseNet.on('pose', function (results) {
    poses = results;
  });

  let button = createButton("Change Mode");
  button.position(10, 10);
  button.mousePressed(changeMode);

  clearButton = createButton("Clear Canvas");
  clearButton.position(120, 10);
  clearButton.mousePressed(clearCanvas);
  clearButton.hide(); // ukryj domyślnie


  mic = new p5.AudioIn();
  amp = new p5.Amplitude();
  startMic();

  userStartAudio().then(() => {
    bgMusic.loop();
    bgMusic.setVolume(0.5);
  });
}

function draw() {
  translate(width, 0);
  scale(-1, 1);

  if (micActive) {
    let level = amp.getLevel();
    pulseFactor = map(level, 0, 0.3, 0, 30);
  }

  if (mode === 2) {
    drawDistortedGrid();
  } else if (mode === 3) {
    // background(0, 20); // delikatne tło dla efektu smug
    drawEyeTrails();
  } else {
    if (mode === 0) {
      image(video, 0, 0, width, height);
    } else {
      background(0);
    }
    drawKeypoints();
    updateParticles();
  }// Pokazuj przycisk "Clear" tylko w trybie rysowania oczami
    if (mode === 3) {
    clearButton.show();
        } else {
    clearButton.hide();
  }
  
  
}

function changeMode() {
  mode = (mode + 1) % 4;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  video.size(width, height);
}

function clearCanvas() {
    background(0); // czyści ekran tylko wizualnie
    previousLeftEye = null;
    previousRightEye = null;
  }
  