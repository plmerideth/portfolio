import {buildGrid, hideGrid, colorGridDiv, clearCheckBoxes} from './grid.js';
import {myProject, myProjects, myCurrentProjectData, currentGrid, myMaterialCosts} from './main.js';
import {createButton, readLocalStorage, writeLocalStorage} from './utilities.js';
import {renderMaterialCosts} from './materials.js';
import {initCalcArray, updateProjectCosts, renderProjectCosts} from './calc.js';

// export class Projects
// {
//     constructor()
//     {
//       this.project = [];
//     }
// }

export class Project
{
    constructor(name, length, width, gridL, gridW, container2)
    {
        this.projectName = name;
        this.length = length;
        this.width = width;
        this.gridL = 0;
        this.gridW = 0;
        this.rows = null,
        this.cols = null,
        this.container2 = container2;
        this.gridCoord = [];
        this.materialCosts = {};
    }
};

export class GridCoord
{
  constructor(gridID, material)
  {
      this.gridID = gridID,
      this.material = material
  }
}

const container3Div = document.getElementById('container3');
const scrollContentRight = document.getElementById('scrollContentRight');
const title = document.getElementById('projectCostsTitle');

export function clearMyProject()
{
  myProject.projectName = undefined;
  myProject.length = 0;
  myProject.width = 0;
  myProject.gridL = 0;
  myProject.gridW = 0;
  myProject.rows = 0,
  myProject.cols = 0,
  myProject.container2 = undefined;
  myProject.gridCoord = [];
  myProject.materialCosts = {};

}


export function renderProjectsArea(empty=null)
{
  if(empty==="empty")
  {
    let area = document.getElementById('materialWindow');
    area.innerHTML = '';
    area = document.getElementById('quantity');
    area.innerHTML = '';
    area.style.borderLeft = 'none';
    area = document.getElementById('costs');
    area.innerHTML = '';
    area.style.borderLeft = 'none';
    area = document.getElementById('totalCosts');
    area.innerHTML = '';
    area.style.borderLeft = 'none';
  }
  else
  {
    title.innerHTML = 'Project Costs';
    scrollContentRight.style.borderBottom = '2px solid black';
    container3Div.style.borderRight = '2px solid black';
    let area = document.getElementById('materialWindow');
    area.innerHTML='';
    area.style.borderLeft = '1px solid black';
    area = document.getElementById('quantity');
    area.innerHTML='';
    area.style.borderLeft = '1px solid black';
    area = document.getElementById('costs');
    area.innerHTML='';
    area.style.borderLeft = '1px solid black';
    area = document.getElementById('totalCosts');
    area.innerHTML='';
    area.style.borderLeft = '1px solid black';
  }
}
export function openProject()
{
  renderProjectsArea('empty');
  title.innerHTML = 'Open Project';


  // const openCloseProjectLeftID = document.getElementById('openCloseProjectLeft');
  const openCloseProjectLeftID = document.getElementById('openCloseProjectLeft');


  let dropDownList = null;
  let selectProject = null;

  if(myProjects.length === 0)
  {
    alert("No saved Projects");
    renderProjectsArea();
    return;
  }
  else
  {
    dropDownList = `<div style="white-space:nowrap" class="openCloseProject">
      <p class="projectSelect">Select a project</p>
        <form><select id='selectDropDown' class="projectList" name="projectList">`;

    for(let i=0; i<myProjects.length; i++)
    {
      selectProject = myProjects[i].projectName;
      dropDownList+= `<option value=${i}>${myProjects[i].projectName}</option>`;
    }
    dropDownList+=`</select><button id='selectProjectBtn' class='openProjectBtn'>Open</button>
    <button id='cancelProjectBtn' class='openProjectBtn'>Cancel</button></form></div>`;
  }

  openCloseProjectLeftID.innerHTML = dropDownList;
  //create event listener for 'Open' and 'Cancel' button
  let openBtnID = document.getElementById('selectProjectBtn');
  const sb = document.getElementById('selectDropDown');
  openBtnID.addEventListener('click', openProjectConfirm);
  openBtnID = document.getElementById('cancelProjectBtn');
  openBtnID.addEventListener('click', cancelProjectConfirm);
}

