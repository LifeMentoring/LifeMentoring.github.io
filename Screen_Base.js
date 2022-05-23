class Screen_Base
{
    constructor(ElementID)
    {
        this.Element = document.getElementById(ElementID);
        
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