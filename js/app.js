// Enemies our player must avoid
var Enemy = function (coordinate) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = coordinate;
    this.speed = Math.floor(Math.random() * (200 - 50)) + 50; // Spawn enemies with different speeds between 50 and 200
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

Enemy.prototype.collision = function () {
        if (
            (this.x + this.width - 25) >= player.x &&
            this.x <= (player.x + player.width - 25) &&
            (this.y + this.height - 25) >= player.y &&
            this.y <= (player.y + player.height - 25)) {
            alert("GAAME OVER, YOU LOSE!");
            player.reset();
            player.render();

        }
    };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = 210;
    this.y = 470;
    this.speed = 50;
    this.width = 80;
    this.height = 80;
    this.sprite = 'images/char-pink-girl.png'
};

// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function (dt) {
    if (this.y < 80) {
        alert("HURRAY, YOU WIN!, CONGRATS MATE!");
        player.reset();
        player.render();
        
    }
    
};

Player.prototype.reset = function () {
    //Reset player position
    this.x = 210;
    this.y = 470;
};


    // Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Input handler for player, required method for game
Player.prototype.handleInput = function (fn) {
        if (fn == "right" && this.x <= 400) {
            this.x += this.speed;
            player.render();
        } else if (fn == "left" && this.x >= this.speed) {
            this.x -= this.speed;
            player.render();
        } else if (fn == "up" && this.y >= this.speed) {
            this.y -= this.speed;
            player.render();
        } else if (fn == "down" && this.y <= 450) {
            this.y += this.speed;
            player.render();
        }
    };

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(120), new Enemy(200), new Enemy(300), new Enemy(120),new Enemy(200), new Enemy(300)];

// Place the player object in a variable called player
var player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});