function openProjectConfirm(e)
{
  e.preventDefault();
  const sb = document.getElementById('selectDropDown');
  const projectIndex = sb.selectedIndex;
  myCurrentProjectData.projectIndex = sb.selectedIndex;

  //Copy data from selecte project into myProject from myProjects[projectIndex]
  const returnedTarget = Object.assign(myProject, myProjects[projectIndex]);
  myCurrentProjectData.currentProjectName = myProject.projectName;
  myCurrentProjectData.newProject = false;

  //Populate currentGrid[] with null values for every grid box
  currentGrid.length = 0;  //Reset currentGrid to empty array, then fill with null
  let newIndexCount = myProject.rows * myProject.cols;
  for(let i=0; i<newIndexCount; i++)
  {
    currentGrid[i] = null;
  }

  //Setup grid-template-columns and rows for newly opened project
  const gridID = document.getElementById('container2');
  gridID.style.gridTemplateColumns = `repeat(${myProject.cols}, 1fr)`;
  gridID.style.gridTemplateRows = `auto repeat(${myProject.rows}, 1fr)`;

  //Build the grid
  buildGrid(myProject.rows, myProject.cols);

  for(let i=0; i<myProject.gridCoord.length; i++)
  {
    colorGridDiv(myProject.gridCoord[i].gridID, i);
  }

  //Copy material costs to myMaterialCosts
  //Update myProject with new values or '' if no value specified
  myMaterialCosts.topsoilCost = myProject.materialCosts.topsoilCost === undefined ? '' : myProject.materialCosts.topsoilCost;
  myMaterialCosts.lawnCost = myProject.materialCosts.lawnCost === undefined ? '' : myProject.materialCosts.lawnCost;
  myMaterialCosts.weedBlockCost = myProject.materialCosts.weedBlockCost === undefined ? '' : myProject.materialCosts.weedBlockCost;
  myMaterialCosts.rockCost = myProject.materialCosts.rockCost === undefined ? '' : myProject.materialCosts.rockCost;
  myMaterialCosts.custom1Cost = myProject.materialCosts.custom1Cost === undefined ? '' : myProject.materialCosts.custom1Cost;
  myMaterialCosts.custom2Cost = myProject.materialCosts.custom2Cost === undefined ? '' : myProject.materialCosts.custom2Cost;

  myMaterialCosts.topsoilDelivery = myProject.materialCosts.topsoilDelivery === undefined ? '' : myProject.materialCosts.topsoilDelivery;
  myMaterialCosts.lawnDelivery = myProject.materialCosts.lawnDelivery === undefined ? '' : myProject.materialCosts.lawnDelivery;
  myMaterialCosts.weedBlockDelivery = myProject.materialCosts.weedBlockDelivery === undefined ? '' : myProject.materialCosts.weedBlockDelivery;
  myMaterialCosts.rockDelivery = myProject.materialCosts.rockDelivery === undefined ? '' : myProject.materialCosts.rockDelivery;
  myMaterialCosts.custom1Delivery = myProject.materialCosts.custom1Delivery === undefined ? '' : myProject.materialCosts.custom1Delivery;
  myMaterialCosts.custom2Delivery = myProject.materialCosts.custom2Delivery === undefined ? '' : myProject.materialCosts.custom2Delivery;

  myMaterialCosts.topsoilDepth = myProject.materialCosts.topsoilDepth === undefined ? 1 : myProject.materialCosts.topsoilDepth;
  myMaterialCosts.rockDepth = myProject.materialCosts.rockDepth === undefined ? 1 : myProject.materialCosts.rockDepth;
  myMaterialCosts.custom2Depth = myProject.materialCosts.custom2Depth === undefined ? 1 : myProject.materialCosts.custom2Depth;

  initCalcArray(); //Initialize calcArray with project values
  updateProjectCosts();
  renderOpenCloseProjectArea('empty');
  renderProjectsArea();
  renderMaterialCosts('values');
  renderProjectCosts();
  clearCheckBoxes();
}

function cancelProjectConfirm(e)
{
  e.preventDefault();
  renderOpenCloseProjectArea('empty');
  renderProjectsArea();
  updateProjectCosts();
  renderProjectCosts();
}

