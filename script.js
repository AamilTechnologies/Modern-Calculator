const display = document.getElementById("display");

const historyBox =
document.getElementById("history");

const scientificToggle =
document.getElementById("scientificToggle");

const scientificButtons =
document.getElementById("scientificButtons");

const themeToggle =
document.getElementById("themeToggle");

const voiceBtn =
document.getElementById("voiceBtn");

const calculator =
document.getElementById("calculator");

/* Theme */

let darkMode = true;

/* Append Value */

function appendValue(value){

display.value += value;

playClick();

vibrate();

}

/* Clear */

function clearDisplay(){

display.value = "";

playClick();

}

/* Delete */

function deleteLast(){

display.value =
display.value.slice(0,-1);

playClick();

}

/* Calculate */

function calculate(){

try{

const expression =
display.value;

const result =
eval(expression);

historyBox.innerHTML += `
<div>
${expression} = ${result}
</div>
`;

display.value = result;

playClick();

}
catch{

display.value = "Error";

}

}

/* Scientific Toggle */

scientificToggle.addEventListener(
"click",
()=>{

scientificButtons.classList.toggle(
"hidden"
);

playClick();

}
);

/* Theme Toggle */

themeToggle.addEventListener(
"click",
()=>{

if(darkMode){

document.body.style.background =
"#e5e7eb";

calculator.style.background =
"rgba(255,255,255,0.75)";

display.style.background =
"#ffffff";

display.style.color =
"#050816";

themeToggle.innerHTML = "☀️";

darkMode = false;

}
else{

document.body.style.background =
"linear-gradient(135deg,#050816,#0f172a)";

calculator.style.background =
"rgba(17,24,39,0.72)";

display.style.background =
"#0b1220";

display.style.color =
"#00d4ff";

themeToggle.innerHTML = "🌙";

darkMode = true;

}

playClick();

}
);

/* Keyboard Support */

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

else if(e.key === "Enter"){

calculate();

}

else if(e.key === "Backspace"){

deleteLast();

}

}
);

/* Haptic */

function vibrate(){

if(navigator.vibrate){

navigator.vibrate(10);

}

}

/* Sound */

function playClick(){

const audio = new Audio(
'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'
);

audio.volume = 0.2;

audio.play();

}

/* Voice Calculator */

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

const recognition =
new SpeechRecognition();

recognition.onresult =
(event)=>{

const transcript =
event.results[0][0].transcript;

display.value =
transcript
.replace(/plus/g,'+')
.replace(/minus/g,'-')
.replace(/into/g,'*')
.replace(/multiply/g,'*')
.replace(/divide/g,'/')
.replace(/x/g,'*');

};

voiceBtn.addEventListener(
"click",
()=>{

recognition.start();

playClick();

}
);

}

/* Draggable Desktop */

let isDragging = false;

let offsetX, offsetY;

if(window.innerWidth > 768){

calculator.addEventListener(
"mousedown",
(e)=>{

isDragging = true;

offsetX =
e.clientX - calculator.offsetLeft;

offsetY =
e.clientY - calculator.offsetTop;

}
);

document.addEventListener(
"mousemove",
(e)=>{

if(isDragging){

calculator.style.position =
"absolute";

calculator.style.left =
e.clientX - offsetX + "px";

calculator.style.top =
e.clientY - offsetY + "px";

}

}
);

document.addEventListener(
"mouseup",
()=>{

isDragging = false;

}
);

}

/* Currency Converter */

const rates = {

USD:1,
INR:83,
EUR:0.92,
GBP:0.79,
JPY:156

};

const amountInput =
document.getElementById("amount");

const fromCurrency =
document.getElementById("fromCurrency");

const toCurrency =
document.getElementById("toCurrency");

const convertBtn =
document.getElementById("convertBtn");

const result =
document.getElementById("result");

convertBtn.addEventListener(
"click",
()=>{

const amount =
amountInput.value;

const from =
fromCurrency.value;

const to =
toCurrency.value;

const usdAmount =
amount / rates[from];

const converted =
usdAmount * rates[to];

result.innerHTML =
`${amount} ${from}
=
${converted.toFixed(2)} ${to}`;

playClick();

}
);

/* PWA */

if('serviceWorker' in navigator){

navigator.serviceWorker.register(
'service-worker.js'
)

.then(()=>{

console.log("PWA Ready");

});

}

setTimeout(()=>{

const loader =
document.getElementById("loader");

if(loader){

loader.style.display = "none";

}

},2000);

/* PWA Install Popup */

let deferredPrompt;

const installPopup =
document.getElementById(
"installPopup"
);

const installBtn =
document.getElementById(
"installBtn"
);

window.addEventListener(
'beforeinstallprompt',
(e)=>{

e.preventDefault();

deferredPrompt = e;

installPopup.style.display =
"block";

}
);

installBtn.addEventListener(
"click",
async()=>{

if(deferredPrompt){

deferredPrompt.prompt();

const result =
await deferredPrompt.userChoice;

if(result.outcome === "accepted"){

console.log("App Installed");

}

deferredPrompt = null;

installPopup.style.display =
"none";

}

}
);

const solveBtn =
document.getElementById("solveBtn");

const aiInput =
document.getElementById("aiInput");

const aiResult =
document.getElementById("aiResult");

solveBtn.addEventListener(
"click",
()=>{

const equation =
aiInput.value.trim();

if(equation === ""){

aiResult.innerHTML =
"Enter an equation 😭";

return;

}

try{

if(equation.includes("x")){

const match =
equation.match(
/(\d*)x([+-]\d+)=([+-]?\d+)/
);

if(match){

const a =
parseFloat(match[1] || 1);

const b =
parseFloat(match[2]);

const c =
parseFloat(match[3]);

const x =
(c - b) / a;

aiResult.innerHTML =
`x = ${x}`;

}else{

aiResult.innerHTML =
"Unsupported equation 😭";

}

}else{

const answer =
eval(equation);

aiResult.innerHTML =
`${equation} = ${answer}`;

}

}catch{

aiResult.innerHTML =
"Invalid equation 😭";

}

}
);