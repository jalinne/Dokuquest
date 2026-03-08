let gameState = "PLAY";
let questStarted = false;
let inventory = [];
let campusImg;
let frontImg;
let profdrImg;


let scrollOffset = 0; // Speichert die aktuelle Scroll-Position


// Sprite-Einstellungen 
let playerSprite;
let frameW = 128; 
let frameH = 128; 

// Welt-Einstellungen
let tileSize = 80; // Größe der einzelnen Kacheln
let player;

let tileMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1,1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1,1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,  1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,  1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,  1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,  1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0,  1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,  1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1],
];

let projects = [
  { id: 0, name: "Drawing Algorithms", x: 1620, y: 3000, collected: false, info: "Drawing Algorithms", url: "project1.html" },
  { id: 1, name: "Variables & Parameters", x:  3800, y:1380, collected: false, info: "Variables & Parameters", url: "project2.html" },
  { id: 2, name: "Grids & Modules", x: 2380, y: 2320, collected: false, info: "Grids & Modules", url: "project3.html" },
  { id: 3, name: "Digital Drawing Tools", x: 3450, y: 2660, collected: false, info: "Digital Drawing Tools", url: "project4.html" },
  { id: 4, name: "Tools & Print", x: 3100, y: 550, collected: false, info: "Tools & Print", url: "project5.html" },
 ];

let dozent = { x: 1350, y: 300, size: 150, name: "Prof. Dr. Design" };





function preload() {
  playerSprite = loadImage('assets/charsprites.png'); // 384 x 640 px

  campusImg = loadImage('assets/okumap.jpg'); // Campusbild (Hintergrund)

  frontImg = loadImage('assets/frontfin.png'); // Front-Layer Bild
  
  profdrImg = loadImage('assets/profdr.png'); // Prof.Dr.Design
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(150, 150);
  loadGameState();
}

// Spielzustand speichern
function saveGameState() {
  let state = {
    inventory: inventory,
    questStarted: questStarted,
    playerX: player.x,
    playerY: player.y
  };
  localStorage.setItem('gameState', JSON.stringify(state));
}

// Spielzustand laden
function loadGameState() {
  let savedState = localStorage.getItem('gameState');
  if (savedState) {
    try {
      let state = JSON.parse(savedState);
      inventory = state.inventory || [];
      questStarted = state.questStarted || false;
      player.x = state.playerX || 150;
      player.y = state.playerY || 150;
      
      // Entferne Duplikate aus dem Inventar
      let seen = new Set();
      inventory = inventory.filter(item => {
        if (seen.has(item.id)) {
          return false; // Duplikat - ausschließen
        }
        seen.add(item.id);
        return true;
      });
      
      // Updiere collected-Status der Projekte basierend auf Inventar
      for (let proj of projects) {
        proj.collected = inventory.some(item => item.id === proj.id);
      }
    } catch (e) {
      console.log('Fehler beim Laden des Spielzustands');
    }
  }
}

// Spielzustand zurücksetzen
function resetGameState() {
  inventory = [];
  questStarted = false;
  player.x = 150;
  player.y = 150;
  gameState = "PLAY";
  
  // Alle Projekte zurücksetzen
  for (let proj of projects) {
    proj.collected = false;
  }
  
  // localStorage löschen
  localStorage.removeItem('gameState');
}

function draw() {
  background(240);

  // Zeichne das Spiel immer, wenn wir nicht gerade in der Detailansicht sind
  if (gameState === "PLAY" || gameState === "DIALOG" || gameState === "INVENTORY") {
    playGame();
  }

  // Das Inventar oder der Dialog wird JETZT einfach darübergelegt
  if (gameState === "DIALOG") {
    drawDialog();
  } else if (gameState === "INVENTORY") {
    drawInventory();
  }
}

function playGame() {
  let worldWidth = tileMap[0].length * tileSize;
  let worldHeight = tileMap.length * tileSize;

  let camX = width / 2 - player.x;
  let camY = height / 2 - player.y;
  camX = constrain(camX, -(worldWidth - width), 0);
  camY = constrain(camY, -(worldHeight - height), 0);

  push();
  translate(camX, camY);

  drawMap();

  // Dozent & Items
  imageMode(CENTER);
  image(profdrImg, dozent.x, dozent.y, dozent.size, dozent.size);
  imageMode(CORNER);

  if (questStarted) {
    for (let p of projects) {
      if (!p.collected) {
        fill(255, 215, 0);
        ellipse(p.x, p.y, 25, 25);
      }
    }
  }

  player.update();
  player.show();

  // Frontlayer über allem
  tint(255, 255);
  image(frontImg, 0, 0, tileMap[0].length * tileSize, tileMap.length * tileSize);
  noTint();

  pop(); // Kamera-Ende

  checkInteractions();
}

function drawMap() {

  // 1. Tilemap zeichnen
  for (let y = 0; y < tileMap.length; y++) {
    for (let x = 0; x < tileMap[y].length; x++) {

      if (tileMap[y][x] === 1) {
        fill(120);
        rect(x * tileSize, y * tileSize, tileSize, tileSize);
      }

      if (tileMap[y][x] === 0) {
        fill(200);
        rect(x * tileSize, y * tileSize, tileSize, tileSize);
      }

    }
  }

  // 2. Danach Campusbild darüber zeichnen
  
   if (campusImg) {
    tint(255,255); // Transparenz
    image(campusImg, 0, 0, tileMap[0].length * tileSize, tileMap.length * tileSize);
    noTint();
  }
  }



