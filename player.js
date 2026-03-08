// --- PLAYER KLASSE MIT IDLE-LOGIK ---

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 15;
    this.currentFrame = 0;
    this.direction = 0; // 0:Unten, 1:Oben, 2:Links, 3:Rechts
    this.isMoving = false;
    this.animStep = 0;
    this.idleTimer = 0;
    this.isIdling = false;
  }

  update() {
    this.isMoving = false;
    let nextX = this.x;
    let nextY = this.y;

    if (keyIsDown(65)) { nextX -= this.speed; this.direction = 2; this.isMoving = true; } // A
    if (keyIsDown(68)) { nextX += this.speed; this.direction = 3; this.isMoving = true; } // D
    if (keyIsDown(87)) { nextY -= this.speed; this.direction = 1; this.isMoving = true; } // W
    if (keyIsDown(83)) { nextY += this.speed; this.direction = 0; this.isMoving = true; } // S

    if (this.isMoving) {
      this.idleTimer = 0;
      this.isIdling = false;
      if (!this.hitsWall(nextX, nextY)) {
        this.x = nextX;
        this.y = nextY;
      }
      // Lauf-Animation (Spalten 0, 1, 2)
      if (frameCount % 10 === 0) {
        let sequence = [0, 1, 0, 2]; 
        this.animStep = (this.animStep + 1) % 4;
        this.currentFrame = sequence[this.animStep];
      }
    } else {
      this.idleTimer++;
      if (this.idleTimer > 10) { // Nach 2 Sekunden Idle-Pose
        this.isIdling = true;
        if (frameCount % 20 === 0) {
          this.currentFrame = (this.currentFrame + 1) % 3; 
        }
      } else {
        this.currentFrame = 0;
      }
    }
  }

  hitsWall(nx, ny) {
    let gx = floor(nx / tileSize);
    let gy = floor(ny / tileSize);
    // Dynamische Prüfung gegen die aktuelle Array-Größe
    if (gy < 0 || gy >= tileMap.length || gx < 0 || gx >= tileMap[0].length) return true;
    return tileMap[gy][gx] === 1;
  }

  show() {
    let sx = this.currentFrame * frameW;
    let row = this.isIdling ? 4 : this.direction; // 5. Zeile (Index 4) für Idle
    let sy = row * frameH;
    
    if (playerSprite) {
      image(playerSprite, this.x - frameW / 2, this.y - frameH / 2, frameW, frameH, sx, sy, frameW, frameH);
    }
  }
}
