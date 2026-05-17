const display =
document.getElementById("display");

const historyBox =
document.getElementById("history");

const scientificToggle =
document.getElementById("scientificToggle");

const scientificButtons =
document.getElementById("scientificButtons");

const clickSound =
new Audio(
"https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
);

clickSound.volume = 0.2;

/* SOUND */

function playClick(){

clickSound.currentTime = 0;

clickSound.play();

}

/* VIBRATION */

function vibrate(){

if(navigator.vibrate){

navigator.vibrate(10);

}

}

/* APPEND */

function appendValue(value){

display.value += value;

playClick();

vibrate();

}

/* CLEAR */

function clearDisplay(){

display.value = "";

playClick();

}

/* DELETE */

function deleteLast(){

display.value =
display.value.slice(0,-1);

playClick();

}

/* CALCULATE */

function calculate(){

try{

const expression =
display.value;

const result =
eval(expression);

historyBox.innerHTML += `
<div>${expression} = ${result}</div>
`;

display.value = result;

playClick();

}
catch{

display.value = "Error";

}

}

/* BUTTONS */

document.querySelectorAll(".buttons button")
.forEach(btn=>{

const txt = btn.innerText;

if(txt==="C"){

btn.onclick = clearDisplay;

}
else if(txt==="DEL"){

btn.onclick = deleteLast;

}
else if(txt==="="){

btn.onclick = calculate;

}
else{

btn.onclick = ()=>appendValue(

txt
.replace("×","*")
.replace("÷","/")
.replace("−","-")

);

}

});

/* SCIENTIFIC */

scientificToggle.addEventListener(
"click",
()=>{

scientificButtons.classList.toggle(
"hidden"
);

playClick();

}
);

/* KEYBOARD */

document.addEventListener(
"keydown",
(e)=>{

if(
(e.key >= 0 && e.key <= 9) ||
e.key === "+" ||
e.key === "-" ||
e.key === "*" ||
e.key === "/" ||
e.key === "." ||
e.key === "%"
){

appendValue(e.key);

}

else if(e.key==="Enter"){

calculate();

}

else if(e.key==="Backspace"){

deleteLast();

}

}
);

/* CURRENCY */

const rates = {

USD:1,
INR:83,
EUR:0.92,
GBP:0.79

};

document.getElementById("convertBtn")
.addEventListener(
"click",
()=>{

const amount =
document.getElementById("amount").value;

const from =
document.getElementById("fromCurrency").value;

const to =
document.getElementById("toCurrency").value;

const usdAmount =
amount / rates[from];

const converted =
usdAmount * rates[to];

document.getElementById("result")
.innerHTML =
`${amount} ${from} = ${converted.toFixed(2)} ${to}`;

playClick();

}
);

/* AI SOLVER */

document.getElementById("solveBtn")
.addEventListener(
"click",
()=>{

try{

const equation =
document.getElementById("aiInput").value;

const answer =
eval(equation);

document.getElementById("aiResult")
.innerHTML =
"Answer: " + answer;

playClick();

}
catch{

document.getElementById("aiResult")
.innerHTML =
"Invalid Equation";

}

}
);

/* OCR */

document.getElementById("scanBtn")
.addEventListener(
"click",
async()=>{

const file =
document.getElementById("imageInput")
.files[0];

if(!file){

document.getElementById("ocrResult")
.innerHTML =
"Upload Image";

return;

}

document.getElementById("ocrResult")
.innerHTML =
"Scanning...";

const result =
await Tesseract.recognize(
file,
'eng'
);

document.getElementById("ocrResult")
.innerHTML =
result.data.text;

playClick();

}
);

/* PWA */

if('serviceWorker' in navigator){

navigator.serviceWorker.register(
'service-worker.js'
);

}

/* NO DOUBLE TAP */

let lastTouchEnd = 0;

document.addEventListener(
'touchend',
function(event){

const now =
(new Date()).getTime();

if(now-lastTouchEnd<=300){

event.preventDefault();

}

lastTouchEnd = now;

},false);