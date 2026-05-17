const display = document.getElementById("display");

function appendValue(value){
display.value += value;
}

function clearDisplay(){
display.value = "";
}

function deleteLast(){
display.value = display.value.slice(0,-1);
}

function calculate(){

try{

display.value = eval(display.value);

}

catch{

display.value = "Error";

setTimeout(()=>{
display.value = "";
},1500);

}

}

document.addEventListener("keydown",(e)=>{

if(
(e.key >= 0 && e.key <=9) ||
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

else if(e.key === "Escape"){

clearDisplay();

}

});

function updateTime(){

const now = new Date();

let hours = now.getHours();
let minutes = now.getMinutes();

minutes = minutes < 10 ? "0" + minutes : minutes;

document.getElementById("time").innerHTML =
hours + ":" + minutes;

}

setInterval(updateTime,1000);

updateTime();