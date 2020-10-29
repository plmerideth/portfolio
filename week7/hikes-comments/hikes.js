// JavaScript Document
import {readLocalStorage, writeLocalStorage} from './ls.js';
import Comments from './comments.js';

// Example of using Classes and modules to organize the code needed to render our list of hikes. Not using MVC here.

//create an array of hikes
const hikeList = [
  {
    name: "Bechler Falls",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    difficulty: "Easy",
    description:
      "Beautiful short hike along the Bechler river to Bechler Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
  },
  {
    name: "Teton Canyon",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    difficulty: "Easy",
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions:
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Stateline Road for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
  },
  {
    name: "Denanda Falls",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "7 miles",
    difficulty: "Moderate",
    description:
      "Beautiful hike through Bechler meadows river to Denanda Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
  }
];

const imgBasePath = "./";
//on load grab the array and insert it into the page on load

export default class Hikes
{
	constructor(elementId)
	{
		this.hikesElementID = document.getElementById(elementId);
		// we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
		this.backButton = this.buildBackButton();
    this.comments = new Comments("hikeComments", "comments")
	}

	// why is this function necessary?  hikeList is not exported, and so it cannot be seen outside of this module. I added this in case I ever need the list of hikes outside of the module. This also sets me up nicely if my data were to move. I can just change this method to the new source and everything will still work if I only access the data through this getter.
	getAllHikes()
	{
    let myHikeList = JSON.parse(readLocalStorage("hikeList"));
    return myHikeList;
  }

	// For the first stretch we will need to get just one hike.
  	getHikeByName(hikeName)
	{
    	return this.getAllHikes().find(hike => hike.name === hikeName);
  	}

  	//show a list of hikes in the hikesElementID
	showHikeList()
	{
    //writeLocalStorage("hikeList", hikeList);
    //let myHikeList = JSON.parse(readLocalStorage("hikeList"));

		this.hikesElementID.innerHTML = '';
		// Have not added functionality to add hikes.  Have to force localStorage to have initial hikes.  It may get deleted, so this checks for empty localStorage and restores it, if empty
    const checkHikeList = this.getAllHikes();
    if(checkHikeList===null)
    {
      writeLocalStorage("hikeList", hikeList);
    }

		renderHikeList(this.hikesElementID, this.getAllHikes());
		this.addHikeListener();
		// make sure the back button is hidden
		this.backButton.classList.add('hidden');
    this.comments.showCommentList();
	}

  showOneHike(hikeName) {
    const hike = this.getHikeByName(hikeName);
    this.hikesElementID.innerHTML = '';
    this.hikesElementID.appendChild(renderOneHikeFull(hike));
    // show the back button
    this.backButton.classList.remove('hidden');
    this.comments.showCommentList(hikeName);
  }


  	// in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
	addHikeListener()
	{
    	// We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.
		const childrenArray = Array.from(this.hikesElementID.children);
		childrenArray.forEach(child =>
		{
			child.addEventListener('click', e =>
			{
				// why currentTarget instead of target?
				this.showOneHike(e.currentTarget.dataset.name);
			});
		});
	}

	buildBackButton()
	{
		const backButton = document.createElement('button');
		backButton.innerHTML = '&lt;- All Hikes';
		backButton.addEventListener('click', () =>
		{
		  this.showHikeList();
		});
		backButton.classList.add('hidden');
		this.hikesElementID.before(backButton);
		return backButton;
	}
} // End of hike Class
//*****************************************************************

// methods responsible for building HTML.  Why aren't these in the class?  They don't really need to be, and by moving them outside of the exported class, they cannot be called outside the module...they become private.
function renderHikeList(parent, hikes)
{
	hikes.forEach(hike =>
	{
    	parent.appendChild(renderOneHikeLight(hike));
  	});
}


function renderOneHikeLight(hike)
{
	const item = document.createElement("li");
	item.setAttribute('data-name', hike.name);
  item.classList.add('hikeItem');
	item.innerHTML = ` <h2 class="hikeTitle"><a id=${hike.name} href="#">${hike.name} - (Click for details and comments)</a></h2>
	<div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
	<div class="description">
          <div class="hikeDistance">
              <h3>Distance</h3>
              <p>${hike.distance}</p>
          </div>
          <div class="hikeDifficulty">
              <h3>Difficulty</h3>
              <p>${hike.difficulty}</p>
          </div>
  </div>`;
  return item;
}

function renderOneHikeFull(hike)
{
	const item = document.createElement("li");

  item.innerHTML = `

        <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
		<div class="fullDescription">
			<h2 class="fullHikeTitle">${hike.name}</h2>
			<div class="fullHikeDistance">
				<h3>Distance</h3>
				<p>${hike.distance}</p>
			</div>
			<div class="fullHikeDifficulty">
				<h3>Difficulty</h3>
				<p>${hike.difficulty}</p>
			</div>
			<div class="fullHikeDescription">
				<h3>Description</h3>
				<p>${hike.description}</p>
			</div>
			<div class="fullHikeDirections">
				<h3>How to get there</h3>
				<p>${hike.directions}</p>
			</div>
		</div>
    `;
  return item;
	}