const canvas =
document.getElementById("matrix");

const ctx =
canvas.getContext("2d");

function resizeCanvas(){

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

}

resizeCanvas();

/* MATRIX LETTERS */

const letters =
"アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const chars =
letters.split("");

const fontSize = 16;

let columns =
Math.floor(canvas.width / fontSize);

let drops =
Array(columns).fill(1);

/* DRAW */

function draw(){

/* Transparent Trail */

ctx.fillStyle =
"rgba(5,8,22,0.08)";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

/* Glow */

ctx.shadowColor =
"#00d4ff";

ctx.shadowBlur = 10;

/* Text */

ctx.fillStyle =
"#00d4ff";

ctx.font =
fontSize + "px monospace";

/* Matrix */

for(let i = 0; i < drops.length; i++){

const text =
chars[
Math.floor(
Math.random() * chars.length
)
];

ctx.fillText(

text,

i * fontSize,

drops[i] * fontSize

);

/* Reset */

if(

drops[i] * fontSize >
canvas.height &&

Math.random() > 0.975

){

drops[i] = 0;

}

drops[i]++;

}

/* Loop */

requestAnimationFrame(draw);

}

/* Start */

draw();

/* Resize */

window.addEventListener(
"resize",
()=>{

resizeCanvas();

columns =
Math.floor(
canvas.width / fontSize
);

drops =
Array(columns).fill(1);

}
);