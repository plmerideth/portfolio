// JavaScript Document
/* eslint-disable no-alert, no-console */

//Create 3x3 array to capture player moves
let gameBoard = new Array(3);
for(let i=0; i<gameBoard.length; i++)
{
	gameBoard[i] = new Array(3);
}

const topLeft = document.getElementById('TL');
topLeft.addEventListener('touchend', display);
topLeft.addEventListener('click', display);
topLeft.addEventListener('click', (event)=>console.log(`Click. Event = ${event.target.classList}`) );

const topMiddle = document.getElementById('TM');
topMiddle.addEventListener('touchend', display);
topMiddle.addEventListener('click', display);

const topRight = document.getElementById('TR');
topRight.addEventListener('touchend', display);
topRight.addEventListener('click', display);

const middleLeft = document.getElementById('ML');
middleLeft.addEventListener('touchend', display);
middleLeft.addEventListener('click', display);

const middleMiddle = document.getElementById('MM');
middleMiddle.addEventListener('touchend', display);
middleMiddle.addEventListener('click', display);

const middleRight = document.getElementById('MR');
middleRight.addEventListener('touchend', display);
middleRight.addEventListener('click', display);

const bottomLeft = document.getElementById('BL');
bottomLeft.addEventListener('touchend', display);
bottomLeft.addEventListener('click', display);

const bottomMiddle = document.getElementById('BM');
bottomMiddle.addEventListener('touchend', display);
bottomMiddle.addEventListener('click', display);

const bottomRight = document.getElementById('BR');
bottomRight.addEventListener('touchend', display);
bottomRight.addEventListener('click', display);

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);
resetButton.addEventListener('touchend', resetGame);

const playerDone = document.getElementById('playerDone');
playerDone.addEventListener('click', nextPlayer);
playerDone.addEventListener('touchend', nextPlayer);

let lastPlayer='';
let currentPlayer='x';
let squareSelected=false;
let staleMate = false;
let messageID = document.getElementById('messageArea');
let gameTitle = document.getElementById('gameTitle');
let sector = "";
gameTitle.innerHTML = "<h2>Player X's Turn</h2>";
messageID.innerHTML = "<p>Player X Pick a Square</p>";

function nextPlayer()
{
	if(lastPlayer===currentPlayer)
	{
		return;
	}
	
	squareSelected = false;
	messageID.innerHTML = "";
	
	//Record players move into gameBoard array
	switch(sector)
	{
		case "TL":
			gameBoard[0][0] = lastPlayer;
		break;
		case "TM":
			gameBoard[0][1] = lastPlayer;
		break;
		case "TR":
			gameBoard[0][2] = lastPlayer;
		break;
		case "ML":
			gameBoard[1][0] = lastPlayer;
		break;
		case "MM":
			gameBoard[1][1] = lastPlayer;
		break;
		case "MR":
			gameBoard[1][2] = lastPlayer;
		break;
		case "BL":
			gameBoard[2][0] = lastPlayer;
		break;
		case "BM":
			gameBoard[2][1] = lastPlayer;
		break;
		case "BR":
			gameBoard[2][2] = lastPlayer;
		break;			
	}

	if(checkForWin())
	{
		if(staleMate)
		{
			gameTitle.innerHTML="<h2>Stalemate!</h2>";	
		}
		else
		{
			gameTitle.innerHTML="<h2>Congratulations!  Game Over</h2>";	
		}
	}
	else
	{
		if(lastPlayer==='x')
		{
			currentPlayer = 'y';
			gameTitle.innerHTML = "<h2>Player O's Turn</h2>";
		}
		else
		{
			currentPlayer = 'x';
			gameTitle.innerHTML = "<h2>Player X's Turn</h2>";
		}		
	}
}

