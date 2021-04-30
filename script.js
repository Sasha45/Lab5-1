// script.js

var ctr = 0;

//placeholder for uploaded image
var img = new Image()
//img.src = "images/lab.jpg";

//the image upload button
const img_input = document.getElementById("image-input");
//add listener to image uplaod
img_input.addEventListener('change', onUploaderBrush);

function onUploaderBrush(){
  alert("AAAAAAAAAAAAAA");
  doStuffPleaseGod();
  doStuffPleaseGod();
}


const submit_button = document.querySelector("[type = 'submit']");
submit_button.textContent = "hello";

submit_button.addEventListener('click', doStuffPleaseGod);

//whenever *anything* happens, apparently. sheesh.
function doStuffPleaseGod(){
  //ctr += 1;
  //submit_button.textContent = "aaaaaa" + ctr;

  //just to make sure this is running
  //alert("Hello there!");


  var file = img_input.files[0];
  if(img != null){
    img.src = URL.createObjectURL(file);
    //img.src = "images/lab.jpg"
    console.log(img);
    console.log(img.src);
  }
  


  // TODO
  console.log("listener fired!");
  const canvas = document.getElementById('user-image');
  const ctx = canvas.getContext('2d');
  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  ctx.beginPath();
  ctx.rect(0, 0, 400, 400);
  ctx.fillStyle = "black";
  ctx.fill();
  // - Clear the form when a new image is selected

  // - If you draw the image to canvas here, it will update as soon as a new image is selected
  let gotDimensions = getDimensions(canvas.width, canvas.height, img.width, img.height);
  ctx.drawImage(img, gotDimensions.startX, gotDimensions.startY, gotDimensions.width, gotDimensions.height);
  ctx.drawImage(img, 20, 20, 100, 100);
  //document.body.appendChild(img);
  console.log("last line");
}


//stops the submit button reloading the page
document.querySelector("[type='submit']").addEventListener("click", function(event) {event.preventDefault()});



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
