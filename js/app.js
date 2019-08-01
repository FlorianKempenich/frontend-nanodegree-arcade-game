function resetXPosition() {
  const offScreenRow = -Constants.colWidth;
  this.x = offScreenRow * 2;
}

function findMatchingColumn(xPos) {
  return Math.floor(xPos / Constants.colWidth);
}

class Renderable {
  constructor(sprite) {
    this.sprite = sprite;
  }

  init() {
    this.img = Resources.get(this.sprite);
  }

  render() {
    ctx.drawImage(this.img, this.x, this.y);
  }
}

class Enemy extends Renderable {
  constructor(row, speed, debugName = "") {
    super("images/enemy-bug.png");
    this.width = 101; // PNG Dimensions

    this.speed = speed;
    // 20 offset is due to shape of png img for the enemy-bug
    this.row = row;
    this.y = this.row * Constants.rowHeight - 20;
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

  collisionCells() {
    const collisionRow = this.row;
    const collisionColumnStart = findMatchingColumn(this.x);
    const collisionColumnEnd = findMatchingColumn(this.x + this.img.width);

    const collisionCells = [];
    for (let col = collisionColumnStart; col <= collisionColumnEnd; col++) {
      collisionCells.push({ col: col, row: collisionRow });
    }

    return collisionCells;
  }

  debug() {
    if (this.debugName) {
      console.log("" + this.collisionCells());
    }
  }
}

class StoppedEnemy extends Enemy {
  constructor(row, xPos, debugName = "Stopped Enemy") {
    super(row, 0, debugName);
    this.x = xPos;
  }
  update(dt) {
    // no-op
  }
}

class Player extends Renderable {
  constructor(startCol, startRow) {
    super("images/char-horn-girl.png");
    this.col = startCol;
    this.row = startRow;
    this.x = undefined;
    this.y = undefined;
  }
  handleInput(direction) {
    switch (direction) {
      case "up":
        if (this.row > 0) this.row -= 1;
        break;

      case "down":
        if (this.row < Constants.numRows - 1) this.row += 1;
        break;

      case "left":
        if (this.col > 0) this.col -= 1;
        break;

      case "right":
        if (this.col < Constants.numCols - 1) this.col += 1;
        break;

      default:
        throw `Unknown direction: '${direction}'`;
    }
  }

  update() {
    this.x = this.col * Constants.colWidth;
    this.y = this.row * Constants.rowHeight - 20;
  }

  currentCell() {
    return { col: this.col, row: this.row };
  }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keydown", function(e) {
  const arrowKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  const vimKeys = {
    72: "left",
    75: "up",
    76: "right",
    74: "down"
  };
  var allowedKeys = { ...arrowKeys, ...vimKeys };

  player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener("click", function() {
  // allEnemies.forEach(e => e.debug())
});
