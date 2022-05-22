import {Screen_SelectValues} from './Screen_SelectValues.js'
import {Screen_Base} from './Screen_Base.js'
// import {Screen_Base} from './Screen_Base.js'

let CurrentIndex = 0;
let Screens = [];


if (document.readyState == 'loading')
{
   document.addEventListener("DOMContentLoaded", Setup);
}
else
{
    Setup();
}

function Setup()
{
    let SelectValuesScreen = new Screen_SelectValues('Screen-SelectValues');
    let RefineValuesScreen = new Screen_Base('Screen-RefineValues');
    
    Screens.push(SelectValuesScreen);
    Screens.push(RefineValuesScreen);
    
    
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
    
    // SelectValuesScreen.SetVisiblity(false);
    
    // Screens = document.getElementsByClassName('Screen-Container');
    //ChangeScreen(CurrentIndex);
}


function CreateDebugBlock(posX, posY, color, parent)
{
	let NewElement = document.createElement("div");
	NewElement.style.backgroundColor = color;
	NewElement.style.width = "10px";
	NewElement.style.height = "10px";
	NewElement.style.position = "absolute";
	NewElement.style.left = posX;
	NewElement.style.top = posY;
	parent.appendChild(NewElement);
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
        Screens[CurrentIndex].SetVisibility(false);
    }
    CurrentIndex = screenIndex;
    Screens[CurrentIndex].SetVisibility(true);
}