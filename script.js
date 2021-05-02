// script.js
//The last two labs were kinda fun
//This one is just miserable :(

//placeholder for uploaded image
var img = new Image()

//canvas
const canvas = document.getElementById('user-image');
//context
const ctx = canvas.getContext('2d');

//the image upload button
const img_input = document.getElementById("image-input");
//add listener to image upload



// 1)
img.addEventListener("load", () =>{
  onImageLoaded();
});
async function onImageLoaded(){
  await sleep(50);
  ctx.beginPath();
  ctx.rect(0, 0, 400, 400);
  ctx.fillStyle = "black";
  ctx.fill();
  await sleep(50);
  let gotDimensions = getDimensions(canvas.width, canvas.height, img.width, img.height);
  ctx.drawImage(img, gotDimensions.startX, gotDimensions.startY, gotDimensions.width, gotDimensions.height);
}



// 2)
img_input.addEventListener('input', function (){
  onImageUpload();
});
async function onImageUpload(){
  await sleep(50);
  var file = img_input.files[0];
  img.src = URL.createObjectURL(file);
}


// 3)
const submit_button = document.querySelector("[type = 'submit']");
const textbox_top = document.querySelector("[id='text-top']");
const textbox_bottom = document.querySelector("[id='text-bottom']");
const form = document.querySelector("[id='generate-meme']")
form.addEventListener("submit", onSubmit);
submit_button.addEventListener("click", onSubmit);

const clear_button = document.querySelector("[type='reset']");
const read_text = document.querySelector("[type='button']");

function onSubmit(){
  //setup font
  ctx.font = "50px Impact";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.fillStyle = 'white';
  //setup text content
  let top_text = textbox_top.value.toUpperCase();
  let bottom_text = textbox_bottom.value.toUpperCase();
  //write top text
  ctx.strokeText(top_text, canvas.width/2, 60)
  ctx.fillText(top_text, canvas.width/2, 60);
  //write bottom text
  ctx.strokeText(bottom_text, canvas.width/2, canvas.height-20)
  ctx.fillText(bottom_text, canvas.width/2, canvas.height-20);
  //alert("AAAA");

  //toggle "relevant" buttons
  clear_button.disabled = false;
  read_text.disabled = false;
}



// 4)
clear_button.addEventListener("click", function(){
  //clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //buttons
  clear_button.disabled = true;
  read_text.disabled = true;
});



// 5)

//populate dropdown
var voices = [];
voices = window.speechSynthesis.getVoices();
var dropdown = document.querySelector("[name='voices']");
const badElement = document.querySelector("[value='none']");
//badElement.display = "none";
//stolen from somewhere
dropdown.disabled = false;
for(let i = 0; i < voices.length; i++) {
  let newOption = document.createElement('option');
  option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
  option.setAttribute('data-lang', voices[i].lang);
  option.setAttribute('data-name', voices[i].name);
  dropdown.appendChild(option);
  console.log(voices[i].name);
}


/**Stolen from tutorial */
var synth = window.speechSynthesis;
function populateVoiceList() {
  voices = synth.getVoices();
  var selectedIndex = dropdown.selectedIndex < 0 ? 0 : dropdown.selectedIndex;
  dropdown.innerHTML = '';
  for(let i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    dropdown.appendChild(option);
  }
  dropdown.selectedIndex = selectedIndex;
}
populateVoiceList();

//idk what this does
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}


read_text.addEventListener("click", function(){
  let utterance = new SpeechSynthesisUtterance(textbox_top.value + " "+ textbox_bottom.value);
  var selectedOption = dropdown.selectedOptions[0].getAttribute('data-name');
  for(let i = 0; i < voices.length; i++) {
    if(voices[i].name === selectedOption) {
      utterance.voice = voices[i];
    }
  }
  utterance.volume = vol_slider.value/100;
  //alert(vol_slider.value);
  //speak
  speechSynthesis.speak(utterance);
});



// 6)
const vol_slider = document.querySelector("[type='range']");
var volume = 100;
const vol_icon = document.querySelector("[alt='Volume Level 3']");
vol_slider.addEventListener("input", function(){
  volume = vol_slider.value;
  if(volume >= 67){
    vol_icon.src = "icons/volume-level-3.svg";
  } else if(volume >= 34){
    vol_icon.src = "icons/volume-level-2.svg";
  } else if(volume >= 1){
    vol_icon.src = "icons/volume-level-1.svg";
  } else {
    vol_icon.src = "icons/volume-level-0.svg";
  }
});




//shamelessly stolen from stackoverflow
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}









//stops the submit button reloading the page
document.querySelector("[type='submit']").addEventListener("click", function(event) {event.preventDefault()});
//const submit_button = document.querySelector("[type = 'submit']");






function wait(ms){
  let then = Date.now() + ms;
  let now = Date.now();
  do{
    now = Date.now()
  } while(now < then);
}


/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
