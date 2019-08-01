function resetXPosition() {
  const offScreenRow = -Constants.colWidth;
  this.x = offScreenRow * 2;
}

class Enemy {
  constructor(row, speed, debugName = "") {
    this.sprite = "images/enemy-bug.png";
    this.speed = speed;
    this.y = row * Constants.rowHeight - 20; // 20 offset is due to shape of png img for the enemy-bug
    this.x = undefined;
    this.debugName = debugName;

    resetXPosition.call(this);
  }

  update(dt) {
    this.x += 100 * dt * this.speed;
    if (this.x >= Constants.width) {
      resetXPosition.call(this);
    }
  }

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

const allEnemies = [
  new Enemy(1, 1, "other"),
  new Enemy(2, 1.3),
  new Enemy(2, 2),
  new Enemy(3, 0.4, "frank"),
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
