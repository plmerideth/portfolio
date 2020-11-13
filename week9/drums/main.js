//Add eventListener to every key to watch for end of transition, so playing class can be removed.
const keys = document.querySelectorAll('.key');  //This returns an array of all keys with class of 'key'
//iterate thru array to add event listener.
keys.forEach(key =>
{
  key.addEventListener('transitionend', removeClass);
  key.moveCount=1;
})

//Add eventlistener for 'keydown' event and play drum sound
window.addEventListener('keydown', playSound);

//This event is a 'keydown' event and the data-key attribute is in e.keycode
function playSound(e)
{
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if(audio===null)
  { return; } //If a non-valid key is pressed, just return.

  //Otherwise, play audio.  cloneNode() method
  // audio.cloneNode().play();
  audio.currentTime = 0;
  audio.play();

  //when a key is pressed, add the 'playing class' to do a transform and change border
  key.classList.add('playing');
  //Move key down 10px, after 10 moves, reset to orig position.
  moveKey(key);
}

function moveKey(key)
{
  let movePx = "";
  if(key.moveCount<10)
  {
    movePx = key.moveCount*10 + 'px';
    key.style.transform = `translateY(${movePx})`;
    key.moveCount++;
  }
  else
  {
    key.moveCount=0;
    movePx = '0px';
    key.style.transform = `translateY(${movePx})`;
    key.moveCount++;
  }
}

//THis event is a transitionend event.
function removeClass(e)
{
  //Only look for transition end event, ignore all others
  // console.log(e);
  if(e.propertyName!=='transform')
  {
    return;
  }
  this.classList.remove('playing');
}
