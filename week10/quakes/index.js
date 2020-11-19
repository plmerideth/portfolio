import QuakesController from './quakescontroller.js';

const myQuakesController = new QuakesController('#quakeList');

const submitButton = document.getElementById('dataSubmit');
submitButton.addEventListener('click', getParameters);
const resetButton = document.getElementById('resetBtn');
resetButton.addEventListener('click', resetApp);

function resetApp()
{
  document.getElementById('radiusInput').value = '';
  document.getElementById('startDate').value = '';
  document.getElementById('endDate').value = '';
  document.getElementById('quakeUrl').innerHTML = '';
  document.getElementById('quakeList').innerHTML = '';

  const location = './quakes.html';
  location.reload();
  return false;
}

function getParameters(e)
{
  const radius = document.getElementById('radiusInput').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  if(validData(radius, startDate, endDate))
  {
    console.log(e);
    let radiusInt = parseInt(radius);
    myQuakesController.init(radiusInt, startDate, endDate);
  }
}

function validData(radius, startDate, endDate)
{
  if(radius===""||startDate===""||endDate==="")
  {
    alert('Please complete all fields before submitting!');
    return false;
  }

  if(radius <=0 || radius > 3000)
  {
    alert('Please enter a radius between 1 and 3000 km');
    return false;
  }
  //Just in case a date object is needed for validation
  let validStartDate = [];
  validStartDate[0] = parseInt(startDate.substring(0,4));
  validStartDate[1] = parseInt(startDate.substring(5,7));
  validStartDate[2] = parseInt(startDate.substring(8,10));
  let dateTest = new Date(validStartDate[0], validStartDate[1], validStartDate[2]);

  if( startDate.length<10 ||
      startDate.length>10 ||
      startDate.includes("/") ||
      startDate.includes("\\") ||
      startDate.substring(4,5)!="-" ||
      startDate.substring(7,8)!="-")
  {
    alert('Please enter a valid start date');
    return false;
  }
  if( endDate.length<10 ||
      endDate.length>10 ||
      endDate.includes("/") ||
      endDate.includes("\\") ||
      endDate.substring(4,5)!="-" ||
      endDate.substring(7,8)!="-")
  {
    alert('Please enter a valid end date');
    return false;
  }

  return true;
}
