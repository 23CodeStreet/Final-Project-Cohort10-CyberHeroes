

var canvas = document.querySelector("#screen")
canvas.width = 700;
canvas.height = 500;


var ctx = canvas.getContext("2d");
// Object variables

var button1 = {
  x: 250,
  y: 220,
  width: 100,
  height: 50,
  text:"Yes"
}

var button2 = {
  x: 450,
  y: 220,
  width: 100,
  height: 50,
  text:"No"
}

var reloadButton = {
  x: 290,
  y: canvas.height/2,
  width: 130,
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
    y: canvas.height / 10,
    x: canvas.width / 10,
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
  question1:"One of your online friends is",
  question2: "going to help you with your",
  question3: "homework, but has asked for",
  question4: "your password.",
  question5: "Should you give it to them?",
  correctAnswer: state.buttons[1]

}

var coin2 = {
  size: 20,
  x: Math.floor(Math.random()*(3*canvas.width/10))+(canvas.width/10),
  y: Math.floor(Math.random()*(3*canvas.height/10))+(canvas.height/2),
  question1:"I always forget my passwords,",
  question2:"it's so hard to remember them",
  question3:"all. Can I just use the same",
  question4:"easy one for all of my",
  question5:"accounts?",
  correctAnswer: state.buttons[1]

}

var coin3 = {
  size: 20,
  x: Math.floor(Math.random()*(3*canvas.width/10))+(canvas.width/2),
  y: Math.floor(Math.random()*(3*canvas.height/10))+(canvas.height/10),
  question1:"Someone sends you a message",
  question2:"online. They want to meet you",
  question3:"at the park on Saturday.",
  question4:"Should you go?",
  question5:" ",
  correctAnswer: state.buttons[1]

}

var coin4 = {
  size: 20,
  x: Math.floor(Math.random()*(3*canvas.width/10))+(canvas.width/2),
  y: Math.floor(Math.random()*(3*canvas.height/10))+(canvas.height/2),
  question1:"One of your online friends",
  question2:"wants to send you a present",
  question3:"and they have asked you",
  question4:"to give them your address.",
  question5:"Should you give it to them?",
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
  ctx.fillText("Score:" + state.runningscore, 20, 40);
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

function questionPageScreen() {
  var wizardHorse = document.getElementById("wizardHorse");
  ctx.drawImage(wizardHorse, 0, 0, canvas.width, canvas.height);
}

function endPageScreen() {
  var speechBubble = document.getElementById("speechBubble");
  ctx.drawImage(speechBubble, 0, 0, canvas.width, canvas.height);
}


function questionPage() {
  if(state.gameMode.question) {
  questionPageScreen();
	ctx.fillStyle = "black";
	ctx.font = "20px Courier New";
	ctx.fillText(state.touchedCoin.question1, canvas.width/3, canvas.height/5);
  ctx.fillText(state.touchedCoin.question2, canvas.width/3, 5*canvas.height/20);
  ctx.fillText(state.touchedCoin.question3, canvas.width/3, 6*canvas.height/20);
  ctx.fillText(state.touchedCoin.question4, canvas.width/3, 7*canvas.height/20);
  ctx.fillText(state.touchedCoin.question5, canvas.width/3, 8*canvas.height/20);
  ctx.fillText(state.questionTimer, canvas.width/13, canvas.height/8);
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
  ctx.fillText("Yes", button.x + 30, button.y + 30);

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
      endPageScreen();
      console.log("no coins");
    	ctx.fillStyle = "black";
    	ctx.font = "20px Courier New";
    	ctx.fillText("Congratulations!", canvas.width/3 + 10, canvas.height/9);
      ctx.fillText("You are a Cyber Hero.", canvas.width/3, 2*canvas.height/9);
      ctx.fillText("Your score is " + state.runningscore, canvas.width/3 + 10, 3*canvas.height/9);
      ctx.fillText("Want to improve your score?", canvas.width/3 - 42, 4*canvas.height/9);

      ctx.fillStyle = 'red';
      ctx.fillRect(reloadButton.x, reloadButton.y, reloadButton.width, reloadButton.height);

      ctx.fillStyle = "black";
      ctx.fillText("Try Again", reloadButton.x + 10, reloadButton.y + 30);

      var studentFront = document.getElementById("studentFront");
      ctx.drawImage(studentFront, 10, 280, 150, 150);

      var wizard = document.getElementById("wizard");
      ctx.drawImage(wizard, 170, 350, 100, 100);

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
