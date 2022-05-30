class Dev
{
    constructor(ScreenCompleteFunction)
    {       
        
        let HeaderImage = document.getElementById("header-LM-logo");
         
        HeaderImage.addEventListener("touchstart", this.TouchStart.bind(event, this));
        HeaderImage.addEventListener("touchmove", this.TouchMove.bind(event, this));
        HeaderImage.addEventListener("touchend", this.TouchEnd.bind(event, this));
        
        this.ScreenCompleteFunction = ScreenCompleteFunction;
        
        this.bHeld = false;
        this.bDebugHeld = false;
        this.StartX = -1;
        this.StartY = -1;
        this.CurrentX = -1;
        this.CurrentY = -1;
        this.HoldDebugTime = 1 * 1000.0;
        
        this.HoldTimeoutIndex = -1;
    }
    	
	Tick(DeltaTime)
	{
        
	}
    
    TouchStart(object, event)
    {
        object.bHeld = true;
        object.bDebugHeld = true;
        object.StartX = event.targetTouches[0].pageX;
        object.StartY = event.targetTouches[0].pageY;
        object.CurrentX = event.targetTouches[0].pageX;
        object.CurrentY = event.targetTouches[0].pageY;
        object.HoldTimeoutIndex = setTimeout(object.HoldComplete, object.HoldDebugTime, object);
    }
    TouchMove(object, event)
    {
        object.CurrentX = event.targetTouches[0].pageX;
        object.CurrentY = event.targetTouches[0].pageY;
    }
    TouchEnd(object, event)
    {
        object.bHeld = false;
        clearTimeout(object.HoldTimeoutIndex);
    }
    
    HoldComplete(object)
    {
        object.bDebugHeld = false;
        const xDist = Math.abs(object.StartX - object.CurrentX);
        const YDist = Math.abs(object.StartY - object.CurrentY);
        if (object.bHeld && xDist < 3 && YDist < 3 )
        {
            console.log("DEBUG");
            object.ScreenCompleteFunction();
        }
    }
}



export {Dev};