function checkInteractions() {
  if (dist(player.x, player.y, dozent.x, dozent.y) < 150) {
    // Nur anzeigen wenn nicht im Dialog
    if (gameState !== "DIALOG") {
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height - 508, 300, 40, 10);
      fill(0);
      textSize(20);
      textAlign(CENTER);
      text("E um zu interagieren", width / 2, height - 500);
    }
  }

  if (questStarted) {
    for (let p of projects) {
      if (!p.collected && dist(player.x, player.y, p.x, p.y) < 50) {
        p.collected = true;
        // Nur hinzufügen wenn nicht bereits im Inventar
        if (!inventory.some(item => item.id === p.id)) {
          inventory.push(p);
        }
      }
    }
  }
}

function drawDialog() {
  let dw = min(width * 0.8, 800); // Max 800px breit, sonst 80% vom Bildschirm
  let dh = 120;
  let dx = (width - dw) / 2+500;
  let dy = height - dh - 40;

  // Box
  fill(0, 220);
 
  rect(dx, dy, dw, dh,5);

  // Text
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(NORMAL);
  // text() mit Breitenangabe für automatischen Zeilenumbruch
  text(dozent.name + ": 'Hey, es sieht so aus, als ob alle deine Projekte auf dem Campus verloren gegangen sind... Du musst sie unbedingt wiederfinden!'", dx + 20, dy + 20, dw - 40, dh - 60);
  
fill(0,220);
  rect(dx, dy + dh-20, dw,30, 5);
  fill(255);
 
  textSize(14);
  text("Leertaste zum Starten", width / 2, dy + dh - 20);
}

function drawInventory() {


  push();
  translate(width / 2, height / 2);
  
  let invW = min(width * 0.6, 500);
  let invH = min(height * 0.7, 600);
  
  rectMode(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(3);
  rect(0, 0, invW, invH, 5);

  // Titel
  noStroke();
  fill(0);
  textAlign(CENTER);
  textSize(24);
  textStyle(BOLD);
  text("Inventar", 0, -invH / 2 + 50);
  
  // Projektliste
  textAlign(LEFT, CENTER);
  textSize(18);
  textStyle(NORMAL);
  
  if (inventory.length === 0) {
    fill(0);
    textAlign(CENTER);
    text("Noch keine Projekte gefunden...", 0, 0);
  } else {
    for (let i = 0; i < inventory.length; i++) {
      let itemY = -invH / 2 + 120 + (i * 60);
      
      // Button-Style Zeile
      fill(245);
      rect(0, itemY, invW - 60, 50, 10);
      
      fill(0);
      text(inventory[i].name, -invW / 2 + 50, itemY);
      fill(0, 102, 204);
      textAlign(RIGHT);
      text("ÖFFNEN", invW / 2 - 50, itemY);
      textAlign(LEFT);
    }
  }
  
  //Restart Button
  let btnY = invH / 2 - 70;
  let btnW = 150;
  let btnH = 35;
  
  fill(0);
 
 
  rect(0, btnY, btnW, btnH, 8);
  
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text("Items Zurücksetzen", 0, btnY);
  
  // Anweisungen
  fill(0);
  textAlign(CENTER);
  textSize(14);
  textStyle(NORMAL);
  text(" 'I' zum Schließen", 0, invH / 2 - 25);
  
  // Store button position für mousePressed (Globale Koordinaten)
  let globalBtnX = width / 2 - btnW / 2;
  let globalBtnY = height / 2 + btnY - btnH / 2;
  window.restartButtonPos = { x: globalBtnX, y: globalBtnY, w: btnW, h: btnH };
  
  pop();
}





function mouseWheel(event) {
  // Zoomen mit Ctrl/Cmd erlauben, aber normales Scrolling blockieren
  if (event.ctrlKey || event.metaKey) {
    return; // Zoomen erlauben
  }
  return false; // Normales Scrolling blockieren
}

// --- EINGABE-LOGIK ---
function keyPressed() {
  // ESCAPE geht immer eine Ebene zurück
  if (keyCode === ESCAPE) {
    if (gameState === "INVENTORY" || gameState === "DIALOG") {
      gameState = "PLAY";
    }
    return;
  }

  // Tastatur-Eingaben
  if (key === 'i' || key === 'I') {
    gameState = (gameState === "INVENTORY") ? "PLAY" : "INVENTORY";
  }

  if ((key === 'e' || key === 'E') && dist(player.x, player.y, dozent.x, dozent.y) < 150) {
    gameState = "DIALOG";
  }
  
  if (gameState === "DIALOG" && key === ' ') { 
    questStarted = true; 
    gameState = "PLAY"; 
  }
}

function mousePressed() {
  // Restart-Button in der Inventar-Ansicht
  if (gameState === "INVENTORY" && window.restartButtonPos) {
    let btn = window.restartButtonPos;
    if (mouseX > btn.x && mouseX < btn.x + btn.w && mouseY > btn.y && mouseY < btn.y + btn.h) {
      if (confirm("Wirklich neustarten und alle Projekte zurücksetzen?")) {
        resetGameState();
      }
      return;
    }
  }
  
  // Projekt im Inventar anklicken und zu externer Seite navigieren
  if (gameState === "INVENTORY") {
    let invW = min(width * 0.6, 500);
    let invH = min(height * 0.7, 600);
    let centerX = width / 2;
    let centerY = height / 2;

    for (let i = 0; i < inventory.length; i++) {
      let itemY = centerY - invH / 2 + 120 + (i * 60);
      if (mouseX > centerX - invW/2 && mouseX < centerX + invW/2 &&
          mouseY > itemY - 25 && mouseY < itemY + 25) {
        // Spielzustand speichern bevor navigiert wird
        if (inventory[i].url) {
          saveGameState();
          window.location.href = inventory[i].url;
        }
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

