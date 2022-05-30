import {Screen_Base} from './Screen_Base.js'

class Screen_RefineValues extends Screen_Base
{
    constructor(ElementID, ScreenCompleteFunction)
    {
        super(ElementID, ScreenCompleteFunction);
        	
        this.RefineContainer = document.getElementById("RefineValues-ItemsContainer");
        this.RefineTotalTitle = document.getElementById("Refine-Total-Heading");
        
        this.CurrentSelectedValues = [];
    }
    
    ReceivedPreviousScreenInfo(info)
    {
		super.ReceivedPreviousScreenInfo(info);
        
        console.log("Received Important Values:");
                
        for (let i = 0; i < info.length; i++)
        {
            console.log("[" + i + "] " + info[i]);
            this.CreateSelectableItem(info[i]);
        }
    }
    
    CreateSelectableItem(value)
    {
        const NewItem = document.createElement('div');
        NewItem.className = "Refine-Item";
        const content = `<input type='checkbox' class='Refine-Item-Checkbox'><h2>${value}</h2> `;
        NewItem.innerHTML = content;
        const Checkbox = NewItem.firstChild;
        Checkbox.addEventListener('change', this.CheckboxChecked.bind(event, this, value));
        this.RefineContainer.appendChild(NewItem);
    }
    CheckboxChecked(object, item, event)
    {
        console.log("Check changed to " + event.target.checked + " for " + item);
        if (event.target.checked)
            object.CurrentSelectedValues.push(item);
        else
            object.CurrentSelectedValues.pop(item);
            
        object.RefineTotalTitle.innerHTML = object.CurrentSelectedValues.length + "/" + 12;
    }
}

export {Screen_RefineValues};
