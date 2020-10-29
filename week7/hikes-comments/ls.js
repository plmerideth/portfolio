export function readLocalStorage(key)
{
  return localStorage.getItem(key);
}

export function writeLocalStorage(key, value)
{
    localStorage.setItem(key, JSON.stringify(value));
}