export function newProject()
{
  renderProjectsArea('empty');
  title.innerHTML = 'Create New Project';

  const openCloseProjectLeftID = document.getElementById('openCloseProjectLeft');
  const openCloseProjectRightID = document.getElementById('openCloseProjectRight');


    openCloseProjectLeftID.innerHTML =
     `<div style="white-space:nowrap" class="newProject"><form>
      <label for='projectName' class="newProjectText">Project Name: </label><input type='text' class="projectNameInput" id='myProjectName' tabindex=1><br><br>
      <label for='lotLength' class="newProjectText">Tot Length(H) (ft): </label><input type='text' id='lotLength' class="lotDim"tabindex=2><br><br>
      <label for='lotWidth' class="newProjectText">Tot Width(V) (ft): </label><input type='text' id='lotWidth' class="lotDim"tabindex=3><br><br>
      <button id='submitProjectBtn' class='submitProjectBtn'>Create</button>
      <button id='cancelProjectBtn' class='submitProjectBtn'>Cancel</button>
      </form></div>`

    openCloseProjectRightID.innerHTML =
      `<div style="white-space:nowrap" class="newProject"><form><label for="gridUnitLen" class="newProjectText">Each Grid Square(H) (ft): </label><input type='text' id='gridL' class='lotDim' tabindex=4><br><br>
      <label for="gridUnitWidth" class="newProjectText">Each Grid Square(V) (ft): &nbsp</label><input type='text' id='gridW' class='lotDim' tabindex=5>
      </div></form>`;


      let btn = document.getElementById('submitProjectBtn')
      btn.addEventListener('click', submitProject);
      btn = document.getElementById('cancelProjectBtn')
      btn.addEventListener('click', cancelProject);

      //Give input name focus
      document.getElementById('myProjectName').focus();
      clearCheckBoxes();
      renderMaterialCosts('clear');
      renderMaterialCosts('values');
      clearMyProject();
      buildGrid(0, 0);
}

function submitProject()
{
  let validData = true;
  let errorMessage = '';
  const myProjectName = document.getElementById('myProjectName').value;
  const length = document.getElementById('lotLength').value;
  const width = document.getElementById('lotWidth').value;
  const gridL = document.getElementById('gridL').value;
  const gridW = document.getElementById('gridW').value;

  for(let i=0; i<myProjects.length; i++)
  {
      if(myProjectName === myProjects[i].projectName)
      {
        alert('Project name ' + myProjectName + ' already exists.  Please select another name.');
        return;
      }
  }

  if(myProjectName==='' || myProjectName===null)
  {
    validData = false;
    errorMessage = 'Invalid or missing project name.';
  }
  else if(parseInt(length)<=0 || parseInt(length)>500 || parseInt(width)<=0 || parseInt(width)>500)
  {
    validData = false;
    errorMessage = 'The lot length or width dimensions are out of range.  Must be between 1-500 feet.';
  }
  else if(parseInt(gridL)<=0 || parseInt(gridL)>=parseInt(length) || parseInt(gridW)<=0 || parseInt(gridW)>=parseInt(width))
  {
    validData = false;
    errorMessage = 'One or both box dimensions are invalid.  Must be between 1 and length or width';
  }

  if(!validData)
  {
    alert(errorMessage)
    return;
  }

  const gridID = document.getElementById('container2');

  let myCols=0, myRows=0;
  if(length%gridL===0)
  {
    myCols = parseInt(length/gridL);
  }
  else
  {
    myCols = parseInt(length/gridL)+1;
  }
  if(width%gridW===0)
  {
    myRows = parseInt(width/gridW);
  }
  else
  {
    myRows = parseInt(width/gridW)+1;
  }

  //Setup grid-template-columns and rows
  gridID.style.gridTemplateColumns = `repeat(${myCols}, 1fr)`;
  gridID.style.gridTemplateRows = `auto repeat(${myRows}, 1fr)`;

  //Write values to myProject
  myProject.projectName = myProjectName;
  myProject.length = length;
  myProject.width = width;
  myProject.gridL = gridL;
  myProject.gridW = gridW;
  myProject.rows = myRows;
  myProject.cols = myCols;
  myProject.gridCoord = [];
  myProject.materialCosts = {};

  //Initialize myProject.materialCosts with zeroes
  myProject.materialCosts.topsoilCost = 0;
  myProject.materialCosts.lawnCost = 0;
  myProject.materialCosts.weedBlockCost = 0;
  myProject.materialCosts.rockCost = 0;
  myProject.materialCosts.custom1Cost = 0;
  myProject.materialCosts.custom2Cost = 0;

  myProject.materialCosts.topsoilDelivery = 0;
  myProject.materialCosts.lawnDelivery = 0;
  myProject.materialCosts.weedBlockDelivery = 0;
  myProject.materialCosts.rockDelivery = 0;
  myProject.materialCosts.custom1Delivery = 0;
  myProject.materialCosts.custom2Delivery = 0;

  myProject.materialCosts.topsoilDepth = 1;
  myProject.materialCosts.rockDepth = 1;
  myProject.materialCosts.custom2Depth = 1;

  myCurrentProjectData.currentProjectName = myProject.projectName;
  myCurrentProjectData.newProject = true;

  //Populate currentGrid[] with null values for every grid box
  const indexCount=myRows*myCols;
  for(let i=0; i<indexCount; i++)
  {
    currentGrid[i] = null;
  }

  initCalcArray(); //Initialize calcArray with project values
  buildGrid(myRows, myCols);
  renderOpenCloseProjectArea('empty');
  renderProjectsArea();
  updateProjectCosts();
  renderProjectCosts();
}

