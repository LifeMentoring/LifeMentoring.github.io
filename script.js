import {Screen_SelectValues} from './Screen_SelectValues.js'
import {Screen_RefineValues} from './Screen_RefineValues.js'
import {Screen_Base} from './Screen_Base.js'

const TicksPerSecond = 60;
const DeltaTime = 1 / 60;

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
    let RefineValuesScreen = new Screen_RefineValues('Screen-RefineValues');
    let CompareValuesScreen = new Screen_Base('Screen-CompareValues');
    let TopValuesScreen = new Screen_Base('Screen-TopValues');
    
    Screens.push(SelectValuesScreen);
    Screens.push(RefineValuesScreen);
    Screens.push(CompareValuesScreen);
    Screens.push(TopValuesScreen);
    
    
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
    
    ChangeScreen(CurrentIndex);
	
	setInterval(Tick, DeltaTime, DeltaTime);
	
}

function Tick(DeltaTime)
{
	Screens[CurrentIndex].Tick(DeltaTime);
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