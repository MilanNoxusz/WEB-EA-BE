function allowDrop(event) {
  event.preventDefault(); // Engedélyezi a dobást
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id); // Az áthúzott elem azonosítójának mentése
}

function drop(event) {
  event.preventDefault(); // Megakadályozza az alapértelmezett viselkedést
  const data = event.dataTransfer.getData("text"); // Az áthúzott elem azonosítójának lekérése
  const draggedElement = document.getElementById(data);

  // Ha van szöveg a célterületen, távolítsuk el
  if (event.target.innerText === "Dobd ide az elemeket!") {
    event.target.innerText = ""; // Szöveg eltávolítása
  }

  event.target.appendChild(draggedElement); // Az elem hozzáadása a célterülethez
  draggedElement.style.margin = "5px"; // Igazítás a célterületen belül
}