import {Screen_Base} from './Screen_Base.js'
import {elementsOverlap} from './utils.js'

class Screen_SelectValues extends Screen_Base
{
	
    constructor(ElementID)
    {
        super(ElementID);
        
        this.ValueCard = document.getElementById("ValueCard");
		this.DropSection_No = document.getElementById("DropSection_No");
		this.DropSection_Yes = document.getElementById("DropSection_Yes");

        this.DifferenceX = 0;
        this.DifferenceY = 0;
        this.CurrentPositionX = 100;
        this.CurrentPositionY = 200;
        
        this.CardState = 'none';
		this.OriginalTransition = 'padding 0.2s';
		
        // Add the ondragstart event listener
        this.ValueCard.addEventListener("touchstart", this.TouchStart);
        this.ValueCard.addEventListener("touchmove", this.TouchMove);
        this.ValueCard.addEventListener("touchend", this.TouchEnd);
		        
        
        ValueCard.style.left = this.CurrentPositionX;
        ValueCard.style.top = this.CurrentPositionY;  
		
    }
	Tick(DeltaTime)
	{
		super.Tick(DeltaTime);
		
        // width: 100px; 
        // height: 200px;
        console.log("dif: " + this.DifferenceX);
        
        // TODO: Solve value in class 'CardState' not updating/reading correctly in tick
        //this.CardState = 'yes'
        // console.log(this.CardState);
		// console.log('transition: ' + this.OriginalTransition);
		// if (this.CardState == 'yes')
        // {
        //     this.DropSection_Yes.style.width = 120 + 'px';
        //     this.DropSection_Yes.style.height = 260 + 'px';
        // }
        // else if (this.CardState == 'no')
        // {
            
        // }
        // else
        // {
        //     this.DropSection_Yes.style.width = 100 + 'px';
        //     this.DropSection_Yes.style.height = 200 + 'px';
        // }
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
		this.OriginalTransition = 'padding .2s'
		console.log('transition: ' + this.OriginalTransition);
		ValueCard.style.transition = 'padding 0.2s';
        ValueCard.style.paddingBottom = 20 + '%';
                
        event.preventDefault();
    }
    TouchMove(event)
    {    
        var touchLocation = event.targetTouches[0];
            
        let NewX = touchLocation.pageX + this.DifferenceX;
        let NewY = touchLocation.pageY + this.DifferenceY;
        // console.log("New touch x: " + touchLocation.pageX + " y: " + touchLocation.pageY);
        // console.log("New x: " + NewX + " y: " + NewY);
        
        ValueCard.style.left = NewX + 'px';
        ValueCard.style.top = NewY + 'px';
        
        this.CardState = 'yes';
        if (elementsOverlap(ValueCard, DropSection_Yes))
        {
            this.CardState = 'yes';
        }
        else if (elementsOverlap(ValueCard, DropSection_No))
        {
            this.CardState = 'no';
        }
        else
        {
            this.CardState = 'none';
        }
        
               
        console.log(this.CardState);
        if (this.CardState == 'yes')
        {
            DropSection_Yes.style.width = 120 + 'px';
            DropSection_Yes.style.height = 260 + 'px';
			// ValueCard.style
        }
        else if (this.CardState == 'no')
        {
            DropSection_No.style.width = 120 + 'px';
            DropSection_No.style.height = 260 + 'px';
        }
        else
        {
            DropSection_Yes.style.width = 100 + 'px';
            DropSection_Yes.style.height = 200 + 'px';
            DropSection_No.style.width = 100 + 'px';
            DropSection_No.style.height = 200 + 'px';
        }
        
        event.preventDefault(); 
    }
	
	TouchEnd(event)
	{
		let test = document.getElementById("ValueCard");
        ValueCard.style.paddingBottom = 0 + '%';
		ValueCard.style.transition = 'padding 0.2s';
		ValueCard.style.transition += ', left .4s, top .4s';
        ValueCard.style.left = 100;
        ValueCard.style.top = 200;    
		
        event.preventDefault();
	}
}

export {Screen_SelectValues};
