class Screen_Base
{
    constructor(ElementID)
    {
        this.Element = document.getElementById(ElementID);
        
        
        // this.SetVisiblity = function(visible)
        // {
        //     if (visible)
        //     {
        //         this.Element.classList.remove('hidden');
        //     }
        //     else
        //     {
        //         this.Element.classList.add('hidden');
        //     }
        // }
    }
    
    SetVisiblity(visible)
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
}



export {Screen_Base};