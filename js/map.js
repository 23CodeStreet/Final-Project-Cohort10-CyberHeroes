
var canvas = document.querySelector("#screen")
canvas.width = 700;
canvas.height = 500;


var ctx = canvas.getContext("2d");

// Object variables

var coinSound = new sound("sounds/coinsound.mp3");

var coin1 = {
  size: 20,
  x: canvas.width - 50,
  y: 50

}
var coin2 = {
  size: 20,
  x: 100,
  y: 200

}
var coin3 = {
  size: 20,
  x: canvas.width - 300,
  y: canvas.height - 100

}
var coin4 = {
  size: 20,
  x: 200,
  y: 300

}

var button1 = {
  x: 200,
  y: 250,
  width: 100,
  height: 50
}

var button2 = {
  x: 400,
  y: 250,
  width: 100,
  height: 50
}

var button3 = {
  x: 300,
  y: 350,
  width: 100,
  height: 50
}

var state = {
  upPressed: false,
  leftPressed: false,
  rightPressed: false,
  downPressed: false,
  gameMode: {
    question: false,
    yesButton: false,
    noButton: false,
  },
  student: {
    y: canvas.height / 8,
    x: canvas.width / 8,
    size: 40,
  },
  buttons: [button1,button2,button3],
  timeInterval: 20,
  coins: [coin1,coin2,coin3,coin4],
};



// Coin code

function drawCoins() {
  var yellowCoin = document.getElementById("coin");
  for (var i = 0; i < state.coins.length; i = i + 1) {
    var coin = state.coins[i];
  ctx.drawImage(yellowCoin, coin.x, coin.y, coin.size, coin.size);
  }
}



// Student code
function drawStudent() {
  var student = document.getElementById("student");
  ctx.drawImage(student, state.student.x, state.student.y, state.student.size, state.student.size);
}



function studentMeetCoin() {
  for (var i = 0; i < state.coins.length; i = i + 1) {
    var coin = state.coins[i];
    if (coin.y <= state.student.y + state.student.size &&
      state.student.y <= coin.y + coin.size &&
      coin.x <= state.student.x + state.student.size &&
      state.student.x <= coin.x + coin.size) {
    state.gameMode.question = true;
    state.coins.splice(i,1)
    coinSound.play();
    }
  }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}


function moveStudent() {
  if (state.upPressed) {
      state.student.y = state.student.y - 4;
    }
   else if (state.downPressed) {
      state.student.y = state.student.y + 4;
  } else if (state.leftPressed) {
      state.student.x = state.student.x - 4;
  } else if (state.rightPressed) {
      state.student.x = state.student.x + 4;
  } else {
      state.student.x = state.student.x;
      state.student.y = state.student.y;
  }
}


// General code


function mapScreen() {
  var map = document.getElementById("map");
  ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
}

function clearScreen() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}



// Buttons in question page code

function yesButton() {
  var button = state.buttons[0];
  ctx.fillStyle = 'yellow';
  ctx.fillRect(button.x, button.y, button.width, button.height);

  ctx.fillStyle = "black";
  ctx.fillText("Yes", button.x+30, button.y+30);

  canvas.addEventListener('click', function(event) {
    if (
      event.x > button.x &&
      event.x < button.x + button.width &&
      event.y > button.y &&
      event.y < button.y + button.height
    ) {
      state.gameMode.yesButton = true;
    }
  });
}


function noButton() {
  var button = state.buttons[1];
  ctx.fillStyle = 'red';
  ctx.fillRect(button.x, button.y, button.width, button.height);

  ctx.fillStyle = "black";
  ctx.fillText("No", button.x+30, button.y+30);

  canvas.addEventListener('click', function(event) {
    if (
      event.x > button.x &&
      event.x < button.x + button.width &&
      event.y > button.y &&
      event.y < button.y + button.height
    ) {
      state.gameMode.noButton = true;
    }
  });

  coinSound.play();
}

function continueButton() {
  var button = state.buttons[2];
  ctx.fillStyle = 'blue';
  ctx.fillRect(button.x, button.y, button.width, button.height);

  ctx.fillStyle = "black";
  ctx.fillText("Continue", button.x+5, button.y+30);

canvas.addEventListener('click', questionPageDisappears)

}

function answerButton() {
  if (state.gameMode.yesButton) {
    alert('Yes button was clicked!');
  }
  else if (state.gameMode.noButton) {
    alert('No button was clicked!');
  }
}

function questionPageDisappears() {
  state.gameMode.question = false;
}

// Question page code


function questionPage() {
  if(state.gameMode.question) {
  clearScreen();
  ctx.fillStyle = "black";
  ctx.font = "20px Courier New";
  ctx.fillText("Question question question question question", canvas.width/6, canvas.height/4);
  yesButton();
  noButton();
  continueButton();
  }
}

// canvas.addEventListener("click", questionPageDisappears);

// Draw loop
function draw() {
  mapScreen();
  drawStudent();
  drawCoins();

  moveStudent();
  studentMeetCoin();
  questionPage();
  answerButton();

}



// User input code
  var body = document.getElementById("body");

window.addEventListener("load", function(){ setInterval(draw, state.timeInterval);})



  function upKeyDown(e) {
    if (e.keyCode === 38) {
      state.upPressed = true;
    }
  }
  body.addEventListener("keydown", upKeyDown);

  function upKeyUp(e) {
    if (e.keyCode === 38) {
      state.upPressed = false;
    }
  }
  body.addEventListener("keyup", upKeyUp);

  function downKeyDown(e) {
    if (e.keyCode === 40) {
      state.downPressed = true;
    }
  }
  body.addEventListener("keydown", downKeyDown);

  function downKeyUp(e) {
    if (e.keyCode === 40) {
      state.downPressed = false;
    }
  }
  body.addEventListener("keyup", downKeyUp);

  function leftKeyDown(e) {
    if (e.keyCode === 37) {
      state.leftPressed = true;
    }
  }
  body.addEventListener("keydown", leftKeyDown);

    function leftKeyUp(e) {
      if (e.keyCode === 37) {
        state.leftPressed = false;
      }
    }
    body.addEventListener("keyup", leftKeyUp);

  function rightKeyDown(e) {
    if (e.keyCode === 39) {
      state.rightPressed = true;
    }
  }
  body.addEventListener("keydown", rightKeyDown);

  function rightKeyUp(e) {
    if (e.keyCode === 39) {
      state.rightPressed = false;
    }
  }
  body.addEventListener("keyup", rightKeyUp);
