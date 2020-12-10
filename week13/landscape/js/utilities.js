import {myProject} from './main.js';

export function readLocalStorage(key)
{
  return localStorage.getItem(key);
}

export function writeLocalStorage(key, value)
{
    localStorage.setItem(key, JSON.stringify(value));
}

export function createButton(text, className, newId)
{
  const btn = document.createElement('BUTTON');
  btn.innerHTML = text;
  btn.className = className;
  btn.id = newId;
  return btn;
}

export function removeMoney(myString)
{
  if(myString.includes('$'))
  {
    let retString='';
    retString = myString.replace('$', '');
    return retString;
  }
  return myString;
}

export function calcGridIndex(gridCoord)
{
  let row=0, col=0, gridIndex=0;
  gridIndex = gridCoord.indexOf('-');
  row = parseInt(gridCoord.substring(0, gridIndex));
  col = parseInt(gridCoord.substring(gridIndex+1));
  gridIndex = ((row-1)*myProject.cols)+col;
  return gridIndex;
}
