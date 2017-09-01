// Enemies our player must avoid
var Enemy = function (coordinate) {
    /*
    Declare all variables for enemy class
    */
    this.x = -100;
    this.y = coordinate;
    this.speed = Math.floor(Math.random() * (300 - 100)) + 100; // Spawn enemies with different speeds between 50 and 200
    this.width = 101;
    this.height = 80;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    if (this.x <= 500) {
        this.x += this.speed * dt;
    } else {
        this.x = -50;
    }
    //Trigger Collision Function
    this.collision();
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Enemy collision triggered when a player collides with an enemy.
//When the width/height of the enemy with an inset of 30, intersects
//with the width/height of the player with an inset of 30
Enemy.prototype.collision = function () {
    if (
        (this.x + this.width - 30) >= player.x &&
        this.x <= (player.x + player.width - 30) &&
        (this.y + this.height - 30) >= player.y &&
        this.y <= (player.y + player.height - 30)) {
        alert("GAME OVER, YOU LOSE!");
        player.reset();
        player.render();

    }
};

//Player Class
var Player = function () {
    /*
    Declare all variables for player class
    */
    this.x = 210;
    this.y = 470;
    this.speed = 50;
    this.width = 80;
    this.height = 80;
    this.sprite = 'images/char-pink-girl.png';
};

// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function (dt) {
    if (this.y < 80) {
        alert("HURRAY, YOU WIN!, CONGRATS MATE!");
        this.reset();
        this.render();

    }

};

//Reset player position
Player.prototype.reset = function () {
    this.x = 210;
    this.y = 470;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*  Start Mobile Input handling  */
var up = document.querySelector("#up");
var down = document.querySelector("#down");
var left = document.querySelector("#left");
var right = document.querySelector("#right");

up.addEventListener("click", function () {
    if (player.y >= player.speed) {
        player.y -= player.speed;
        player.render();
    }
});
down.addEventListener("click", function () {
    if (player.y <= 450) {
        player.y += player.speed;
        player.render();
    }
});
left.addEventListener("click", function () {
    if (player.x >= player.speed) {
        player.x -= player.speed;
        player.render();
    }
});
right.addEventListener("click", function () {
    if (player.x <= 400) {
        player.x += player.speed;
        player.render();
    }
});
/*  Stop Mobile Input handling  */

// Input handler for player, required method for game
Player.prototype.handleInput = function (fn) {
    if (fn == "right" && this.x <= 400) {
        this.x += this.speed;
        this.render();
    } else if (fn == "left" && this.x >= this.speed) {
        this.x -= this.speed;
        this.render();
    } else if (fn == "up" && this.y >= this.speed) {
        this.y -= this.speed;
        this.render();
    } else if (fn == "down" && this.y <= 450) {
        this.y += this.speed;
        this.render();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(120), new Enemy(200), new Enemy(300), new Enemy(120), new Enemy(200), new Enemy(300)];

// Place the player object in a variable called player
var player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',
        68: 'right',
        83: 'down',
        87: 'up'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});