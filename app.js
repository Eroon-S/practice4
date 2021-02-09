//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");

const Initial_COLOR = "#2c2c2c";
const Canvas_SIZE = 700;

// 캔버스 크기 지정해주기 - css에서 준 값 js 요소로
// canvas.width = 700;
// canvas.height = 700;

canvas.width = Canvas_SIZE;
canvas.height = Canvas_SIZE;

// 기본 배경색 
ctx.fillStyle = "white"
ctx.fillRect(0, 0, Canvas_SIZE, Canvas_SIZE);

//context default 설정
// 우리가 그릴 선들이 모두 이 색을 가짐
// ctx.strokeStyle = "#2c2c2c";
ctx.strokeStyle = Initial_COLOR;
// 우리가 그릴 선들이 모두 이 두께를 가짐
ctx.lineWidth = 2.5;

// ctx.fillStyle = "#f4779d";
// ctx.fillRect(50, 20, 100, 40);
// ctx.fillStyle = "#359746";
// ctx.fillRect(80,50,100,40);
ctx.fillStyle = Initial_COLOR;
ctx.clearRect(0, 0, Canvas_SIZE, Canvas_SIZE);


let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event) {
//   console.log(event);
  const x = event.offsetX;
  const y = event.offsetY;
  // console.log(x, y);
  // 캔버스 위에서 클릭하고 움직이면 밑에 코드 작동하지 않음
  if(!painting){
    // console.log("creating path in", x, y);
    //클릭하지 않고 마우스를 움직였을 때 beginPath 실행
    ctx.beginPath();
    //그림 그려지지는 않고 그냥 path만 움직임
    ctx.moveTo(x, y);
  }else{
    //내가 마우스를 움직이는 내내 발생
    // console.log("creating line in", x, y);
    ctx.lineTo(x, y);
    //획을 긋는다
    ctx.stroke();
    //ctx.closePath();
  }
}

// function onMouseDown(event) {
//   // console.log(event);
//   painting : true;
// }

// function onMouseUp(event){
//   //painting: false;
//   stopPainting();
// }

// function onMouseLeave(event){
//  painting: false;
// }

function handleColorClick(event){
  // console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  // console.log(color);
  //위에 있는 strokeStyle default값 override
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event){
  // console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(){
// filling을 하고있으면 그걸 나에게 말해줄 variable이 필요함(filling모드 인지 아닌지 확인 시켜줄 방법 필요)
  if(filling === true){
    filling = false;
    mode.innerText = "Fill"
  }else{
    filling = true;
    mode.innerText = "Paint"
  }
}

function handleCanvasClick(){
  if(filling){
  //  ctx.fillRect(0, 0, canvas.width, can.height);
  ctx.fillRect(0, 0, Canvas_SIZE, Canvas_SIZE);
  }
}

function handleCM(event){
  // console.log(event);
  //마우스 우클릭 방지
  event.preventDefault();
}

//이미지 저장하기
function handleSaveClick(){
  const image = canvas.toDataURL("image/png");
  // console.log(image);
  //링크 만들기 -> anchor
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  // console.log(link);
  //클릭을 가짜로 만들기
  link.click();
}

//화면 클리어하기
function handleClearClick(){
  ctx.clearRect(0, 0, Canvas_SIZE, Canvas_SIZE);
}

if(canvas) {
  // 캔버스 내에서 움직임 확인
  canvas.addEventListener("mousemove", onMouseMove);
  // 캔버스 내에 클릭했을때 마우스를 움직이면 그림그리기 시작
  // canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousedown", startPainting);
  // 마우스를 떼면 그림그리기 종료
  // canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseup", stopPainting);
  // 마우스가 캔버스 밖으로 벗어나면 그림그리기 종료
  // canvas.addEventListener("mouseleave", onMouseLeave);
  canvas.addEventListener("mouseleave", stopPainting);
  // 클릭하면 fill
  canvas.addEventListener("click", handleCanvasClick);
  // 오른쪽 클릭(context Menu) 방지
  canvas.addEventListener("contextmenu", handleCM);
}

//Recap
//canvas는 html5의 한 요소
//canvas 안에 있는 픽셀들을 다룸
// CSS에서 width와 height를 줘야 볼 수 있음
// 픽셀을 다루는 윈도우가 얼마나 큰지 canvas 에게 알려주기 위해서
// js에서 width와 height를 줘야 함

// *context of canvas
//픽셀들을 컨트롤 할 수 있음 - like 2D

// console.log(Array.from(colors));
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
  range.addEventListener("input", handleRangeChange);
}

//fill 버튼 누르면 paint 버튼으로 바뀌게 만들기
if(mode){
  mode.addEventListener("click", handleModeClick)
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick)
}

//clear button
if(clearBtn){
  clearBtn.addEventListener("click", handleClearClick)
}



