function allowDrop(event) {
  event.preventDefault(); 
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id); 
}

function drop(event) {
  event.preventDefault(); 
  const data = event.dataTransfer.getData("text"); 
  const draggedElement = document.getElementById(data);

  if (event.target.innerText === "Dobd ide az elemeket!") {
    event.target.innerText = ""; 
  }

  event.target.appendChild(draggedElement); 
  draggedElement.style.margin = "5px"; 
}