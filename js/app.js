// Enemies our player must avoid
var score = 0;
var health = 4;
var Enemy = function (i, j) {
    this.speed = 50;
    this.x = i;
    this.y = j;

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x >= 505)
        this.x = 0;

    if ((this.x < player.x + 30 && this.x + 60 > player.x) & (this.y < player.y + 60 && this.y + 40 > player.y)) {

        score = 0;
        health -= 1;

        document.getElementById('health').innerHTML = health;
        document.getElementById('score').innerHTML = score;

        player.reset();
        if (health == 0) {
            alert("Game Over !!! All lives used up.");
            window.location.reload();
        }

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var player = function (i, j) {
    this.x = i;
    this.y = j;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.health = 4;
};
player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
player.prototype.update = function () {
    if (player.y < 20) {
        score += 10;
        document.getElementById('score').innerHTML = score;
        this.reset();
        if (score >= 100) {
            var ans = confirm("Congratulations!!\n You finished the game\nDo you want to play again ?");
            if (ans) {
                window.location.reload();

            }



        }
    }
};
player.prototype.handleInput = function (direction) {
    if (direction == 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (direction == 'right' && this.x < 400) {
        this.x += 101;
    }
    if (direction == 'up' && this.y > 3) {
        this.y -= 83;
    }
    if (direction == 'down' && this.y < 400) {
        this.y += 83;
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

player.prototype.reset = function () {
    this.x = 0;
    this.y = 400;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player




// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(0, 60), new Enemy(-100, 145), new Enemy(-200, 230), new Enemy(-890, 230)];
// Place the player object in a variable called player
var player = new player(0, 400);


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