var config = {
  apiKey: "AIzaSyBdXMAqBSGzT8vPmguIgujNzECmrFBtuN4",
  authDomain: "cyberheroes23codestreet.firebaseapp.com",
  databaseURL: "https://cyberheroes23codestreet.firebaseio.com",
  projectId: "cyberheroes23codestreet",
  storageBucket: "",
  messagingSenderId: "950759329468"
};

firebase.initializeApp(config);

var myFBref = new Firebase("https://cyberheroes23codestreet.firebaseio.com");

function save(){
  var newScore = {};
    newScore.name = document.getElementById("name").value; //should eventually be state.username
    newScore.score = parseInt(document.getElementById("score").value); // should eventually be state.runningscore
    myFBref.push(newScore);
}
myFBref.orderByChild("score").on("child_added", function(data){
  childScore = data.val();
  document.getElementById("scores").innerHTML += childScore.name + " --- " + childScore.score + "<br>";
});
