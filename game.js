let flashDuration = 300;

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;


function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // animate the button
  $("#" + randomChosenColor).fadeToggle(flashDuration).fadeToggle(flashDuration);

  // play sound effect
  playSound(randomChosenColor);

  level++;
  $("#level-title").text("Level: " + level);
}

function animatePress(button) {
  button.addClass("pressed");
  setTimeout(function () {
    button.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log(userClickedPattern);
  console.log(gamePattern);

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === level - 1) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    let player = new Audio("sounds/wrong.mp3");
    player.play();

    $("body").addClass("game-over");
    $("#level-title").text("Game Over. Press any key to restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

$(".btn").on("click", function () {
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);

  animatePress($(this));

  checkAnswer(userClickedPattern.length - 1);
});


$(document).on("keydown", function () {
  if (gameStarted === false) {
    $("#level-title").text("Level: 0");
    nextSequence();
    gameStarted = true;
  }
})
