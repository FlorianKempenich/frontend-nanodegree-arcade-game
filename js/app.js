// Enemies our player must avoid


class Enemy {
  constructor(row, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor() {}
  handleInput(direction) {}
  update() {}
  render() {}
}

// Now instantiate your objects.

const allEnemies = [
  new Enemy(1, 1),
  new Enemy(2, 1.3),
  new Enemy(2, 2),
  new Enemy(3, 0.4),
  new Enemy(3, 1.6)
];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
