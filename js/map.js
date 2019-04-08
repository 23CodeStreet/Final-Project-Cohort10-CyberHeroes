

var canvas = document.querySelector("#screen")
canvas.width = 700;
canvas.height = 500;


var ctx = canvas.getContext("2d");

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
var button3 = {
  x: 300,
  y: 350,
  width: 100,
  height: 50,
  text:"Continue"
}

// Object variables
var state = {
  upPressed: false,
  leftPressed: false,
  rightPressed: false,
  downPressed: false,
  gameMode: {
    question: false,
  },
  student: {
    y: canvas.height / 8,
    x: canvas.width / 8,
    size: 40,
  },
  buttons: [button1,button2,button3],
  timeInterval: 20,
  coins: [],
  runningscore:0,
};


var coinSound = document.getElementById("coinSound");
var correctSound = document.getElementById("correctSound");
var incorrectSound = document.getElementById("incorrectSound");

var coin1 = {
  size: 20,
  x: canvas.width - 50,
  y: 50,
  question:"Question 1: Yes is the right answer",
  correctAnswer: state.buttons[0]

}
var coin2 = {
  size: 20,
  x: 100,
  y: 200,
  question:"Question 2: Yes is the right answer",
  correctAnswer: state.buttons[0]

}
var coin3 = {
  size: 20,
  x: canvas.width - 300,
  y: canvas.height - 100,
  question:"Question 3: No is the right answer",
  correctAnswer: state.buttons[1]

}
var coin4 = {
  size: 20,
  x: 200,
  y: 300,
  question:"Question 4: No is the right answer",
  correctAnswer: state.buttons[1]

}
state.coins=[coin1,coin2,coin3,coin4];
for(var i=0, len = state.coins.length; i<len; i++){
  var x = Math.floor(Math.random()*600)+50
  var y = Math.floor(Math.random()*400)+50
  state.coins[i].x = x;
  state.coins[i].y = y;
}

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

//Score Code

function drawScore(){
  ctx.fillStyle = "black";
	ctx.font = "40px Courier New";
  ctx.fillText("Score:" + state.runningscore, 50, 50);
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

/*function sound(src) {
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
}*/


function moveStudent(direction) {
  /*if (state.upPressed) {
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
  }*/
  if (direction=="up") {
      state.student.y = state.student.y - 4;
    }
   else if (direction=="down") {
      state.student.y = state.student.y + 4;
  } else if (direction=="left") {
      state.student.x = state.student.x - 4;
  } else if (direction=="right") {
      state.student.x = state.student.x + 4;
  } else {
      state.student.x = state.student.x;
      state.student.y = state.student.y;
  }
  studentMeetCoin()
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

// Question page code

function questionPage() {
	clearScreen();
	ctx.fillStyle = "black";
	ctx.font = "20px Courier New";
	ctx.fillText(state.touchedCoin.question, canvas.width/6, canvas.height/4);
  ctx.fillText(state.questionTimer, canvas.width/6, canvas.height/8);
	yesButton();
	noButton();
	continueButton();
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

  /*canvas.addEventListener('click', function(event) {
    if (
      event.x > button.x &&
      event.x < button.x + button.width &&
      event.y > button.y &&
      event.y < button.y + button.height
    ) {
      alert('Yes button was clicked!');
    }
  });*/
}

function noButton() {
  var button = state.buttons[1];
  ctx.fillStyle = 'red';
  ctx.fillRect(button.x, button.y, button.width, button.height);

  ctx.fillStyle = "black";
  ctx.fillText("No", button.x+30, button.y+30);

  /*canvas.addEventListener('click', function(event) {
    if (
      event.x > button.x &&
      event.x < button.x + button.width &&
      event.y > button.y &&
      event.y < button.y + button.height
    ) {
      alert('No button was clicked!');
    }
  });*/

}

function continueButton() {
  var button = state.buttons[2];
  ctx.fillStyle = 'blue';
  ctx.fillRect(button.x, button.y, button.width, button.height);

  ctx.fillStyle = "black";
  ctx.fillText("Continue", button.x+5, button.y+30);

  /*canvas.addEventListener('click', function(event) {
    if (
      event.x < button.x + button.width &&
      event.y > button.y &&
      event.y < button.y + button.height
    ) {
      alert('Continue');
    }
  });*/

}


function questionPageDisappears() {
  state.gameMode.question = false;
}

canvas.addEventListener('click', function(event) {
	var sc = document.getElementById("screen");
	var xClick = event.x + window.scrollX - sc.offsetLeft;
	var yClick = event.y + window.scrollY - sc.offsetTop;
	/*console.log("");
	console.log("Click");
	console.log("x: " + event.x + " y: " + event.y);
	console.log("Modified Click");
	console.log("x: " + xClick + " y: " + yClick);*/
	for(var i = 0, len = state.buttons.length; i<len; i++){
		var button = state.buttons[i];
		/*console.log("Button " + i);
		console.log("x: " + button.x + " y: " + button.y);*/
		if (
		  /*event.x > button.x &&
		  event.x < button.x + button.width &&
		  event.y > button.y &&
		  event.y < button.y + button.height*/
		  xClick > button.x &&
		  xClick < button.x + button.width &&
		  yClick > button.y &&
		  yClick < button.y + button.height
		) {
      if (button == state.touchedCoin.correctAnswer) {
        state.runningscore += state.questionTimer;
        correctSound.play();
      } else {
        //state.runningscore -= state.questionTimer;
        incorrectSound.play();
      }

		  questionPageDisappears();
		}
	}
  });

//canvas.addEventListener("click", questionPageDisappears);

// Draw loop
function draw() {
	if(!state.gameMode.question){
		mapScreen();
		drawStudent();
		drawCoins();
    drawScore();
	} else {
		questionPage();
	}
}



// User input code
  var body = document.getElementById("body");

window.addEventListener("load", function(){ setInterval(draw, state.timeInterval);})



  function upKeyDown(e) {
    if (e.keyCode === 38) {
      //state.upPressed = true;
	  moveStudent("up");
    }
  }
  body.addEventListener("keydown", upKeyDown);

  /*function upKeyUp(e) {
    if (e.keyCode === 38) {
      state.upPressed = false;
    }
  }
  body.addEventListener("keyup", upKeyUp);*/

  function downKeyDown(e) {
    if (e.keyCode === 40) {
      //state.downPressed = true;
	  moveStudent("down");
    }
  }
  body.addEventListener("keydown", downKeyDown);

  /*function downKeyUp(e) {
    if (e.keyCode === 40) {
      state.downPressed = false;
    }
  }
  body.addEventListener("keyup", downKeyUp);#*/

  function leftKeyDown(e) {
    if (e.keyCode === 37) {
      //state.leftPressed = true;
	  moveStudent("left");
    }
  }
  body.addEventListener("keydown", leftKeyDown);

    /*function leftKeyUp(e) {
      if (e.keyCode === 37) {
        state.leftPressed = false;
      }
    }
    body.addEventListener("keyup", leftKeyUp);*/

  function rightKeyDown(e) {
    if (e.keyCode === 39) {
      //state.rightPressed = true;
	  moveStudent("right");
    }
  }
  body.addEventListener("keydown", rightKeyDown);

  /*function rightKeyUp(e) {
    if (e.keyCode === 39) {
      state.rightPressed = false;
    }
  }
  body.addEventListener("keyup", rightKeyUp);*/
