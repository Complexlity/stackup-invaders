let alienImage;
let invaders;
let shooterImage;
let player;
let allDebris = [];
let gameOver = false;
let canvas;
let canvasEl;
let loading = 10;
let loadingPlus = true;
let resumeButton;
let upgradedShooterImage;
let upgradedShooterImage2;
let inGameSound;
let gameOverSound;
let startButton = document.querySelector('.start-button')
startButton.addEventListener('click', (e) => {
  e.target.classList.add("hidden");
  gameOver = false;
  setup();
})

const NUM_DEBRIS = 5; // number of space debris

function preload() {
  alienImage = loadImage("assets/images/invader1.png");
  shooterImage = loadImage('assets/images/player.png');
  upgradedShooterImage = loadImage('assets/images/playerv2.png');
  upgradedShooterImage2 = loadImage('assets/images/playerv3.png');
}



function setup() {
  canvasEl = document.getElementById('sketch-holder')
  canvas = createCanvas(canvasEl.offsetWidth, 400);
  canvas.style('display', 'block');
  canvas.parent('sketch-holder');
  invaders = new Invaders(alienImage, 4);
  player = new Player(shooterImage);


  // create the debris objects
  for (let i = 0; i < NUM_DEBRIS; i++) {
    if (allDebris.length < NUM_DEBRIS) {
      allDebris.push(new Debris());
    }
  }
  inGameSound = new Audio("sounds/in-game.wav")
  gameOverSound = new Audio("sounds/fail.wav")
  // Create the resume game button but hide it initially
  resumeButton = createButton('Resume Game');
  resumeButton.class(
    "hover:bg-blue-600 text-white text-xl px-4 py-2 bg-blue-800 rounded-xl"
  );
  resumeButton.position(width / 2 - 40, height / 2 + 220);
  resumeButton.mousePressed(resumeGame);
  resumeButton.hide();

}

function showGameOver() {
  background(0);
  gameOver = true;
  fill(255);
  let gameOverT = "GAME OVER! Click to continue. Your score was " + player.score;
  textSize(16);
  text(gameOverT, width / 2 - textWidth(gameOverT) / 2, height / 2);
  startButton.classList.remove('hidden')
}

function resumeGame() {
  player.resumeGame();
  resumeButton.hide();
  loop();
  let nft = document.getElementById("nft");
  nft.innerHTML = ""
}

function draw() {
  if (gameOver) {
    if(player.gameOver) return
    player.gameOver = true
    gameOverSound.play()
    window.finalGameScore = player.score
    const event = new Event("gameover");
    const customModal = document.querySelector(".congrats-modal");
    customModal.dispatchEvent(event);
    showGameOver();

  } else if (window?.userProfile?.email && window.gameIsStarted) {
    if (!player.gamePaused) {
      if(player.gameOver) player.gameOver = false
        inGameSound.loop = true;
      inGameSound.play();
      background(0);
      player.update();
      updateDebrisAndCheckCollisions();
      invaders.update(player);
    }

    player.draw();
    player.drawInfo();
    invaders.draw();

    // Check if the game needs to be paused
    if (player.gamePaused && resumeButton.elt.style.display === 'none') {
       inGameSound.pause();
      noLoop();
      resumeButton.show();
    }

    if (player.lives == 0) {
      inGameSound.pause()
      gameOver = true;
    }

  } else {
    if (window.gameIsNotOn) return
    const event = new Event('notconnected')
    document.body.dispatchEvent(event)
  }
}

// function mousePressed() {
//   if (gameOver === true) {
//     startButton.classList.add('hidden')
//     gameOver = false;
//     setup();
//   }
// }

function keyPressed() {
  if (keyCode === RIGHT_ARROW || keyCode == 88) {
    player.moveRight();
  } else if (keyCode === LEFT_ARROW || keyCode == 90) {
    player.moveLeft();
  } else if (keyCode === 32) {
    player.shoot();
  }

  if (keyCode === UP_ARROW) {
    player.moveUp()
  } else if (keyCode == DOWN_ARROW) {
    player.moveDown();
  }
}

function updateDebrisAndCheckCollisions() {
  for (let i = 0; i < allDebris.length; i++) {
    allDebris[i].update();
    allDebris[i].display();

    if (allDebris[i].hasHitPlayer(player)) {
      allDebris.splice(i, 1);
      player.loseLife();
      break;
    }
  }
}
function windowResized() {
  resizeCanvas(canvasEl.offsetWidth, 400)
  background(0)
}