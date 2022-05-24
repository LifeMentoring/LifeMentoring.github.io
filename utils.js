
export function elementsOverlap(el1, el2)
{
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();
  
    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
}

export function CreateDebugBlock(posX, posY, color, parent)
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