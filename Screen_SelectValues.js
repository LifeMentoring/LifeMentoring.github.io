import {Screen_Base} from './Screen_Base.js'
import {elementsOverlap, CreateDebugBlock} from './utils.js'

const windowHeight = document.firstChild.getBoundingClientRect().bottom;
const windowWidth = document.firstChild.getBoundingClientRect().right;

class Screen_SelectValues extends Screen_Base
{
	
    constructor(ElementID)
    {
        super(ElementID);
        
        this.ValueCard = document.getElementById("ValueCard");
		this.DropSection_No = document.getElementById("DropSection_No");
		this.DropSection_Yes = document.getElementById("DropSection_Yes");

        this.TouchDifferenceX = 0;
        this.TouchDifferenceY = 0;
        this.LastPositionX = 0;
        this.LastPositionY = 0;
        
        this.Values = ["Honesty", "Courage", "Humour", "Bravery"];
        const CardRect = ValueCard.getBoundingClientRect();
        
        this.ClientDifferenceX = ValueCard.style.left - CardRect.left;
        this.ClientDifferenceY = ValueCard.style.top - CardRect.top;
        this.Width = CardRect.right - CardRect.left;
        this.Height = CardRect.bottom - CardRect.top;
        
        
        // this.CurrentPositionX = windowWidth / 2;
        // this.CurrentPositionY = windowHeight / 2;
        this.SetPosition(windowWidth / 2 - 100, windowHeight / 2 - 150);
        
        this.CardState = 'none';
		this.OriginalTransition = 'padding 0.2s';
		
        ValueCard.addEventListener("touchstart", this.TouchStart.bind(event, this));
        ValueCard.addEventListener("touchmove", this.TouchMove.bind(event, this));
        ValueCard.addEventListener("touchend", this.TouchEnd.bind(event, this));
		
        ValueCard.childNodes[1].textContent = this.Values[this.Values.length - 1];
        
        // ValueCard.style.left = this.CurrentPositionX;
        // ValueCard.style.top = this.CurrentPositionY;  
        
		
    }
	Tick(DeltaTime)
	{
		super.Tick(DeltaTime);
		        
        // console.log("offset left " + ValueCard.offsetLeft + " right " + (ValueCard.offsetLeft + this.ValueCard.clientWidth));
        // CreateDebugBlock(domRect1.left, domRect1.top, "blue", document.body);
	}
    SetPosition(X, Y)
    {
        if (X == this.CurrentPositionX && Y == this.CurrentPositionY)
            return;
        this.LastPositionX = this.CurrentPositionX;
        this.LastPositionY = this.CurrentPositionX;
        
        this.CurrentPositionX = X;
        this.CurrentPositionY = Y;
        ValueCard.style.left = this.CurrentPositionX;
        ValueCard.style.top = this.CurrentPositionY;
        // ValueCard.style.left = X + this.ClientDifferenceX;
        // ValueCard.style.top = Y + this.ClientDifferenceY;
    }
    
    TouchStart(object, event)
    {    
        console.log(object.OriginalTransition);    
        var touchLocation = event.targetTouches[0];
        console.log("Page X: " + touchLocation.pageX + " Y: " + touchLocation.pageY); 
        
        // var numericValue = window
        // .getComputedStyle(document.getElementById('div'),null)
        // .getPropertyValue('left')
        // .match(/\d+/);
        
        // DifferenceX = ValueCard.style.left - touchLocation.pageX;
        // DifferenceY = ValueCard.style.top - touchLocation.pageY;
        object.DifferenceX = ValueCard.offsetLeft - touchLocation.pageX;
        object.DifferenceY = ValueCard.offsetTop - touchLocation.pageY;
		console.log('transition: ' + object.OriginalTransition);
		ValueCard.style.transition = object.OriginalTransition;
        ValueCard.style.paddingBottom = 20 + '%';
                
        event.preventDefault();
    }
    TouchMove(object, event)
    {    
        var touchLocation = event.targetTouches[0];
            
        let NewX = touchLocation.pageX + object.DifferenceX;
        let NewY = touchLocation.pageY + object.DifferenceY;
        object.SetPosition(NewX,NewY);
        
        // ValueCard.style.left = NewX + 'px';
        // ValueCard.style.top = NewY + 'px';
        
        if (elementsOverlap(ValueCard, DropSection_Yes))
        {
            object.CardState = 'yes';
        }
        else if (elementsOverlap(ValueCard, DropSection_No))
        {
            object.CardState = 'no';
        }
        else
        {
            object.CardState = 'none';
        }
        
        object.CheckCardDropSection(object);
        
        event.preventDefault(); 
    }
	
