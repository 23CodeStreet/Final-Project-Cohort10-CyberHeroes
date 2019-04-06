
var canvas = document.querySelector("#screen")
canvas.width = 700;
canvas.height = 500;


var ctx = canvas.getContext("2d");

ctx.font = "30px Georgia";
ctx.fillText("Click to start...", canvas.width/2.8, canvas.height/2)



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
var state = {
  upPressed: false,
  leftPressed: false,
  rightPressed: false,
  downPressed: false,
  student: {
    y: canvas.height / 8,
    x: canvas.width / 8,
    size: 40,
  },
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
    questionPage();
    console.log(state.coins.splice(i, 1));
  }
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

function clearScreen() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function mapScreen() {
  var map = document.getElementById("map");
  ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
}


function gameOver() {
  clearScreen();
  ctx.font = "20px Georgia";
  ctx.fillText("Game Over!", canvas.width/2.5, canvas.height/2);
  setTimeout (draw, 0);
  canvas.addEventListener("click", function(){location.reload(false);});
}

function questionPage() {
  clearScreen();
  ctx.fillStyle = "black";
  ctx.font = "20px Georgia";
  ctx.fillText("Question question question question question", canvas.width/4, canvas.height/2);
}



// Draw loop
function draw() {
  mapScreen();
  drawStudent();
  drawCoins();

  moveStudent();
  studentMeetCoin();
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
