function drawDistortedGrid() {
    background(0);
    stroke(255, 130);
    strokeWeight(1);
  
    let gridSize = 35 + pulseFactor;
    let distortions = [];
  
    for (let i = 0; i < poses.length; i++) {
      let pose = poses[i].pose;
      for (let keypoint of pose.keypoints) {
        if (keypoint.score > 0.5) {
          distortions.push({ x: keypoint.position.x, y: keypoint.position.y });
        }
      }
    }
  
    let bbox = getPersonBoundingBox();
  
    for (let x = 0; x < width; x += gridSize) {
      beginShape();
      for (let y = 0; y < height; y += gridSize) {
        let bendX = x, bendY = y;
        if (bbox && x >= bbox.minX && x <= bbox.maxX && y >= bbox.minY && y <= bbox.maxY) {
          for (let d of distortions) {
            let distance = dist(x, y, d.x, d.y);
            if (distance < 150) {
              let force = map(distance, 0, 120, 0, 0);
              let angle = atan2(y - d.y, x - d.x);
              bendX -= cos(angle) * force;
              bendY -= sin(angle) * force;
            }
          }
        }
        vertex(bendX, bendY);
      }
      endShape();
    }
  
    for (let y = 0; y < height; y += gridSize) {
      beginShape();
      for (let x = 0; x < width; x += gridSize) {
        let bendX = x, bendY = y;
        if (bbox && x >= bbox.minX && x <= bbox.maxX && y >= bbox.minY && y <= bbox.maxY) {
          for (let d of distortions) {
            let distance = dist(x, y, d.x, d.y);
            if (distance < 150) {
              let force = map(distance, 0, 150, 40, 0);
              let angle = atan2(y - d.y, x - d.x);
              bendX -= cos(angle) * force;
              bendY -= sin(angle) * force;
            }
          }
        }
        vertex(bendX, bendY);
      }
      endShape();
    }
  }
  