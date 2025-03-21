let particles = [];

class Particle {
  constructor(x, y, isFace, isHand) {
    this.x = x;
    this.y = y;
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
    this.alpha = 255;
    this.size = isHand ? random(10, 20) : random(10, 20);
    this.isFace = isFace;
    this.isHand = isHand;

    if (isFace) {
      this.shape = int(random(3)); // 0 = koło, 1 = kwadrat, 2 = trójkąt
    } else if (isHand) {
      this.shape = 5; // pusty okrąg
    }

    this.color = [random(100, 255), random(100, 255), random(100, 255)];
  }

  update() {
    if (this.isHand) {
      this.size += 2;
      this.alpha -= 3;
    } else {
      this.x += this.vx;
      this.y += this.vy;
    }

    if (this.isFace) {
      if (this.x <= 0 || this.x >= width) {
        this.vx *= -0.8;
        this.x = constrain(this.x, 1, width - 1);
      }
      if (this.y <= 0 || this.y >= height) {
        this.vy *= -0.8;
        this.y = constrain(this.y, 1, height - 1);
      }
    }

    this.alpha -= 3;

    if (this.alpha < 0 || this.size > 100) {
      let index = particles.indexOf(this);
      particles.splice(index, 1);
    }
  }

  show() {
    noFill();
    stroke(this.color[0], this.color[1], this.color[2], this.alpha);
    strokeWeight(2);

    if (this.shape === 0) {
      fill(this.color[0], this.color[1], this.color[2], this.alpha);
      ellipse(this.x, this.y, this.size);
    } else if (this.shape === 1) {
      rect(this.x, this.y, this.size, this.size);
    } else if (this.shape === 2) {
      triangle(
        this.x, this.y - this.size / 2,
        this.x - this.size / 2, this.y + this.size / 2,
        this.x + this.size / 2, this.y + this.size / 2
      );
    } else if (this.shape === 5) {
      ellipse(this.x, this.y, this.size);
    }
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
  }
}
