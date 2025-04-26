const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(50, 50, 100, 50);

ctx.beginPath();
ctx.arc(200, 100, 40, 0, 2 * Math.PI);
ctx.fillStyle = "green";
ctx.fill();
ctx.stroke();

ctx.font = "20px Arial";
ctx.fillStyle = "Purple";
ctx.fillText("Canvas API Példa", 120, 180);