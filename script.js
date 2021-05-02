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
