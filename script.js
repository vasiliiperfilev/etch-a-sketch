//sketchpad initialization
window.addEventListener('load', changeCanvasSize)

//fancy circle colorpicker

const colorCircle = document.getElementById("colorPickerCircle");
const colorPicker = document.getElementById("colorPicker");

colorPicker.addEventListener('change', function (event) {
    colorCircle.style.backgroundColor = this.value;
});

colorCircle.addEventListener('click', function (event) {
    colorPicker.click();
});

//canvas size
const canvasSizeRange = document.querySelector("#size");
canvasSizeRange.addEventListener('input', changeCanvasSize);
const sketchPad = document.querySelector(".sketchPad");

function changeCanvasSize() {
    //clear sketchpad grid
    sketchPad.innerHTML = "";
    const numPixels = canvasSizeRange.value;
    const padSizeLabel = document.querySelector("#padSizeLabel");
    //change label text
    padSizeLabel.textContent = `${numPixels}x${numPixels}`;

    //create rows
    for (let i = 0; i < numPixels; i++) {
        const div = document.createElement('div');
        div.classList.add("row");
        sketchPad.appendChild(div);
    }
    //fill rows with pixels
    document.querySelectorAll(".row").forEach(element => {
        for (let i = 0; i < numPixels; i++) {
            const div = document.createElement('div');
            div.classList.add("pixel");
            element.appendChild(div);
        }
    });
    //add event listener to each pixel
    let pixels = document.querySelectorAll('.pixel')
    pixels.forEach((pixel) => {
        pixel.addEventListener('mouseover', changeColor);
    })
}

//clear sketchpad
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener('click', () => {
    sketchPad.innerHTML = "";
    changeCanvasSize();
})

//change mode
//current state
let mode = 'colorMode';
let currentActive = document.getElementById(mode);
currentActive.classList.add('modeSelected');
//add event listeners
let modesBtns = document.querySelectorAll(".buttonMode");
modesBtns.forEach((btn) => btn.addEventListener('click', changeMode));

function changeMode() {
    if (this.id !== mode) {
        //remove selected from last mode
        let currentActive = document.getElementById(mode);
        currentActive.classList.remove('modeSelected');
        //add selected to current mode
        mode = this.id;
        this.classList.add('modeSelected');
    }
}

//change color
//check if mouse is pressed
let mouseDown = false;
document.body.onmousedown = function() { 
    mouseDown = true;
  }
  document.body.onmouseup = function() {
    mouseDown = false;
}

function changeColor() {
    if (mouseDown === true) {
        if (mode === 'colorMode'){
            this.style.backgroundColor = colorPicker.value;
        }
        else if (mode === 'rainbowMode'){
            //generate random color
            let randomNums = []
            for (let i = 0; i < 3; i++){
                randomNums[i] = Math.ceil(Math.random() * 255);
            }
            this.style.backgroundColor = `rgb(${randomNums[0]}, ${randomNums[1]}, ${randomNums[2]})`;
        }
        else if (mode === 'eraserMode'){
            this.style.backgroundColor = 'whitesmoke'
        }
    }
}