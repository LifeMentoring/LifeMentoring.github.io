
if (document.readyState == 'loading')
{
   document.addEventListener("DOMContentLoaded", Setup);
}
else
{
    Setup();
}

let CurrentIndex = 0;
let Screens;

let ValueCard;
let startTouchLocationX;
let startTouchLocationY;
function Setup()
{
    Screens = document.getElementsByClassName('Screen-Container');
    ChangeScreen(CurrentIndex);
    
    const NextButton = document.getElementById('NextButton');
    if (NextButton)
    {
        NextButton.addEventListener('click', NextClicked);
    }
    const PreviousButton = document.getElementById('PreviousButton');
    
    if (PreviousButton)
    {
        PreviousButton.addEventListener('click', PreviousClicked);
    }
    
    ValueCard = document.getElementById("ValueCard");
    // Add the ondragstart event listener
    ValueCard.addEventListener("touchmove", TouchMove);
    ValueCard.addEventListener("touchstart", TouchStart);
}

function TouchStart(event)
{    
    console.log("start");    
    var touchLocation = event.targetTouches[0];
    startTouchLocationX = touchLocation.pageX - ValueCard.style.left;
    startTouchLocationY = touchLocation.pageY - ValueCard.style.top;
    event.preventDefault();
}
function TouchMove(event)
{    
    console.log("drag");   
    var touchLocation = event.targetTouches[0];
    
    let NewX = touchLocation.pageX - (startTouchLocationX / 2.0);
    let NewY = touchLocation.pageY - (startTouchLocationY / 2.0);
    ValueCard.style.left = (NewX) + 'px';
    ValueCard.style.top = (NewY) + 'px';
    
    event.preventDefault(); 
}


function NextClicked()
{
    ChangeScreen(CurrentIndex + 1);
}
function PreviousClicked()
{
    ChangeScreen(CurrentIndex - 1);
}

function ChangeScreen(screenIndex)
{
    if (screenIndex >= Screens.length || screenIndex < 0)
    {
        // Invalid
        return;
    }
    if (CurrentIndex < Screens.length)
    {
        Screens[CurrentIndex].classList.add('hidden');
    }
    CurrentIndex = screenIndex;
    Screens[CurrentIndex].classList.remove('hidden');
}