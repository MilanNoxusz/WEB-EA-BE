// Canvas inicializálása
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Téglalap rajzolása
ctx.fillStyle = "black";
ctx.fillRect(50, 50, 100, 50);

// Kör rajzolása
ctx.beginPath();
ctx.arc(200, 100, 40, 0, 2 * Math.PI);
ctx.fillStyle = "green";
ctx.fill();
ctx.stroke();

// Szöveg rajzolása
ctx.font = "20px Arial";
ctx.fillStyle = "Purple";
ctx.fillText("Canvas API Példa", 120, 180);