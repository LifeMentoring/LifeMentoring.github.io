import {Screen_Base} from './Screen_Base.js'

class Screen_SelectValues extends Screen_Base
{
    constructor(ElementID)
    {
        super(ElementID);
        
        this.ValueCard = document.getElementById("ValueCard");
        // Add the ondragstart event listener
        ValueCard.addEventListener("touchmove", this.TouchMove);
        ValueCard.addEventListener("touchstart", this.TouchStart);
		
		this.DropSection_No = document.getElementById("DropSection_No");
		this.DropSection_Yes = document.getElementById("DropSection_Yes");
        
        this.CurrentPositionX = 100;
        this.CurrentPositionY = 200;
        
        ValueCard.style.left = this.CurrentPositionX;
        ValueCard.style.top = this.CurrentPositionY;
        

        this.DifferenceX = 0;
        this.DifferenceY = 0;

    }
	Tick(DeltaTime)
	{
		//super(DeltaTime);
		
		
	}
    
    
    TouchStart(event)
    {    
        console.log("start");    
        var touchLocation = event.targetTouches[0];
        // var touchLocation = new Touch;// event.targetTouches[0];
        console.log("Page X: " + touchLocation.pageX + " Y: " + touchLocation.pageY);    
        var rect = ValueCard.getBoundingClientRect();	
        
        // var numericValue = window
        // .getComputedStyle(document.getElementById('div'),null)
        // .getPropertyValue('left')
        // .match(/\d+/);
        
        // DifferenceX = ValueCard.style.left - touchLocation.pageX;
        // DifferenceY = ValueCard.style.top - touchLocation.pageY;
        this.DifferenceX = ValueCard.offsetLeft - touchLocation.pageX;
        this.DifferenceY = ValueCard.offsetTop - touchLocation.pageY;
        console.log("Difference X: " + this.DifferenceX + " Y: " + this.DifferenceY);
        
                
        event.preventDefault();
    }
    TouchMove(event)
    {    
        var touchLocation = event.targetTouches[0];
            
        let NewX = touchLocation.pageX + this.DifferenceX;
        let NewY = touchLocation.pageY + this.DifferenceY;
        console.log("New touch x: " + touchLocation.pageX + " y: " + touchLocation.pageY);
        console.log("New x: " + NewX + " y: " + NewY);
        
        ValueCard.style.left = NewX + 'px';
        ValueCard.style.top = NewY + 'px';
        
        event.preventDefault(); 
    }
}

export {Screen_SelectValues};
