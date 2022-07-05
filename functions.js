const bgrd = document.getElementById("background");
const fgrd = document.getElementById("snakeLayout");
var ctxBgrd = bgrd.getContext("2d");
var ctxFgrd = fgrd.getContext("2d");
const game = {height: 500, width: 1000, blockSize: 20, xFood: 0,yFood: 0};
var snakeHead = {xPos: Math.floor((game.width/game.blockSize)/2),yPos: Math.floor((game.height/game.blockSize)/2)};
var snakeLenght = 3;
var grid = [];
var lastUserInput = "a";

background();
createBoard();
food();
drawGame();
setInterval(automove,200);

function automove()
{
userInput(lastUserInput);
drawGame();
}

function background() 
{
    for (var row = 0; row < game.height; row += game.blockSize) {
        ctxBgrd.moveTo(0, row);
        ctxBgrd.lineTo(game.width, row);
        ctxBgrd.strokeStyle = "#009978";
        ctxBgrd.stroke();
    }
    for (var column = 0; column < game.width; column += game.blockSize) {
        ctxBgrd.moveTo(column, 0);
        ctxBgrd.lineTo(column, game.height );
        ctxBgrd.strokeStyle = "#009978";
        ctxBgrd.stroke();
    }
    
}


function createBoard ()
{
    var numberOfy = game.height/game.blockSize;
    var numberOfx = game.width/game.blockSize;

    for (var x = 0; x < numberOfx; x++)
    {
        grid[x]= [];

        for (var y = 0; y < numberOfy; y++)
        {
            grid[x][y] = 0;
        }
    }

}
function drawBlock(x,y,color)
{
    ctxFgrd.fillStyle = color;
    ctxFgrd.fillRect(x , y, game.blockSize, game.blockSize);
}

function keyPressed()
{
    var input = document.getElementById("fname");   // get what we typed
    userInput(input.value); // sends user's input to controls
    lastUserInput = input.value;
    input.value = "";
} 

function userInput(keyPress) //add aw, wa, wd, dw, ds, sd, sa, as
{

    ctxFgrd.clearRect(0,0, game.width,game.height);

    if(keyPress == 'w')
    {
        console.log(keyPress);
        up();
    } 
    else if(keyPress == 'a')
    {
        console.log(keyPress);
        left();
    }
    else if(keyPress == 's')
    {
        console.log(keyPress);
        down();
    }
    else if(keyPress == 'd')
    {
        console.log(keyPress);
        right();
    }
    if (snakeHead.xPos == game.xFood && snakeHead.yPos == game.yFood)
    {
        snakeLenght+= 2;
        food();
        var numberOfy = game.height/game.blockSize;
        var numberOfx = game.width/game.blockSize;

        for (var x = 0; x < numberOfx; x++)
        {
            for (var y = 0; y < numberOfy; y++)
            {
                if (grid[x][y] > 0)  
                {
                    grid[x][y]+= 2;
                }
            }
        
        }

    }

    drawGame();
}

function snakeReset(){
    var numberOfy = game.height/game.blockSize;
    var numberOfx = game.width/game.blockSize;

    for (var x = 0; x < numberOfx; x++)
    {
        for (var y = 0; y < numberOfy; y++)
        {
            if (grid[x][y] > 0)  
            {
                grid[x][y]--;
            }
        }
        
    }
}

function up()
{
    if(!death(snakeHead.xPos,snakeHead.yPos - 1))
    {
        snakeHead.yPos -= 1;
        grid[snakeHead.xPos][snakeHead.yPos] = snakeLenght + 1;

        snakeReset();
    }
    else
    resetGame();
}
function down()
{
    if(!death(snakeHead.xPos,snakeHead.yPos + 1))
    {
        snakeHead.yPos += 1;
        grid[snakeHead.xPos][snakeHead.yPos] = snakeLenght + 1;

        snakeReset();
    }
    else
    resetGame();
}
function right()
{
    if(!death(snakeHead.xPos + 1,snakeHead.yPos))
    {
        snakeHead.xPos += 1;
        grid[snakeHead.xPos][snakeHead.yPos] = snakeLenght + 1;

        snakeReset();
    }
    else
    resetGame();
}
function left()
{
    if(!death(snakeHead.xPos - 1,snakeHead.yPos))
    {
        snakeHead.xPos -= 1;
        grid[snakeHead.xPos][snakeHead.yPos] = snakeLenght + 1;

        snakeReset();
    }
    else
    resetGame();
}

function drawGame()
{
    var numberOfy = game.height/game.blockSize;
    var numberOfx = game.width/game.blockSize;

    for (var x = 0; x < numberOfx; x++)
    {
        for (var y = 0; y < numberOfy; y++)
        {
            if (grid[x][y] > 0)  
            {
                drawBlock(x*game.blockSize, y*game.blockSize,"#ff0000");
            }
        }
    }
    drawBlock(game.xFood*game.blockSize,game.yFood*game.blockSize,"#ffffff");
}

function food()
{
    game.xFood = Math.floor(Math.random()*(game.width/game.blockSize))
    game.yFood = Math.floor(Math.random()*(game.height/game.blockSize))

}



function death(x,y)
{
    if(x > Math.floor(game.width/game.blockSize)|| y > Math.floor(game.height/game.blockSize) || x < 0 || y < 0)
        return(true);
    if (grid[x][y]>0)
        {
            return(true);
        }
    if (grid[x][y]<0)
        {
            return(true);
        }
}

function resetGame(){
    snakeHead.xPos = Math.floor((game.width/game.blockSize)/2);
    snakeHead.yPos = Math.floor((game.height/game.blockSize)/2);
    snakeLenght= 3;
    lastUserInput = "a";

    var numberOfy = game.height/game.blockSize;
    var numberOfx = game.width/game.blockSize;

    for (var x = 0; x < numberOfx; x++)
    {
        grid[x]= [];

        for (var y = 0; y < numberOfy; y++)
        {
            grid[x][y] = 0;
        }
    }
    food();
    drawGame();
}