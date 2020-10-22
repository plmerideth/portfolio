
export function storeToDo(data)
{
    localStorage.data = JSON.stringify(data);
}

export function readToDo()
{
  const copyData = localStorage.getItem('data');
  if(copyData === null) //If localStorge of 'data' has never been initialized, create empty array called 'data'
  {
    const data = [];
    storeToDo(data);
    copyData = localStorage.getItem('data');
  }
  return copyData;
}
