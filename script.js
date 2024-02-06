const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//Pizza as the Food
class Food {
  constructor() {
    this.position = {
      x: 600,
      y: 100,
    };
    this.width = 52;
    this.height = 50;

    this.foodimage = document.getElementById("food");
    this.visible = true;
  }

  draw() {
    c.drawImage(
      this.foodimage,
      0,
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

//Red Meat as the Poison
class Poison {
  constructor() {
    this.position = {
      x: 400,
      y: 100,
    };
    this.width = 48;
    this.height = 50;

    this.poisonimage = document.getElementById("poison");
  }

  draw() {
    c.drawImage(
      this.poisonimage,
      0,
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

//Player as the whaleshark
class Player {
  constructor() {
    this.position = {
      x: 10,
      y: 20,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 138;
    this.height = 110;

    this.sprites = {
      Left: document.getElementById("whaleleft"),
      Right: document.getElementById("whale"),
    };

    this.currentImage = this.sprites.Right;
  }

  draw() {
    c.drawImage(
      this.currentImage,
      0,
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw(); // this is where we are going to alter player's properties
    this.position.x += this.velocity.x; //this is so that our player can move left and right
    this.position.y += this.velocity.y; //this is to that our player can move up and down
  }
}

const player1 = new Player();
const food1 = new Food();
const poison1 = new Poison();

const poison2 = new Poison();
poison2.position.x = 1000;
poison2.position.y = 300;

const poison3 = new Poison();
poison3.position.x = 1700;
poison3.position.y = 200;

const poison4 = new Poison();
poison4.position.x = 1200;
poison4.position.y = 100;

const poison5 = new Poison();
poison5.position.x = 100;
poison5.position.y = 320;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height); //this method basically allows us to maintain our player's shape
  player1.update();
  food1.draw();
  poison1.draw();
  poison2.draw();
  poison3.draw();
  poison4.draw();
  poison5.draw();
  collisionfood(player1, food1);
  collisionPoison(player1, poison1);
  collisionPoison(player1, poison2);
  collisionPoison(player1, poison3);
  collisionPoison(player1, poison4);
  collisionPoison(player1, poison5);
}


animate(); ///this function here is basically performing gravity

player1.draw();
food1.draw();
poison1.draw();




addEventListener("keydown", ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 38:
      console.log("Up");
      player1.velocity.y -= 5;
      break;
    case 40:
      console.log("Down");
      player1.velocity.y += 5;
      break;
    case 39:
      console.log("Right");
      player1.velocity.x += 5;
      player1.currentImage = player1.sprites.Right;
      break;
    case 37:
      console.log("Left");
      player1.velocity.x -= 5;
      player1.currentImage = player1.sprites.Left;
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 38:
      // console.log("Up");
      player1.velocity.y = 0;
      break;
    case 40:
      // console.log("Down");
      player1.velocity.y = 0;
      break;
    case 39:
      // console.log("Right");
      player1.velocity.x = 0;
      break;
    case 37:
      // console.log("Left");
      player1.velocity.x = 0;
      break;
  }
});

//CountDown Timer
const countDownElement = document.getElementById("Timer");
const seconds = 30;

function startCountdown(seconds) {
  let currentSeconds = seconds;

  const countdownInterval = setInterval(function () {
    // Display the countdown
    countDownElement.innerHTML = currentSeconds;

    // If the countdown is over, display a message or perform an action
    if (currentSeconds === 0) {
      clearInterval(countdownInterval);
      gameOver();
      document.getElementById("GameOverScore").textContent = `${score}`;
    } else {
      currentSeconds--;
    }
  }, 1000);
}

startCountdown(seconds);

//Game Over Function
function gameOver() {
  document.getElementById("GameOver").style.display = "block";
  player1.position.x=10000;
  player1.position.y=10000;
}

//Tabulating the scoresheet
const scoreElement = document.getElementById("scoreValue");
let score = 0;

//Audios
const yummy = document.getElementById("delicious");
const reddy = document.getElementById("poisonous");

//To update score
function updateScore() {
  scoreElement.textContent = `${score}`;
}

//To increase score
function increaseScore() {
  score++;
  updateScore();
}

//To decrease score
function decreaseScore() {
  score--;
  updateScore();
}

// food
function disappearfood1(food1) {
  console.log("Disappear");
  const maxX = 1800;
  const maxY = 350;
  food1.position.x = Math.min(Math.random() * maxX, maxX);
  food1.position.y = Math.min(Math.random() * maxY, maxY);
  yummy.play();
}

function collisionfood(player1, food1) {
  const collision =
    player1.position.x + player1.width >= food1.position.x &&
    player1.position.x <= food1.position.x + food1.width &&
    player1.position.y + player1.height >= food1.position.y &&
    player1.position.y <= food1.position.y + food1.height;

  if (collision) {
    console.log("Collision Detected");
    increaseScore();
    disappearfood1(food1);
  }
}

function collisionPoison(player1, poison) {
  const collision =
    player1.position.x + player1.width >= poison.position.x &&
    player1.position.x <= poison.position.x + poison.width &&
    player1.position.y + player1.height >= poison.position.y &&
    player1.position.y <= poison.position.y + poison.height;

  if (collision) {
    console.log("Collision Detected");
    decreaseScore();
    disappearPoison(poison);
  }
}

function disappearPoison(poison) {
  console.log("Disappear");
  const maxyX = 1800;
  const maxyY = 350;
  poison.position.x = Math.min(Math.random() * maxyX, maxyX);
  poison.position.y = Math.min(Math.random() * maxyY, maxyY);
  reddy.play();
}

 
function startGame(){
    location.reload();
}

const restartButton = document.getElementById("button");
restartButton.addEventListener('click', startGame);