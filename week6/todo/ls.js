
export function storeToDo(data)
{
    localStorage.myToDoListLS = JSON.stringify(data);
}

export function readToDo()
{
  const copyData = localStorage.getItem('myToDoListLS');
  if(copyData === null) //If localStorge of 'data' has never been initialized, create empty array called 'data'
  {
    const myToDoListLS = [];
    storeToDo(myToDoListLS);
    copyData = localStorage.getItem('myToDoListLS');
  }
  return copyData;
}
