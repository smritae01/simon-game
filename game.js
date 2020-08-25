
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var start=false;
var level = 0;

$(document).keypress(function(){

    if (!start){
      $("#level-title").text("Level "+level);
      nextSequence();
      start = true;
    }


});




$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer((userClickedPattern.length)-1);
});

function nextSequence(){

  userClickedPattern = [];
  level = level+1;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else{
    console.log("fail");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over! Press any key to Restart");
    $(document).keypress(startOver());

  }


}

function startOver(){
  level = 0;
  gamePattern =[];
  start = false;
}