function checkForWin()
{
	//Check horizontal rows
	let xRow=0, oRow=0;
	
	//Check for row win
	for(let row=0; row<gameBoard.length; row++)
	{
		xRow=0, oRow=0;
		for(let col=0; col<gameBoard[row].length; col++)
		{
			if(gameBoard[row][col]==='x')
			{
				xRow++;
			}
			else if(gameBoard[row][col]==='y')
			{
				oRow++;
			}
		}
		if(xRow>=3)
		{
			messageID.innerHTML="<p>Player X Wins!</p>";
			return true;
		}
		if(oRow>=3)
		{
			messageID.innerHTML="<p>Player O Wins!</p>";
			return true;
		}
	}

	//Check for col win
	for(let col=0; col<3; col++)
	{
		xRow=0, oRow=0;
		for(let row=0; row<3; row++)
		{
			if(gameBoard[row][col]==='x')
			{
				xRow++;
			}
			else if(gameBoard[row][col]==='y')
			{
				oRow++;
			}
		}
		if(xRow>=3)
		{
			messageID.innerHTML="<p>Player X Wins!</p>";
			return true;
		}
		if(oRow>=3)
		{
			messageID.innerHTML="<p>Player O Wins!</p>";
			return true;
		}
	}

	//Check for diagonal win
	if(gameBoard[1][1]!=undefined)
	{
		if((gameBoard[1][1]===gameBoard[0][0]) && (gameBoard[1][1]===gameBoard[2][2]))
		{
			if(gameBoard[1][1]==='x')
			{
				messageID.innerHTML="<p>Player X Wins!</p>";
				return true;
			}
			else
			{
				messageID.innerHTML="<p>Player O Wins!</p>";
				return true;
			}
		}
		else if((gameBoard[1][1]===gameBoard[2][0]) && (gameBoard[1][1]===gameBoard[0][2]))
		{
			if(gameBoard[1][1]==='x')
			{
				messageID.innerHTML="<p>Player X Wins!</p>";
				return true;
			}
			else
			{
				messageID.innerHTML="<p>Player O Wins!</p>";
				return true;
			}		
		}
	}
	
	//Check for stalemate
	//Check horizontal rows
	xRow=0, oRow=0;
	
	//Count Xs and Ox
	for(let row=0; row<gameBoard.length; row++)
	{
		for(let col=0; col<gameBoard[row].length; col++)
		{
			if(gameBoard[row][col]==='x')
			{
				xRow++;
			}
			else if(gameBoard[row][col]==='y')
			{
				oRow++;
			}
		}
	}
	if(xRow+oRow===9)
	{
		messageID.innerHTML = "<p>Sorry, no one wins!</p>";
		staleMate = true;
		return true;
	}
	return false;
}

//function highlight(event)
//{
//	event.target.classList.toggle('highlight');
//	console.log(`Click. Post-toggle Event = ${event.target.classList}`);
//}

function resetGame()
{
	lastPlayer='';
	currentPlayer='x';
	squareSelected=false;
	staleMate = false;
	sector = "";
	gameTitle.innerHTML = "<h2>Player X's Turn</h2>";
	messageID.innerHTML = "<p>Player X Pick a Square</p>";

	gameBoard = new Array(3);
	for(let i=0; i<gameBoard.length; i++)
	{
		gameBoard[i] = new Array(3);
	}	
	
	topLeft.innerHTML = "";
	topMiddle.innerHTML= "";
	topRight.innerHTML = "";
	middleLeft.innerHTML = "";
	middleMiddle.innerHTML = "";
	middleRight.innerHTML = "";
	bottomLeft.innerHTML = "";
	bottomMiddle.innerHTML = "";
	bottomRight.innerHTML = "";
}

function display()
{
	if(currentPlayer==='x') //Player = x player
	{
		if(event.target.innerHTML==="X")
		{
			event.target.innerText = ""; //Toggle X on or off until DONE button clicked
			squareSelected = false;
		}
		else if(squareSelected===false)
		{
			event.target.innerHTML = "<H1>X</H1>";
			squareSelected = true;
			sector = event.target.id; //capture new sector selected
			lastPlayer='x';
			currentPlayer='y';
		}
		else
		{
			messageID.innerHTML = "<p>Only one O per turn</p>";	
		}
	}
	else if(currentPlayer==='y') //Player = y player
	{
		if(event.target.innerHTML==="O")
		{
			event.target.innerText = ""; //Toggle X on or off until DONE button clicked
			squareSelected = false;
		}
		else if(squareSelected===false)
		{
			event.target.innerHTML = "<H1>O</H1>";
			squareSelected = true;
			sector = event.target.id;
			lastPlayer='y';
			currentPlayer='x';
		}
		else //The current player is y, but the next player button was clicked before a box was selected
		{
			messageID.innerHTML = "<p>Only one X per turn</p>";	
		}		
	}
}