    CheckCardDropSection()
    {
        if (this.CardState == 'yes') {
            DropSection_Yes.style.width = 120 + 'px';
            DropSection_Yes.style.height = 260 + 'px';
        }
        else if (this.CardState == 'no') {
            DropSection_No.style.width = 120 + 'px';
            DropSection_No.style.height = 260 + 'px';
        }

        else {
            DropSection_Yes.style.width = 100 + 'px';
            DropSection_Yes.style.height = 200 + 'px';
            DropSection_No.style.width = 100 + 'px';
            DropSection_No.style.height = 200 + 'px';
        }
    }

	TouchEnd(object, event)
	{
        ValueCard.style.transition = object.OriginalTransition;
        ValueCard.style.transition += ', left .4s, top .4s';
        
        // TODO: Check based on far position or velocity if card state should lock in
        let LockedIn = false;
        const AcceptOffset = 40;
        if (object.CardState == 'yes')
        {
            const ValueRect = object.ValueCard.getBoundingClientRect();
            const YesRect = object.DropSection_Yes.getBoundingClientRect();
            
            const VelX = object.CurrentPositionX - object.LastPositionX;
            console.log("vel: " + VelX);
            const Success = VelX > 6 || ValueRect.left > YesRect.left - AcceptOffset;
            if (Success)
            {
                LockedIn = true;
                //ValueCard.style.left = (windowWidth - 10) + 'px';
                object.SetPosition(object.CurrentPositionX + 200, object.CurrentPositionY);
            }
        }
        else if (object.CardState == 'no')
        {
            const ValueRect = object.ValueCard.getBoundingClientRect();
            const NoRect = object.DropSection_No.getBoundingClientRect();
            const VelX = object.LastPositionX - object.CurrentPositionX;
            const Success = VelX > 6 || ValueRect.right < NoRect.right + AcceptOffset;
            if (Success)
            {
                LockedIn = true;
                //ValueCard.style.left = (-200) + 'px';
                object.SetPosition(object.CurrentPositionX - 200, object.CurrentPositionY);
            }
        }
        if (!LockedIn)  
        {
            object.CardState = 'none';
            
            ValueCard.style.paddingBottom = 0 + '%';
            object.SetPosition(windowWidth / 2 - 100, windowHeight / 2 - 150);
            //object.SetPosition(windowWidth / 2, windowHeight / 2);
        }
        else
        {
            setTimeout(TempReturn, 400)
        }
        object.CheckCardDropSection();
		
        event.preventDefault();
        function TempReturn()
        {
            object.Values.pop();
            if (object.Values.length <= 0)
            {
                // TODO:
                // NEXT PAGE
                return;
            }
            
            ValueCard.style.transition = object.OriginalTransition;
            object.SetPosition(windowWidth / 2 - 100, windowHeight / 2 - 150);
            //object.SetPosition(windowWidth / 2, windowHeight / 2);
            object.CardState = 'none';
            object.CheckCardDropSection();
            ValueCard.style.paddingBottom = 0 + '%';
            ValueCard.childNodes[1].textContent = object.Values[object.Values.length - 1];
        }
	}
    
}

export {Screen_SelectValues};