function cancelProject()
{
  renderOpenCloseProjectArea('empty');
  renderProjectsArea();
  updateProjectCosts();
  renderProjectCosts();
}

export function renderOpenCloseProjectArea(empty=null)
{
  if(empty==='empty')
  {
    document.getElementById('openCloseProjectLeft').innerHTML='';
    document.getElementById('openCloseProjectRight').innerHTML='';
  }
}

export function saveProject()
{
  if(myProject.projectName===undefined)
  {
    alert('No active project to save');
    return;
  }

  // renderProjectsArea('empty');
  title.innerHTML = 'Save Project';

  let myProjectsIndex = myProjects.length;
  //Save current project to existing project
  if(myProject.projectName === myCurrentProjectData.currentProjectName && myCurrentProjectData.newProject===false)
  {
    Object.assign(myProjects[myCurrentProjectData.projectIndex], myProject);
  }
  else //Save new project
  {
    myProjects[myProjects.length] = new Project;
    Object.assign(myProjects[myProjectsIndex], myProject);
    myCurrentProjectData.newProject = false; //Set to false now that new project has been saved.
    myCurrentProjectData.projectIndex = myProjects.length-1;
  }

  // myProjects[myProjects.length] = myProject;
  //Write out saved project to localStorage
  writeLocalStorage("projects", myProjects);

  alert(`${myProject.projectName} has been saved`);
  // renderProjectsArea();
}

export function delProject()
{
  renderProjectsArea('empty');

  title.innerHTML = 'Delete Project';
  const openCloseProjectLeftID = document.getElementById('openCloseProjectLeft');
  let dropDownList = null;
  let selectProject = null;

  if(myProjects.length === 0)
  {
    alert("No projects to delete");
    renderProjectsArea();
    return;
  }
  else
  {
    dropDownList = `<div style="white-space:nowrap" class="openCloseProject">
      <p class="projectSelect">Select a project</p>
        <form><select id='selectDropDown' class="projectList" name="projectList">`;

    for(let i=0; i<myProjects.length; i++)
    {
      selectProject = myProjects[i].projectName;
      dropDownList+= `<option value=${i}>${myProjects[i].projectName}</option>`;
    }
    dropDownList+=`</select><button id='selectProjectBtn' class='openProjectBtn'>Delete</button>
    <button id='cancelProjectBtn' class='openProjectBtn'>Cancel</button></form></div>`;
  }

  openCloseProjectLeftID.innerHTML = dropDownList;
  //create event listener for 'Open' and 'Cancel' button
  let openBtnID = document.getElementById('selectProjectBtn');
  const sb = document.getElementById('selectDropDown');
  openBtnID.addEventListener('click', delProjectConfirm);
  openBtnID = document.getElementById('cancelProjectBtn');
  openBtnID.addEventListener('click', cancelProjectConfirm);
}

function delProjectConfirm(e)
{
  e.preventDefault();
  const sb = document.getElementById('selectDropDown');
  const projectIndex = sb.selectedIndex;
  const deletedProjectName = myProjects[projectIndex].projectName;

  delete(myProjects[projectIndex]);

  //Convert sparse to dense
  for(let i=projectIndex; i<myProjects.length; i++)
  {
    myProjects[i] = myProjects[i+1];
  }
  myProjects.length--;

  //Write out saved project to localStorage
  writeLocalStorage("projects", myProjects);
  renderOpenCloseProjectArea('empty');
  renderProjectsArea();
  if(projectIndex === myCurrentProjectData.projectIndex)
  {
    clearMyCurrentProjectData();
    clearCheckBoxes();
    renderMaterialCosts('clear');
    renderMaterialCosts('values');
    clearMyProject();
    buildGrid(0, 0);
  }

  //Decrement projectIndex by 1 because of sparse to dense conversion (removing 1 project)
  myCurrentProjectData.projectIndex--;
  alert(deletedProjectName + ' has been deleted');
}

function clearMyCurrentProjectData()
{
  myCurrentProjectData.currentProjectName = '';
  myCurrentProjectData.newProject=null;
  myCurrentProjectData.projectIndex=null;
}
