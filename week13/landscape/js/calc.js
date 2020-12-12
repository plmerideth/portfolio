import {calcArray} from './main.js';
import {myProject, myProjects, myCurrentProjectData, currentGrid, myMaterialCosts} from './main.js';

const xTopsoil=0, xLawn=1, xWeedBlock=2, xRock=3, xCust1=4, xCust2=5;
const yUnitCost=0, yDelCost=1, yCount=2, yCost=3;
let topsoilDepth=1, rockDepth=1, custom2Depth=1;

export function initCalcArray()
{
  //Intialize array
  for(let row=0; row<calcArray.length; row++)
  {
    calcArray[row] = new Array(4);
  }
  calcArray[xTopsoil][yUnitCost] = myProject.materialCosts.topsoilCost;
  calcArray[xLawn][yUnitCost] = myProject.materialCosts.lawnCost;
  calcArray[xWeedBlock][yUnitCost] = myProject.materialCosts.weedBlockCost;
  calcArray[xRock][yUnitCost] = myProject.materialCosts.rockCost;
  calcArray[xCust1][yUnitCost] = myProject.materialCosts.custom1Cost;
  calcArray[xCust2][yUnitCost] = myProject.materialCosts.custom2Cost;
  calcArray[xTopsoil][yDelCost] = myProject.materialCosts.topsoilDelivery;
  calcArray[xLawn][yDelCost] = myProject.materialCosts.lawnDelivery;
  calcArray[xWeedBlock][yDelCost] = myProject.materialCosts.weedBlockDelivery;
  calcArray[xRock][yDelCost] = myProject.materialCosts.rockDelivery;
  calcArray[xCust1][yDelCost] = myProject.materialCosts.custom1Delivery;
  calcArray[xCust2][yDelCost] = myProject.materialCosts.custom2Delivery;

  topsoilDepth = myProject.materialCosts.topsoilDepth;
  rockDepth = myProject.materialCosts.rockDepth;
  custom2Depth = myProject.materialCosts.custom2Depth;
}

export function updateProjectCosts()
{
  let brown=0, green=0, black=0, red=0, blue=0, yellow=0;
  //Count the occurences of each material and update calcArray
  for(let i=0; i<currentGrid.length; i++)
  {
    if(typeof(currentGrid[i])==='string')
    {
      if(currentGrid[i].includes('brown'))
      {brown++;}
    }
    if(typeof(currentGrid[i])==='string')
    {
      if(currentGrid[i].includes('green'))
      {green++;}
    }
    if(typeof(currentGrid[i])==='string')
    {
      if(currentGrid[i].includes('black'))
      {black++;}
    }
    if(typeof(currentGrid[i])==='string')
    {
      if(currentGrid[i].includes('red'))
      {red++;}
    }
    if(typeof(currentGrid[i])==='string')
    {
      if(currentGrid[i].includes('blue'))
      {blue++;}
    }
    if(typeof(currentGrid[i])==='string')
    {
      if(currentGrid[i].includes('yellow'))
      {yellow++;}
    }
  }

  //Update Cost
  calcArray[xTopsoil][yCount]=brown;
  calcArray[xLawn][yCount]=green*myProject.gridL*myProject.gridW; //Sq Ft
  calcArray[xWeedBlock][yCount]=black*myProject.gridL*myProject.gridW; //Sq Ft;
  calcArray[xRock][yCount]=red;
  calcArray[xCust1][yCount]=blue*myProject.gridL*myProject.gridW; //Sq Ft;;
  calcArray[xCust2][yCount]=yellow;
  calcArray[xTopsoil][yCost]=calcArray[xTopsoil][yUnitCost] * calcArray[xTopsoil][yCount];
  calcArray[xLawn][yCost]=calcArray[xLawn][yUnitCost] * calcArray[xLawn][yCount];
  calcArray[xWeedBlock][yCost]=calcArray[xWeedBlock][yUnitCost] * calcArray[xWeedBlock][yCount];
  calcArray[xRock][yCost]=calcArray[xRock][yUnitCost] * calcArray[xRock][yCount];
  calcArray[xCust1][yCost]=calcArray[xCust1][yUnitCost] * calcArray[xCust1][yCount];
  calcArray[xCust2][yCost]=calcArray[xCust2][yUnitCost] * calcArray[xCust2][yCount];

}

export function renderProjectCosts()
{
  const materialWindowID = document.getElementById('materialWindow');
  const quantityID = document.getElementById('quantity');
  const costsID = document.getElementById('costs');

  let materialWindowString = '';
  materialWindowString =
    `<p>Topsoil-cu yd</p>
    <p>Lawn-sq ft</p>
    <p>Weed Block-sq ft</p>
    <p>Rock-cu yd</p>
    <p>Custom1-sq ft</p>
    <p>Custom2-cu yd</p>`;
    materialWindowID.innerHTML = materialWindowString;

    let quantityString = '';
    quantityString =
    `<p>${calcArray[xTopsoil][yCount]} cu yd</p>
    <p>${calcArray[xLawn][yCount]} sq ft</p>
    <p>${calcArray[xWeedBlock][yCount]} sq ft</p>
    <p>${calcArray[xRock][yCount]} cu yd</p>
    <p>${calcArray[xCust1][yCount]} sq ft</p>
    <p>${calcArray[xCust2][yCount]} cu yd</p>`;
    quantityID.innerHTML = quantityString;

  let costsString = '';
  costsString =
    `<p>$${calcArray[xTopsoil][yCost]}</p>
    <p>$${calcArray[xLawn][yCost]}</p>
    <p>$${calcArray[xWeedBlock][yCost]}</p>
    <p>$${calcArray[xRock][yCost]}</p>
    <p>$${calcArray[xCust1][yCost]}</p>
    <p>$${calcArray[xCust2][yCost]}</p>`;
    costsID.innerHTML = costsString;
}
