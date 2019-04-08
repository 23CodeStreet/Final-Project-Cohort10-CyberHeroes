  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBdXMAqBSGzT8vPmguIgujNzECmrFBtuN4",
    authDomain: "cyberheroes23codestreet.firebaseapp.com",
    databaseURL: "https://cyberheroes23codestreet.firebaseio.com",
    projectId: "cyberheroes23codestreet",
    storageBucket: "",
    messagingSenderId: "950759329468"
  };

firebase.initializeApp(config);

var database = firebase.database();

var resultsContainer = database.ref('/resultscontainer');
//can we get an ID instead?
var button = getTag("button", 0);
button.addEventListener("click", buttonClickHandler)
//-------------------------
function getResultsFromInput(){
  var inputElement = getTag("input", 0);
  return inputElement.value;
  var score = finalscore;
}
  function clearInput() {
    var inputElement = getTag("input", 0);
    inputElement.value = '';
  }
//---------------------------------
function buttonClickHandler(){
  var initials = getResultsFromInput();

  if (initials.length = 3) {
    var results = {
      name: initials,
      score: finalscore;
    };
    clearInput();
    resultsContainer.push(results);

  } else {
    alert("Please enter exactly three letters");
  }
}
// The score needs to come from the state. Can we just use the state as an object and write the state to the DB?
function OrderResults() {
  var sortedDB = database.orderByChild('score');
}
OrderResults() {
  if (resultsContainer.length > 10) {
    resultsContainer.pop(results);
  }
  else {
    return sortedDB;
  }
return sortedDB
}

function renderScoreboard(sortedDB) {
  //can we use an id?
  var scoreBoard = getTag("div", 0);
  var draw = document.createElement("table");
  draw.innerText = sortedDB;
  draw.className = "Scores";
  scoreBoard.appendChild(draw);
}
