var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var level = 0;
var currentMove = 0;

$(document).on("keydown",function(event){
    if(level === 0){
        nextSequence();
    }
});

$(".btn").click(function(event){
    if(level !== 0){
        var userChoosenColor = event.currentTarget.id;
        userClickedPattern.push(userChoosenColor);
        playSound(userChoosenColor);
        animatePress(userChoosenColor);
        
        if(userClickedPattern[currentMove] === gamePattern[currentMove]){
            currentMove++;
            if(currentMove===level){
                currentMove=0;
                userClickedPattern=[];
                setTimeout(function(){
                    nextSequence();
                },500);
            }
        }
        else{
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            playSound("wrong");
            $("h1").text("Game Over, Press Any Key to Restart");
            currentMove=0;
            level=0;
            userClickedPattern=[];
            gamePattern=[];
        }
    }
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);

    level++;
    $("h1").text("Level "+level);
}

function playSound(name){
    var buttonSound = new Audio("./sounds/"+name+".mp3");
    buttonSound.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}