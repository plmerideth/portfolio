import {myProject, selectedMaterials, myCurrentProjectData, currentGrid} from './main.js';
import {calcGridIndex} from './utilities.js';
import {GridCoord} from './projects.js';

let topsoilColor = 'brown';
let lawnColor = 'green';
let weedBlockColor = 'black';
let rockColor = 'red';
let custom1Color = 'blue';
let custom2Color = 'yellow';
// let cssRuleCount = 0;

export function clearCheckBoxes()
{
    document.getElementById('topsoilCB').checked = false;
    document.getElementById('lawnCB').checked = false;
    document.getElementById('weedBlockCB').checked = false;
    document.getElementById('rockCB').checked = false;
    document.getElementById('custom1CB').checked = false;
    document.getElementById('custom2CB').checked = false;
    topsoilSelect();
    lawnSelect();
    weedBlockSelect();
    rockSelect();
    custom1Select();
    custom2Select();
}

export function topsoilSelect()
{
  const checkboxID = document.getElementById('topsoilCB');
  if(checkboxID.checked===true)
  {
    selectedMaterials.topsoilColor = topsoilColor;
    document.getElementById('topsoilLabel').style.background = topsoilColor;
    document.getElementById('topsoilLabel').style.color = 'white';
  }
  else
  {
    selectedMaterials.topsoilColor = '';
    document.getElementById('topsoilLabel').style.background = '';
    document.getElementById('topsoilLabel').style.color = 'black';
  }
}

export function lawnSelect()
{
  const checkboxID = document.getElementById('lawnCB');
  if(checkboxID.checked===true)
  {
    selectedMaterials.lawnColor = lawnColor;
    document.getElementById('lawnLabel').style.background = lawnColor;
    document.getElementById('lawnLabel').style.color = 'white';
  }
  else
  {
    selectedMaterials.lawnColor = '';
    document.getElementById('lawnLabel').style.background = '';
    document.getElementById('lawnLabel').style.color = 'black';
  }
}

export function weedBlockSelect()
{
  const checkboxID = document.getElementById('weedBlockCB');
  if(checkboxID.checked===true)
  {
    selectedMaterials.weedBlockColor = weedBlockColor;
    document.getElementById('weedBlockLabel').style.background = weedBlockColor;
    document.getElementById('weedBlockLabel').style.color = 'white';
  }
  else
  {
    selectedMaterials.weedBlockColor = '';
    document.getElementById('weedBlockLabel').style.background = '';
    document.getElementById('weedBlockLabel').style.color = 'black';
  }
}

export function rockSelect()
{
  const checkboxID = document.getElementById('rockCB');
  if(checkboxID.checked===true)
  {
    selectedMaterials.rockColor = rockColor;
    document.getElementById('rockLabel').style.background = rockColor;
    document.getElementById('rockLabel').style.color = 'white';
  }
  else
  {
    selectedMaterials.rockColor = '';
    document.getElementById('rockLabel').style.background = '';
    document.getElementById('rockLabel').style.color = 'black';
  }
}

export function custom1Select()
{
  const checkboxID = document.getElementById('custom1CB');
  if(checkboxID.checked===true)
  {
    selectedMaterials.custom1Color = custom1Color;
    document.getElementById('custom1Label').style.background = custom1Color;
    document.getElementById('custom1Label').style.color = 'white';
  }
  else
  {
    selectedMaterials.custom1Color = '';
    document.getElementById('custom1Label').style.background = '';
    document.getElementById('custom1Label').style.color = 'black';
  }
}

export function custom2Select()
{
  const checkboxID = document.getElementById('custom2CB');
  if(checkboxID.checked===true)
  {
    selectedMaterials.custom2Color = custom2Color;
    document.getElementById('custom2Label').style.background = custom2Color;
    document.getElementById('custom2Label').style.color = 'black';
  }
  else
  {
    selectedMaterials.custom2Color = '';
    document.getElementById('custom2Label').style.background = '';
    document.getElementById('custom2Label').style.color = 'black';
  }
}

