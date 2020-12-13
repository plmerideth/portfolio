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
  calcArray[xTopsoil][yCount]=(brown*(myProject.gridL/3)*(myProject.gridW/3)
    *(myProject.materialCosts.topsoilDepth/36)).toFixed(2); //cu yd
  calcArray[xLawn][yCount]=parseFloat(green*myProject.gridL*myProject.gridW).toFixed(2); //Sq Ft
  calcArray[xWeedBlock][yCount]=parseFloat(black*myProject.gridL*myProject.gridW).toFixed(2); //Sq Ft;
  calcArray[xRock][yCount]=(red*(myProject.gridL/3)*(myProject.gridW/3)*(myProject.materialCosts.topsoilDepth/36)).toFixed(2); //cu yd
  calcArray[xCust1][yCount]=parseFloat(blue*myProject.gridL*myProject.gridW).toFixed(2); //Sq Ft;;
  calcArray[xCust2][yCount]=(yellow*(myProject.gridL/3)*(myProject.gridW/3)*(myProject.materialCosts.topsoilDepth/36)).toFixed(2); //cu yd

  calcArray[xTopsoil][yCost]= ((parseFloat(numberCheck(calcArray[xTopsoil][yUnitCost])) * parseFloat(numberCheck(calcArray[xTopsoil][yCount])))
    + (parseFloat(numberCheck(calcArray[xTopsoil][yCount]))>0 ? parseFloat(numberCheck(myProject.materialCosts.topsoilDelivery)) : 0)).toFixed(2);
  calcArray[xLawn][yCost]= ((parseFloat(numberCheck(calcArray[xLawn][yUnitCost])) * parseFloat(numberCheck(calcArray[xLawn][yCount])))
    + (parseFloat(numberCheck(calcArray[xLawn][yCount]))>0 ? parseFloat(numberCheck(myProject.materialCosts.lawnDelivery)) : 0)).toFixed(2);
  calcArray[xWeedBlock][yCost]= ((parseFloat(numberCheck(calcArray[xWeedBlock][yUnitCost])) * parseFloat(numberCheck(calcArray[xWeedBlock][yCount])))
    + (parseFloat(numberCheck(calcArray[xWeedBlock][yCount]))>0 ? parseFloat(numberCheck(myProject.materialCosts.weedBlockDelivery)) : 0)).toFixed(2);
  calcArray[xRock][yCost]= ((parseFloat(numberCheck(calcArray[xRock][yUnitCost])) * parseFloat(numberCheck(calcArray[xRock][yCount])))
    + (parseFloat(numberCheck(calcArray[xRock][yCount]))>0 ? parseFloat(numberCheck(myProject.materialCosts.rockDelivery)) : 0)).toFixed(2);
  calcArray[xCust1][yCost]= ((parseFloat(numberCheck(calcArray[xCust1][yUnitCost])) * parseFloat(numberCheck(calcArray[xCust1][yCount])))
    + (parseFloat(numberCheck(calcArray[xCust1][yCount]))>0 ? parseFloat(numberCheck(myProject.materialCosts.custom1Delivery)) : 0)).toFixed(2);
  calcArray[xCust2][yCost]= ((parseFloat(numberCheck(calcArray[xCust2][yUnitCost])) * parseFloat(numberCheck(calcArray[xCust2][yCount])))
    + (parseFloat(numberCheck(calcArray[xCust2][yCount]))>0 ? parseFloat(numberCheck(myProject.materialCosts.custom2Delivery)) : 0)).toFixed(2);
}


function numberCheck(value)
{
  if(value==='NaN' || value==='')
  { return 0;}
  else
  {return value}
}

export function renderProjectCosts()
{
  const materialWindowID = document.getElementById('materialWindow');
  const quantityID = document.getElementById('quantity');
  const costsID = document.getElementById('costs');
  const totalCostsID = document.getElementById('totalCosts');

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

  //Calculate total costs
  let totalCosts = (parseFloat(calcArray[xTopsoil][yCost])
    + parseFloat(calcArray[xLawn][yCost])
    + parseFloat(calcArray[xWeedBlock][yCost])
    + parseFloat(calcArray[xRock][yCost])
    + parseFloat(calcArray[xCust1][yCost])
    + parseFloat(calcArray[xCust2][yCost])).toFixed(2);

  let totalCostString = '';
  totalCostString =
  `<h1>Total Cost</h1>
    <p>$${totalCosts}</p>;`
  totalCostsID.innerHTML = totalCostString;
}
