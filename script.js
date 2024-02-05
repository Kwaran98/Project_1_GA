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

    this.image = document.getElementById("whale");
  }

  draw() {
    c.drawImage(
      this.image,
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
const food2 = new Food();
const poison1 = new Poison();
const poison2 = new Poison();

food2.position.x = 1700;
food2.position.y = 200;
poison2.position.x = 1000;
poison2.position.y = 300;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height); //this method basically allows us to maintain our player's shape
  player1.update();
  food1.draw();
  food2.draw();
  poison1.draw();
  poison2.draw();
  collisionfood(player1, food1);
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
      break;
    case 37:
      console.log("Left");
      player1.velocity.x -= 5;
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

const scoreElement = document.getElementById("scoreValue");
let score = 0;

//To update score
function updateScore() {
  scoreElement.textContent = `${score}`;
}

function disappearfood1(food1) {
  console.log("Disappear");
  food1.position.y += 100;
  food1.width = 0;
  food1.height = 0;
}

function increaseScore() {
  score++;
  updateScore();
}

function decreaseScore() {
  score--;
  updateScore();
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


// updateScore();
// function gameLoop() {
//   c.clearRect(0, 0, canvas.width, canvas.height);

//   player1.update();
//   const collision =
//     player1.position.x

//   if (collision) {
//     console.log("Collision clause in 127");
//     updateScore();
//   }

//   requestAnimationFrame(gameLoop);
// }

// gameLoop();