export function buildGrid(rows, cols)
{
  const gridHeader = document.getElementById('gridHeader');
  const container2ID = document.getElementById('container2');
  //Clear any existing grid
  container2ID.innerHTML='';

  //add grid title
  if(myProject.projectName === undefined)
  {
    gridHeader.innerHTML =
    `<div class="grid2TitleDiv"><h1 class="grid2Title">Landscape Grid</h1></div>`;
  }
  else
  {
    gridHeader.innerHTML =
    `<div class="grid2TitleDiv"><h1 class="grid2Title">Project: ${myProject.projectName}</h1></div>
      <h2 class="lotLength">Total Lot Length (Horz): ${myProject.length} ft</h2>
      <h2 class="lotWidth">Total Lot Width (Vert): ${myProject.width} ft</h2>
      <h2 class="gridL">Each Box (Horz): ${myProject.gridL} ft</h2>
      <h2 class="gridW">Each Box (Vert): ${myProject.gridW} ft</h2>
      `;
  }

  // const gridTitleID = document.getElementById('gridTitle');
  // gridTitleID.style.gridColumn = `1/${cols+1}`;

  let divID="g", divClass="grid";

  for(let row=1; row<=rows; row++)
  {
    for(let col=1; col<=cols; col++)
    {
        divID += row + "-" + col;
        divClass += row;
        container2ID.appendChild(renderGridDiv(divID, divClass, row, rows, col, cols));
        //Add unique eventListener for every grid div element
        const gridDiv = document.getElementById(divID);
        gridDiv.addEventListener('click', colorGridDiv);
        gridDiv.currColor="";
        divID="g"; //Reset for next loop
        divClass="grid"; //Reset for next loop
    }
  }
}

export function hideGrid()
{
  const container2ID = document.getElementById('container2');
  const gridHeaderID = document.getElementById('gridHeader');
  const checkboxID = document.getElementById('checkboxID');
  if(checkboxID.checked===true)
  {
      container2ID.classList.add('gridHide');
      gridHeaderID.classList.add('gridHide');
  }
  else
  {
    container2ID.classList.remove('gridHide');
    gridHeaderID.classList.remove('gridHide');
  }
}


export function colorGridDiv(e, materialIndex=null)
{
  //Save grid coordinate.  Remove leading 'g'
  let gridBox = null;
  let gridBoxID = null;
  let removeFlag = false;
  let eventClick = false;
  if(e===event) //If colorGridDiv() called by event handler
  {
    eventClick = true;
    gridBox = this.id.substring(1);
    if(e.currentTarget.currColor==='remove')
    {
     removeFlag = true;
    }
  }
  else //colorGridDiv() called by openProjectConfirm()
  {
    let gridBoxString = 'g'+e;
    gridBoxID = document.getElementById(gridBoxString);
    gridBox = e;
  }

  //Count how many materials are currently selected and put in order in an array
  let materialCount=0;
  let selectedMaterialsArray = [];
  if(eventClick)
  {
    for(let p of Object.values(selectedMaterials))
    {
      if(p!='')
      {
        selectedMaterialsArray[materialCount] = p;
        materialCount++;
      }
    }
  }
  else  //this is an open project.  Populate selectedMaterialsArray[] from myProject
  {
    //Determine how many colors are in currentGrid box
    let tempString1=myProject.gridCoord[materialIndex].material;
    let tempString2=null;
    let tempIndex=0, doExit=false;
    do
    {
      tempIndex = tempString1.indexOf(',');
      if(tempIndex!=-1)
      {
        tempString2 = tempString1.substring(0, tempIndex);
      }
      else
      {
        tempString2 = tempString1.substring(0);
      }
      tempString1 = tempString1.substring(tempIndex+1);
      selectedMaterialsArray[materialCount] = tempString2;
      materialCount++;
      if(tempIndex===-1)
      {
        doExit = true;
      }
    }while (doExit===false);
  }

  //If currentTarget.currColor = 'remove' then remove grid box coloring.
  // if(e.currentTarget.currColor==="remove")
  if(removeFlag)
  {
    let gridDivDiv = null;
    let currentGridIndex=null, row=null, col=null;

    //Remove colors from currentGrid
    currentGridIndex = calcGridIndex(gridBox);

    //Determine how many colors are in currentGrid box so you know how many divs to remove
    let tempString1=currentGrid[currentGridIndex-1];
    let tempString2=null;
    let colorCount=0, tempIndex=0;
    do {
      colorCount++;
      tempIndex = tempString1.indexOf(',');
      if(tempIndex>=0)
      {
        tempString2 = tempString1.substring(tempIndex+1);
        tempString1 = tempString2;
      }
    } while (tempIndex>=0);

    currentGrid[currentGridIndex-1] = null;

    //Remove from myProject.gridCoord[].  First, find gridBox match in myProject.gridCoord
    let coordIndex = null;
    myProject.gridCoord.forEach(function(v,i)
    {
      if(v.gridID === gridBox)
      {
        coordIndex = i;
      }
    })

    delete(myProject.gridCoord[coordIndex]);
    //Convert sparse to dense
    for(let i=coordIndex; i<myProject.gridCoord.length; i++)
    {
      myProject.gridCoord[i] = myProject.gridCoord[i+1];
    }
    myProject.gridCoord.length--;

    //Remove divs that form colored rectangles
    for(let i=1; i<=colorCount; i++)
    {
        gridDivDiv = document.getElementById(this.id.substring(1)+i);
        gridDivDiv.remove();
    }

    this.style.background='';
    //e.currentTarget.currColor is set to '' or 'remove' and toggles between a selected and unselected grid box
    e.currentTarget.currColor='';
    // this.innerHTML = this.innerHTML = `<p>${gridBox}</p>`;;
  }else
  {
    let gridDivDiv = null;
    let divClass = 'divDiv'
    //this.style.gridTemplateRows = `repeat(${materialCount}, 1fr)`;

    //Build and append divs into selected grid to display material colors
    if(materialCount>0)
    {
      for(let i=1; i<=materialCount; i++)
      {
          gridDivDiv = document.createElement('div');
          if(eventClick)
          {
            this.appendChild(gridDivDiv);
          }
          else
          {
            gridBoxID.appendChild(gridDivDiv);
          }
          divClass+=materialCount;
          gridDivDiv.classList.add(divClass);
          if(eventClick)
          {
            gridDivDiv.id = this.id.substring(1)+i;
          }
          else
          {
            gridDivDiv.id = gridBoxID.id.substring(1)+i;
          }
          gridDivDiv.gridRow = i;
          gridDivDiv.style.background = selectedMaterialsArray[i-1];
          divClass='divDiv'
      }

      //Write colors to currentGrid
      let currentGridIndex=null, row=null, col=null;
      let colorString = '';
      selectedMaterialsArray.forEach(function(v, i)
      {
        colorString += v;
        if(i<selectedMaterialsArray.length-1)
        {
          colorString+=',';
        }
      });
      currentGridIndex = calcGridIndex(gridBox);
      currentGrid[currentGridIndex-1] = colorString;

      if(eventClick)
      {
        //Save grid coordinate and materials to myProject
        myProject.gridCoord[myProject.gridCoord.length] = new GridCoord(gridBox, colorString);
        //e.currentTarget.currColor is set to '' or 'remove' and toggles between a selected and unselected grid box
        e.currentTarget.currColor = 'remove';
      }
      else
      {
        gridBoxID.currColor = 'remove';
      }
    }
  }
}

