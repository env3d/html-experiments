
// ctx is global
var ctx;
var pixelArray, pixelArray2;

// retrive the red value at a particular pixel location
function redAt(x,y) {
  index = y * 500 + x;
	return pixelArray2.data[index*4];
}
function greenAt(x,y) {
  index = y * 500 + x;  
	return pixelArray2.data[index*4+1];
}
function blueAt(x,y) {
  index = y * 500 + x;  
	return pixelArray2.data[index*4+2];
}
function alphaAt(x,y) {
  index = y * 500 + x;  
	return pixelArray2.data[index*4+3];
}

function loadimage() {	  
	canvas = document.getElementById("image");
	// ctx is global
	ctx = canvas.getContext("2d");
	
	var img = new Image();
	img.src = document.getElementById("imageURL").value;
  
	side = 0;
	if (img.width < img.height) {
	  side = img.width;
	} else {
	  side = img.height;
	}
	side = (side > 500) ? 500 : side;

	img.onload = function() {
    //console.log('image loaded');
	  ctx.drawImage(img, 0, 0,500,500);
    setTimeout( () => {
      ctx.drawImage(img, 0, 0, side, side, 0, 0, 500,500);
    }, 500);
	};
}

function transform(userCode) {
	pixelArray = ctx.getImageData(0,0,500,500);
	pixelArray2 = ctx.getImageData(0,0,500,500);
  
	for (var i = 0; i < 500*500; i++) {
	  red = pixelArray.data[i*4];
	  green = pixelArray.data[i*4+1];
	  blue = pixelArray.data[i*4+2];
	  alpha = pixelArray.data[i*4+3];
    x = parseInt(i % 500);
    y = parseInt(i / 500);

	  code = document.getElementById("code");
	  eval(userCode);

	  pixelArray.data[i*4] = red;
	  pixelArray.data[i*4+1] = green;
	  pixelArray.data[i*4+2] = blue;
	  pixelArray.data[i*4+3] = alpha;
	}

	ctx.putImageData(pixelArray, 0,0);
	
}      


