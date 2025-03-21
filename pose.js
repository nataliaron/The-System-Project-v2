let poses = [];

function modelReady() {
  console.log("PoseNet is ready");
}

function getPersonBoundingBox() {
  let minX = width, minY = height, maxX = 0, maxY = 0;
  let found = false;
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let keypoint of pose.keypoints) {
      if (keypoint.score > 0.5) {
        found = true;
        minX = min(minX, keypoint.position.x);
        minY = min(minY, keypoint.position.y);
        maxX = max(maxX, keypoint.position.x);
        maxY = max(maxY, keypoint.position.y);
      }
    }
  }
  if (found) {
    let margin = 50;
    minX = max(0, minX - margin);
    minY = max(0, minY - margin);
    maxX = min(width, maxX + margin);
    maxY = min(height, maxY + margin);
    return { minX, minY, maxX, maxY };
  } else {
    return null;
  }
}

function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];

      if (keypoint.score > 0.2) {
        let x = keypoint.position.x;
        let y = keypoint.position.y;

        let isFace = faceParts.includes(keypoint.part);
        let isHand = handParts.includes(keypoint.part);

        for (let k = 0; k < 5; k++) {
          particles.push(new Particle(x, y, isFace, isHand));
        }
      }
    }
  }
}

let previousLeftEye = null;
let previousRightEye = null;

function drawEyeTrails() {
  if (poses.length === 0) return;

  let pose = poses[0].pose;

  let leftEye = pose.keypoints.find(k => k.part === "leftEye");
  let rightEye = pose.keypoints.find(k => k.part === "rightEye");

  strokeWeight(10);

  if (leftEye && leftEye.score > 0.5 && previousLeftEye) {
    stroke(random(200, 255), random(100, 255), random(100, 255));
    line(previousLeftEye.x, previousLeftEye.y, leftEye.position.x, leftEye.position.y);
  }

  if (rightEye && rightEye.score > 0.5 && previousRightEye) {
    stroke(random(100, 255), random(200, 255), random(100, 255));
    line(previousRightEye.x, previousRightEye.y, rightEye.position.x, rightEye.position.y);
  }

  if (leftEye && leftEye.score > 0.5) {
    previousLeftEye = leftEye.position;
  }

  if (rightEye && rightEye.score > 0.5) {
    previousRightEye = rightEye.position;
  }
}



