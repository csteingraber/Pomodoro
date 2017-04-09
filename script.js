// click up button + logic
var started = false;
var $sessionTime = $('.bottom span:nth-child(2)');
var $breakTime = $('.bottom span:nth-child(5)');

function incrementPomodoro(time) {
    var incrementedNumber = parseInt(time.html()) + 1;
    time.html(incrementedNumber.toString());
}
// Time Function + logic
function scoreBoard(number) {
    // Number is time measured in seconds
    var hour = Math.floor(number/3600);
    number = number - (hour * 3600);
    
    if(hour === 0) {
        hour = "";
    } else if(hour < 10) {
        hour = "0" + hour + ":";
    } else {
        hour = hour.toString() + ":";
    }
    
    var minute = Math.floor(number/60);
    number = number - (minute * 60);
    
    if(minute === 0) {
        minute = "00:";
    } else if(minute < 10) {
        minute = "0" + minute + ":";
    } else {
        minute = minute.toString() + ":";
    }
    
    var second = number;
    
     if(second === 0) {
        second = "00";
    } else if(second < 10) {
        second = "0" + second;
    } else {
        second = second.toString();
    }
    var time = $('.lower-selector').children(".bottom").prev();
    time.html(hour + minute + second);
}
// click down button + logic
function decreasePomodoro(time){
    var decreasedNumber = parseInt(time.html()) - 1;
    if (decreasedNumber < 0) {
        decreasedNumber = 0;   
    }
    time.html(decreasedNumber.toString());
}
// click play button + logic

// click refresh button + logic

// click pause button + logic

// click stop button + logic

$(document).ready(function() {
   // Up arrow for increasing minutes
    $('.upper-selector .bottom a:nth-child(3) i').click(function() {
        incrementPomodoro($sessionTime);
        scoreBoard(parseInt($sessionTime.html()) * 60);
    });
    $('.upper-selector .bottom a:last-child i').click(function(){
        incrementPomodoro($breakTime);
    });
  // Down arrow for decreasing minutes
    $('.upper-selector .bottom a:first-child i').click(function(){
        decreasePomodoro($sessionTime);
        scoreBoard(parseInt($sessionTime.html()) * 60)
    });
    $('.upper-selector .bottom a:nth-child(4) i').click(function(){
        decreasePomodoro($breakTime);
    });
    $('.fa-play').click(function() {
        var secondsLeft = parseInt($sessionTime.html()) * 60;
        
        var loop = setInterval(function() {
                scoreBoard(secondsLeft);
            if(secondsLeft > 0) {
                secondsLeft = secondsLeft - 1;
            } else {
                clearInterval(loop);
                secondsLeft = parseInt($breakTime.html()) * 60;
                var loop2 = setInterval(function() {
                    scoreBoard(secondsLeft);
                    if(secondsLeft > 0) {
                        secondsLeft = secondsLeft - 1;
                    } else {
                        clearInterval(loop2);
                    }
                }, 1000);
            }
        }, 1000);
    });
});