import {Screen_SelectValues} from './Screen_SelectValues.js'
import {Screen_RefineValues} from './Screen_RefineValues.js'
import {Screen_Base} from './Screen_Base.js'
import {Dev} from './Dev.js'

const TicksPerSecond = 60;
const DeltaTime = 1 / 60;

let CurrentIndex = 0;
let Screens = [];

let DevObject;
const bDevEnabled = true;

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
    if (bDevEnabled)
    DevObject = new Dev(DevScreenComplete);
    
    let SelectValuesScreen = new Screen_SelectValues('Screen-SelectValues', ScreenComplete);
    let RefineValuesScreen = new Screen_RefineValues('Screen-RefineValues', ScreenComplete);
    let CompareValuesScreen = new Screen_Base('Screen-CompareValues', ScreenComplete);
    let TopValuesScreen = new Screen_Base('Screen-TopValues', ScreenComplete);
    
    Screens.push(SelectValuesScreen);
    Screens.push(RefineValuesScreen);
    Screens.push(CompareValuesScreen);
    Screens.push(TopValuesScreen);
        
    
    ChangeScreen(CurrentIndex);
	
	setInterval(Tick, DeltaTime, DeltaTime);
    
    
    addEventListener("touchstart", TouchStart);
	
}

function TouchStart()
{
    const isAndroid = navigator.userAgent.match(/Android/i);
    // if(isAndroid){
    //     window.scrollTo(0,1);
    //  }
    if (!document.fullscreenElement && isAndroid)
    {
        document.firstChild.requestFullscreen();
    }
}

function Tick(DeltaTime)
{
    if (DevObject)
        DevObject.Tick(DeltaTime);
	Screens[CurrentIndex].Tick(DeltaTime);
}

function DevScreenComplete()
{
    if (CurrentIndex == 0)
    {
        const Values = ["Honesty", "Commitment", "Curiousity", "Wisdom", "Empathy", "Courage", "Patience"
        , "Helpfulness", "Understanding", "Awareness", "Intuition", "Knowledge", "Growth (Quest for knowledge)", "Creativity", "Self Reliance", "Dedication"
        , "Dependability", "Consideration", "Trust", "Humour", "Resilience", "Self Respect", "Optimism", "Contentment", "Sharing", "Caring"
        , "Friendship", "Respect for others", "Integrity"];
        let ImportantValues = [];
        for (let i = 0; i < Values.length; i++)
        {
            if (Math.random() > 0.5)
                ImportantValues.push(Values[i]);
        }
        ScreenComplete(ImportantValues);
    }
    else
        ScreenComplete();
}
function ScreenComplete(info)
{
    ChangeScreen(CurrentIndex + 1);
    Screens[CurrentIndex].ReceivedPreviousScreenInfo(info);
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