function renderGridDiv(divID, divClass, row, rows, col, cols)
{
    //Create class and insert into styles.css
    let mySheet = document.styleSheets[0];
    mySheet.insertRule(`.${divClass}{grid-row: ${row+1}`, row );

    const gridDiv = document.createElement("div");

    const bottomRow = 'g' + rows.toString();
    const rightCol = cols.toString();
    const topRightCol = 'g1-' + cols.toString();
    const bottomLeft = 'g' + rows.toString() + '-1';
    const bottomRight = 'g' + rows.toString() + '-' + cols.toString();

    gridDiv.id=divID;
    gridDiv.classList.add('grid', divClass);
    const dashIndex = divID.indexOf('-');

    if(divID.substring(0,dashIndex)===bottomRow)
    {
      gridDiv.classList.add('gridBottom');
    }
    if(divID.substring(dashIndex+1)===rightCol)
    {
      gridDiv.classList.add('gridRight');
    }
    if(divID.substring(0,5)==="g1-1")
    {
      gridDiv.classList.add('gridTopLeft');
    }
    if(divID.substring(0)===topRightCol)
    {
      gridDiv.classList.add('gridTopRight');
    }
    if(divID.substring(0)===bottomLeft)
    {
      gridDiv.classList.add('gridBottomLeft');
    }
    if(divID.substring(0)===bottomRight)
    {
      gridDiv.classList.add('gridBottomRight');
    }
    if(row%5 === 0)
    {
      gridDiv.classList.add('horizontalTickMark');
    }
    if(col%5 === 0)
    {
      gridDiv.classList.add('verticalTickMark');
    }

    const gridBox = divID.substring(1);
    gridDiv.innerHTML = '';
    // gridDiv.innerHTML = `<p>${gridBox}</p>`;
    return gridDiv;
}
