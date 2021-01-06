var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


// choose random button, animate random button, plays sound of it an store in gamePattern array
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = ~~(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  ++level;
  $("h1").html("Level " + level);

};



// Starting the game


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Events for clicking the button

$(".btn").click(function(event) {

  var userChosenColour;
  userChosenColour = this.id;
  playSound(this.id);
  animatePress(this.id);

userClickedPattern.push(userChosenColour);


checkAnswer(userClickedPattern.length-1);



});

// Check answer, compare arrays function

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
          nextSequence();
      }, 1000)
    }
  }

  else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 100)
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }

};


// function that plays differenr sounds for different buttons

function playSound(name) {
  switch (name) {
    case "blue":
      var blue = new Audio("sounds/blue.mp3")
      blue.play();
      break;
    case "green":
      var green = new Audio("sounds/green.mp3")
      green.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3")
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3")
      yellow.play();
      break;
    default:


  }
};

// Function that animates clicked button

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

// Resets some vars and arrays to start the new game



function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
};
