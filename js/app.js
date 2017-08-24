// Enemies our player must avoid
var Enemy = function(y) {
    this.x = -100;
    this.y = y;
    this.speed = Math.floor(Math.random() * (200 - 50)) + 50; // Spawn enemies with different speeds between 50 and 200
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x <= 500){
        this.x += this.speed * dt ;
    }else{
        this.x = -50;
    }
    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = 200;
    this.y = 400;
    this.speed = 50;
    this.sprite = 'images/char-pink-girl.png'
}

// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt){
    if(this.y < 20){
        this.y = 400;
        player.render();
    }
}
// Draw the player on the screen, required method for game
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Input handler for player, required method for game
Player.prototype.handleInput = function(fn){
    if(fn == "right" && this.x <= 300){
        this.x += this.speed;
        player.render();
    }else if(fn == "left" && this.x >= 1 ){
        this.x -= this.speed;
        player.render();
    }else if(fn == "up" && this.y >= 5 ){
        this.y -= this.speed;
        player.render();
    }
    else if(fn == "down" && this.y <= 350){
        this.y += this.speed;
        player.render();
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(60), new Enemy(140),new Enemy(220)];
// Place the player object in a variable called player
var player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
