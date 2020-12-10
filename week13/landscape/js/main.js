import {buildGrid, hideGrid, topsoilSelect, lawnSelect, weedBlockSelect, rockSelect, custom1Select, custom2Select, clearCheckBoxes} from './grid.js';
import {Project, GridCoord, renderProjectsArea, openProject, newProject, saveProject, delProject} from './projects.js';
import {renderMaterialsArea, renderMaterialCosts} from './materials.js';
import {readLocalStorage, writeLocalStorage} from './utilities.js';
//Declare and export global myProject which holds current data for current project
export const myProject = new Project;
export let myCurrentProjectData =
{
  currentProjectName: '',
  newProject: null,
  projectIndex: null
};
export let currentGrid = [];
export let myProjects = [];
export let myMaterialCosts =
  {
    topsoilCost: '',
    lawnCost: '',
    weedBlockCost: '',
    rockCost: '',
    custom1Cost: '',
    custom2Cost: '',
    topsoilDelivery: '',
    lawnDelivery: '',
    weedBlockDelivery: '',
    rockDelivery: '',
    custom1Delivery: '',
    custom2Delivery: ''
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
buildGrid(0, 0);
renderMaterialsArea();
renderProjectsArea();
clearCheckBoxes();
renderMaterialCosts('values');
