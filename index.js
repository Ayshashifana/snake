
// get the gameboard element to get the context and draw
const gameBoard=document.getElementById("gameBoard")
const context = gameBoard.getContext('2d');
const score=document.getElementById('scoreVal')

//storing width and height of the canvas given 400px resp.
const Wcan=gameBoard.width;
const Hcan=gameBoard.height;

// the size of the red food 20*20px
const foodSize=20;

let foodX;
let foodY;

// head of the snake initially 
let headx=20;
let heady=0;


let Score=0;
let active=true;
let started=false;


// object to draw snake
let snake =[
    {x:foodSize*4,y:0},
    {x:foodSize*3,y:0},
    {x:foodSize*2,y:0},
    {x:foodSize,y:0},
    {x:0,y:0}
    ]

// keypress 
window.addEventListener("keydown",keyPress);
startGame();




//  function to play the game 
function startGame(){

// filling the game board with color 
    context.fillStyle='#545B77';

// fillRect(startpoint,endpoint,width,height)
    context.fillRect(0,0,Wcan,Hcan);



    createFood();
    displayfood();
//    drawSnake();
//    moveSnake();
//    clearBoard();
   drawSnake();
//   movingSnake();
}


function clearBoard(){
    context.fillStyle='#545B77';
    context.fillRect(0,0,Wcan,Hcan);
}

function createFood(){
    //x and y  co-ordinates for the food. 
    foodX=Math.floor(Math.random()*Wcan/foodSize)*foodSize;
    foodY=Math.floor(Math.random()*Hcan/foodSize)*foodSize;

}

function displayfood(){
    // coloring the food with respect to the co-ordinates
    context.fillStyle='red';
    context.fillRect(foodX,foodY ,foodSize,foodSize);
}

function drawSnake(){

    // making the snake structure using snake object in for each loop giving the co-ordinates
        context.fillStyle='#5C8984';
        snake.forEach(snakePart => {
          context.fillRect  (snakePart.x,snakePart.y,foodSize,foodSize);
            context.strokeStyle= "#374259";
            context.strokeRect(snakePart.x,snakePart.y,foodSize,foodSize);
        });
}

function moveSnake(){

    const head={x:snake[0].x+headx,y:snake[0].y+heady}
    
    snake.unshift(head);

    if(snake[0].x==foodX && snake[0].y==foodY){
        createFood();
        Score+=1;
        score.textContent=Score;
    }
    else{
        snake.pop()
    }
    
}

function movingSnake(){
    if(active){
        setTimeout(()=>{
            clearBoard();
            displayfood();
            drawSnake();
            moveSnake();
            checkGameover();
            movingSnake();
    },200)
    }
    else {
        clearBoard();
        context.font="bold 40px serif";
        context.fillStyle="white";
        context.textAlign="center";
        context.fillText("Game Over you lose!!",Wcan/2,Hcan/2);
    }
}

function keyPress(event){
        if(!started){
            started=true;
            movingSnake();
        }
    // key codes for left,right,top,bottom
    const left=37;
    const top = 38;
    const right = 39;
    const bottom = 40;

    switch(true){

        // to move left :the head x cordinates is reduced
        case(event.keyCode==left && headx!=foodSize):
        headx=-foodSize;
        heady = 0;
        break; 


        case(event.keyCode==right && headx!=-foodSize):
        headx=foodSize;
        heady = 0;
        break; 

        case(event.keyCode==top && heady!=foodSize):
        headx=0;
        heady =-foodSize;
        break; 

        case(event.keyCode==bottom  && heady!=-foodSize):
        headx=0;
        heady = foodSize;
        break; 
    }

}
function checkGameover(){
    switch(true){
        case(snake[0].x<0):
        case (snake[0].x>=Wcan):
            case(snake[0].y<0):
        case (snake[0].y>=Hcan):
            active=false;
            break;
    }
}