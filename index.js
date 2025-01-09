let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");


let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },

    touch: {
        down: "touchstart",
        move: "touchmove",
        up:"touchend"
    },
};

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () =>{
    try{
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

gridButton.addEventListener("click", ()=>{
    document.body.classList.remove('paintbrush-cursor'); // Remove paintbrush class if present
    document.body.classList.remove('eraser-cursor'); // Remove eraser class
    container.innerHTML = "" ;
    let count = 0;
    for (let i = 0; i < gridHeight.value; i++){
        count += 2;
        let div = document.createElement ("div");
        div.classList.add("gridRow");

        for(let j=0; j < gridWidth.value; j++){
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id",`gridCol${count}`);
            col.addEventListener(events[deviceType].down, ()=> {
                draw = true;
                if (erase){
                    col.style.backgroundColor = "transparent";
                }else {
                    col.style.backgroundColor = colorButton.value;
                }
            });


            col.addEventListener(events[deviceType].move, (e)=>{
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, ()=> {
                draw = false;
            });

            div.appendChild(col);

        }

        container.appendChild(div);

    }
});

function checker(elementId){
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element)=>{
        if(elementId == element.id){
            if(draw && !erase){
                element.style.backgroundColor = colorButton.value;
            }else if ( draw && erase){
                element.style.backgroundColor = "transparent";
            }
        }
    });
}





clearGridButton.addEventListener("click", ()=> {
    document.body.classList.remove('paintbrush-cursor'); // Remove paintbrush class if present
    document.body.classList.remove('eraser-cursor'); // Remove eraser class
    container.innerHTML = "";
});
 
eraseBtn.addEventListener("click", ()=>{
    
    document.body.classList.remove('paintbrush-cursor'); // Remove paintbrush class if present
    document.body.classList.add('eraser-cursor'); // Add eraser class
    erase = true;
});

paintBtn.addEventListener("click", ()=>{
    document.body.classList.remove('eraser-cursor'); // Remove eraser class if present
    document.body.classList.add('paintbrush-cursor'); // Add paintbrush class
    erase = false;
});



gridWidth.addEventListener("input", ()=>{
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}`: gridWidth.value;
});

gridHeight.addEventListener("input", ()=>{
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}`: gridHeight.value;
});


const colorInput = document.getElementById('color-input');

colorInput.addEventListener('input', () => {
    document.body.classList.add('paintbrush-cursor'); // Add paintbrush class to the body
});

// Optional: Remove paintbrush cursor when clicking outside or on certain elements



// // Function to apply the eraser cursor
// eraseBtn.addEventListener('click', () => {
//   document.body.classList.remove('paintbrush-cursor'); // Remove paintbrush class if present
//   document.body.classList.add('eraser-cursor'); // Add eraser class
// });

// // Function to apply the paintbrush cursor
// paintBtn.addEventListener('click', () => {
//   document.body.classList.remove('eraser-cursor'); // Remove eraser class if present
//   document.body.classList.add('paintbrush-cursor'); // Add paintbrush class
// });






window.onload = () => {
     gridHeight.value = 0;
     gridWidth.value = 0;
};










