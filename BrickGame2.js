// 사각형 변수
let rx, ry, rw=150, rh=30 ;
let step = 10;

// 원변수 
let cx, cy;
let cdirx , cdiry, cspeed;
const cr = 15;

// 컬러변수
let r, g, b ;
let cnt = 0 ;

// 점수
let score = 0;

// 이미지 소리 리소스 가져오기
let song1 , song2 ;
let bkimg ;

// 처음을 체크하는 플래그변수
let sflag = false ;

function preload() {
  // 소리 로드
  song1 = loadSound('Blop.mp3')
  song2 = loadSound('Blop2.mp3')
  
  //이미지 로드
  bkimg = loadImage('back1.jpg')
}

// 초기화
function initScreen() {
  //사각형 처음 위치
  rx = width / 2 - rw / 2 ;  
  ry = height - rh ;
  
  // 원의 처음 위치
  cdirx = -1 ;
  cdiry = 1 ;
  cspeed = 5;
  
  cx = floor(width / 2) ;
  cy = floor(height / 2) ;
  
  
  //score 
  score = 0 ;
  cnt = 0; 
  
  removeElements();
}

function setup() {
  createCanvas(720, 540);
  
  initScreen();
}

// 사각형 그리기
function rectDraw() {
  //rx = mouseX ;
  
  if (keyIsDown(LEFT_ARROW)) {
    rx = rx - step ;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    rx = rx + step ;
  }
  
  // 오른쪽 제어
  if (rx >= width - rw) {
    rx = width - rw ;    
  }
  
  // 왼쪽 제어
  if ( rx < 0) rx = 0 ;
  
  if (cnt % 100 == 0) {
    r = random(255) ;
    g = random(255) ;
    b = random(255) ;
  }
  
  fill(r, g, b) ;
  noStroke() ;
  rect(rx, ry, rw, rh);
}

// 원그리기
function circleDraw() {
  //막대에 닿았을때
  if(( cx > rx && cx <= rx + rw )  && (cy >= ry - cr) )   {
    cdiry = -cdiry
    cy = ry - cr ;
    score = score + 1 ;
    
    song1.play();
  }
  else if (cy >= height -rh) {
    cx = random(width / 2) ;
    cy = random(height / 2) ;
    score = score - 1 ;      
    song2.play();
  }
  
  // 왼쪽
  if (cx <= cr) {
    cdirx = -cdirx ;
    cx = cx + 10 ;
  }
  
  // 오른쪽
  if (cx >= width - cr ) {
    cdirx = -cdirx 
    cx = cx - 10 ;
  }
  
  // 위
  if (cy <= cr) {
    cdiry = -cdiry
    cy  = cy + 10 ;
  }
  
  // 아래
  if (cy >= height - cr) {
    cdiry = - cdiry ;
    cy = cy - 10 ;
  }
  
  cx = cx + cdirx * cspeed ;
  cy = cy + cdiry * cspeed ;
  
  fill(r, g, b);
  circle(cx, cy, cr*2);
}


// 방향키 설정
/*
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    rx = rx - step ;
  } else if (keyCode === RIGHT_ARROW) {
    rx = rx + step ;
  }
} 
*/

// 점수 표시
function showScore() {
  fill(0, 0, 0);
  textSize(32);
  text('점수 : ' + score, 10, 30);
}


// 시작버튼 
function changeFlag() {
  removeElements();
  sflag = true ;
}

function startBt() {
  button = createButton('시작하기');
  button.size(200, 50) ;
  button.position(250, height/5 * 3);
  button.style('font-size', '28px') ;
  button.mousePressed(changeFlag);
}

function stopBt() {
  button = createButton('다시하기');
  button.size(200, 50) ;
  button.position(250, height/5 * 3);
  button.style('font-size', '28px') ;
  button.mousePressed(initScreen);
}

function draw() {
  background(750);
  cnt++;
  
  if (!sflag) {
    startBt() 
  }
  else {
    if (score <= -2) {
      stopBt();
    }
    else {
      showScore() ;
      rectDraw() ;
      circleDraw() ;    
    }
    
  }
  
}