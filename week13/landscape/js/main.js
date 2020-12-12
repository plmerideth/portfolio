import {buildGrid, hideGrid, topsoilSelect, lawnSelect, weedBlockSelect, rockSelect, custom1Select, custom2Select, clearCheckBoxes} from './grid.js';
import {Project, GridCoord, renderProjectsArea, openProject, newProject, saveProject, delProject} from './projects.js';
import {renderMaterialsArea, renderMaterialCosts} from './materials.js';
import {readLocalStorage, writeLocalStorage} from './utilities.js';
import {initCalcArray} from './calc.js';


//Declare and export global myProject which holds current data for current project
export const myProject = new Project;
//initialize all myProject.materialCosts to zero
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
myProject.gridL = 0;
myProject.gridW = 0;

export let myCurrentProjectData =
{
  currentProjectName: '',
  newProject: null,
  projectIndex: null
};
export let currentGrid = [];
export let myProjects = [];
export let calcArray = new Array(6);
export let myMaterialCosts =
  {
    topsoilCost: 0,
    lawnCost: 0,
    weedBlockCost: 0,
    rockCost: 0,
    custom1Cost: 0,
    custom2Cost: 0,
    topsoilDelivery: 0,
    lawnDelivery: 0,
    weedBlockDelivery: 0,
    rockDelivery: 0,
    custom1Delivery: 0,
    custom2Delivery: 0,
    topsoilDepth: 1,  /*Default depths for all cu yd materials */
    rockDepth: 1,
    custom2Depth: 1
  };
export let selectedMaterials =
{
  topsoilColor: '',
  lawnColor: '',
  weedBlockColor: '',
  rockColor: '',
  custom1Color: '',
  custom2Color: ''
};


//Read in any existing projects
myProjects = JSON.parse(readLocalStorage('projects'));
if(myProjects === null)
{
  myProjects = [];
}

//Set event listeners for material checkboxes
const topsoilCBID = document.getElementById('topsoilCB');
topsoilCBID.addEventListener('click', topsoilSelect);
const lawnCBID = document.getElementById('lawnCB');
lawnCBID.addEventListener('click', lawnSelect);
const weedBlockCBID = document.getElementById('weedBlockCB');
weedBlockCBID.addEventListener('click', weedBlockSelect);
const rockCBID = document.getElementById('rockCB');
rockCBID.addEventListener('click', rockSelect);
const custom1CBID = document.getElementById('custom1CB');
custom1CBID.addEventListener('click', custom1Select);
const custom2CBID = document.getElementById('custom2CB');
custom2CBID.addEventListener('click', custom2Select);

//Set event listener for hidegrid checkbox
const checkboxID = document.getElementById('checkboxID');
checkboxID.addEventListener('click', hideGrid);

//Add section and project button event listeners
let btn = document.getElementById('openProjectBtn');
btn.addEventListener('click', openProject);
btn = document.getElementById('newProjectBtn');
btn.addEventListener('click', newProject);
btn = document.getElementById('saveProjectBtn');
btn.addEventListener('click', saveProject);
btn = document.getElementById('delProjectBtn');
btn.addEventListener('click', delProject);

/* End testing myProjects */
initCalcArray();
buildGrid(0, 0);
renderMaterialsArea();
renderProjectsArea();
clearCheckBoxes();
