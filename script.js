
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

let ValueCard = document.getElementById("ValueCard");

let DifferenceX;
let DifferenceY;

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
	
	ValueCard.style.left = "10%";
	ValueCard.style.top = "30%";
}

function TouchStart(event)
{    
    console.log("start");    
    var touchLocation = event.targetTouches[0];
	var rect = ValueCard.getBoundingClientRect();
	ValueCard.parentElement.getBoundingClientRect();
	
	ValueCard.style.marginTop;
	
	DifferenceX = rect.left - touchLocation.pageX;
	DifferenceY = rect.top - touchLocation.pageY;
	
	CreateDebugBlock(ValueCard.style.left + DifferenceX, ValueCard.style.top + DifferenceY, "green", document.firstChild);
	// CreateDebugBlock(touchLocation.pageX, touchLocation.pageY, "purple", document.firstChild);
			
    event.preventDefault();
}
function TouchMove(event)
{    
    console.log("drag");   
    var touchLocation = event.targetTouches[0];
	console.log("New touch x: " + touchLocation.pageX + " y: " + touchLocation.pageY);
    
	var rect = ValueCard.getBoundingClientRect();	
	
    let NewX = touchLocation.pageX + DifferenceX;
    let NewY = touchLocation.pageY + DifferenceY;
	console.log("New x: " + NewX + " y: " + NewY);
	
    ValueCard.style.left = NewX + 'px';
    ValueCard.style.top = NewY + 'px';
	const EndX = rect.left + (rect.right - rect.left) / 2;
	const EndY = rect.bottom - (rect.bottom - rect.top) / 2;
	// CreateDebugBlock(rect.left, rect.top, "pink", document.firstChild);
	// CreateDebugBlock(touchLocation.pageX, touchLocation.pageY, "blue", document.firstChild);
	// CreateDebugBlock(EndX, EndY, "blue", document.firstChild);
    
    event.preventDefault(); 
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
        Screens[CurrentIndex].classList.add('hidden');
    }
    CurrentIndex = screenIndex;
    Screens[CurrentIndex].classList.remove('hidden');
}