

var canvas = document.querySelector("#screen")
canvas.width = 700;
canvas.height = 500;


var ctx = canvas.getContext("2d");
// Object variables

var button1 = {
  x: 200,
  y: 250,
  width: 100,
  height: 50,
  text:"Yes"
}

var button2 = {
  x: 400,
  y: 250,
  width: 100,
  height: 50,
  text:"No"
}

var reloadButton = {
  x: 300,
  y: 200,
  width: 150,
  height: 50,
  text:"Try Again"
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
    noCoins: false,
  },
  student: {
    y: canvas.height / 8,
    x: canvas.width / 8,
    size: 40,
  },
  buttons: [button1,button2],
  timeInterval: 20,
  coins: [],
  runningscore:0,
};


var coinSound = document.getElementById("coinSound");
var correctSound = document.getElementById("correctSound");
var incorrectSound = document.getElementById("incorrectSound");

var coin1 = {
  size: 20,
  x: Math.floor(Math.random()*(3*canvas.width/10))+(canvas.width/10),
  y: Math.floor(Math.random()*(3*canvas.height/10))+(canvas.height/10),
  question1:"One of your online friends is going to help you with",
  question2: "your homework, but has asked for your password.",
  question3: "Should you give it to them?",
  correctAnswer: state.buttons[1]

}

var coin2 = {
  size: 20,
  x: Math.floor(Math.random()*(3*canvas.width/10))+(canvas.width/10),
  y: Math.floor(Math.random()*(3*canvas.height/10))+(canvas.height/2),
  question1:"I always forget my passwords,",
  question2:"it's so hard to remember them all",
  question3:"Can I just use the same easy one for all my accounts?",
  correctAnswer: state.buttons[1]

}

var coin3 = {
  size: 20,
  x: Math.floor(Math.random()*(3*canvas.width/10))+(canvas.width/2),
  y: Math.floor(Math.random()*(3*canvas.height/10))+(canvas.height/10),
  question1:"Someone sends you a message online,",
  question2:"they want to meet you at the park on Saturday.",
  question3:"Should you go?",
  correctAnswer: state.buttons[1]

}

var coin4 = {
  size: 20,
  x: Math.floor(Math.random()*(3*canvas.width/10))+(canvas.width/2),
  y: Math.floor(Math.random()*(3*canvas.height/10))+(canvas.height/2),
  question1:"One of your online friends wants to send you a present",
  question2:"and they have asked you to give them your address.",
  question3:"Should you give it to them?",
  correctAnswer: state.buttons[1]

}

// Coin code

state.coins=[coin1,coin2,coin3,coin4];


function drawCoins() {
  var yellowCoin = document.getElementById("coin");
  for (var i = 0; i < state.coins.length; i = i + 1) {
    var coin = state.coins[i];
  ctx.drawImage(yellowCoin, coin.x, coin.y, coin.size, coin.size);
  }
}


//Score Code

function drawScore(){
  ctx.fillStyle = "black";
	ctx.font = "40px Courier New";
  ctx.fillText("Score:" + state.runningscore, 50, 50);
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
		state.touchedCoin = coin;
		state.gameMode.question = true;
		state.coins.splice(i,1)
		coinSound.play();
    state.questionTimer = 1000;
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


function mapScreen() {
  var map = document.getElementById("map");
  ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
}

function clearScreen() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function questionPage() {
  if(state.gameMode.question) {
  clearScreen();
	ctx.fillStyle = "black";
	ctx.font = "20px Courier New";
	ctx.fillText(state.touchedCoin.question1, canvas.width/18, canvas.height/4);
  ctx.fillText(state.touchedCoin.question2, canvas.width/18, canvas.height/3);
  ctx.fillText(state.touchedCoin.question3, canvas.width/18, 5*canvas.height/12);
  ctx.fillText(state.questionTimer, canvas.width/6, canvas.height/8);
	yesButton();
	noButton();
  }

  if(state.questionTimer>0){
    state.questionTimer--;
  }
}


// Buttons in question page code

function yesButton() {
  var button = state.buttons[0];
  ctx.fillStyle = 'yellow';
  ctx.fillRect(button.x, button.y, button.width, button.height);

  ctx.fillStyle = "black";
  ctx.fillText("Yes", button.x+30, button.y+30);

}


function noButton() {
  var button = state.buttons[1];
  ctx.fillStyle = 'red';
  ctx.fillRect(button.x, button.y, button.width, button.height);

  ctx.fillStyle = "black";
  ctx.fillText("No", button.x + 30, button.y + 30);

}


// Answering questions

function questionPageDisappears(){
  state.gameMode.question = false;
  if (state.coins.length === 0) {
    state.gameMode.noCoins = true;
  }
}


canvas.addEventListener('click', function(event) {
	var sc = document.getElementById("screen");
	var xClick = event.x + window.scrollX - sc.offsetLeft;
	var yClick = event.y + window.scrollY - sc.offsetTop;

	for(var i = 0; i < state.buttons.length; i = i + 1){
		var button = state.buttons[i];
		if (xClick > button.x &&
		    xClick < button.x + button.width &&
		    yClick > button.y &&
		    yClick < button.y + button.height) {

    if (button == state.touchedCoin.correctAnswer) {
        state.runningscore += state.questionTimer;
        correctSound.play();
      } else {
        incorrectSound.play();
      }

      questionPageDisappears();
		  }
	   }
  })


  function leaderBoard() {
    if(state.gameMode.noCoins)  {
      clearScreen();
      console.log("no coins");
    	ctx.fillStyle = "black";
    	ctx.font = "20px Courier New";
    	ctx.fillText("You are a Cyber Hero. Your score is " + state.runningscore, canvas.width/6, canvas.height/4);

      ctx.fillStyle = 'red';
      ctx.fillRect(reloadButton.x, reloadButton.y, reloadButton.width, reloadButton.height);

      ctx.fillStyle = "black";
      ctx.fillText("Try Again", reloadButton.x + 10, reloadButton.y + 30);

      var wizard = document.getElementById("wizard");
      ctx.drawImage(wizard, canvas.width/2 - 50, 270, 200, 200);

      canvas.addEventListener("click", function(){location.reload(true);});
    }
  }


// Draw loop
function draw() {
		mapScreen();
		drawStudent();
		drawCoins();
    drawScore();
    moveStudent();
    studentMeetCoin();


		questionPage();
    leaderBoard();
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
