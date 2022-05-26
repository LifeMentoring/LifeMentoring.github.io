class Screen_Base
{
    constructor(ElementID, ScreenCompleteFunction)
    {
        this.Element = document.getElementById(ElementID);
        this.ScreenCompleteFunction = ScreenCompleteFunction;
    }
    
    SetVisibility(visible)
    {
        if (visible)
        {
            this.Element.classList.remove('hidden');
        }
        else
        {
            this.Element.classList.add('hidden');
        }
    }
	
	Tick(DeltaTime)
	{
        
	}
}



export {Screen_Base};