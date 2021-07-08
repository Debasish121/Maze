var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
$("button").addClass(".pressed");



var started = false, level = 0;
// Keypress
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});


// Check Answer
function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Success");

    if (userClickedPattern.length === gamePattern.length){

      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  }
  else{

    console.log("Wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}



// Button is clicked
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  // Play Sound Function
  playSound(userChosenColor);
  // Animate Clicked Button
  animatePress(userChosenColor);
  //Calling checkAnswer
  checkAnswer(userClickedPattern.length-1);
});



// Generate Random Color
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randowChosenColor = buttonColors[randomNumber];
  gamePattern.push(randowChosenColor);

  $("#" + randowChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randowChosenColor);
}


// Play Sound on click
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// Animate Pressed
function animatePress(chosenColor) {
  $("#" + chosenColor).addClass("pressed");
  setTimeout(function() {
    $("#" + chosenColor).removeClass("pressed");
  }, 100);
}

// Start over
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
