
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