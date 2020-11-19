import { getLocation } from './utilities.js';
import Quake from './Quake.js';
import QuakesView from './QuakesView.js';

// Quake controller
export default class QuakesController {
  constructor(parent, position = null) {
    this.parent = parent;
    // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
    this.parentElement = null;
    // let's give ourselves the option of using a location other than the current location by passing it in.
    this.radius = null;
    this.position = position || {
      lat: 0,
      lon: 0
    };
    this.dateRange = {
      start: null,
      end: null
    };

    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.quakes = new Quake();
    this.quakesView = new QuakesView();
  }
  async init(radius, startDate, endDate) {
    // use this as a place to grab the element identified by this.parent, do the initial call of this.intiPos(), and display some quakes by calling this.getQuakesByRadius()
    this.parentElement = document.querySelector(this.parent);
    this.dateRange.start = startDate;
    this.dateRange.end = endDate;
    this.radius = radius;
    await this.initPos();
    this.getQuakesByRadius(radius);
  }
  async initPos() {
    // if a position has not been set
    if (this.position.lat === 0) {
      try {
        // try to get the position using getLocation()
        const posFull = await getLocation();

        // if we get the location back then set the latitude and longitude into this.position
        this.position.lat = posFull.coords.latitude;
        this.position.lon = posFull.coords.longitude;
        //console.log(posFull);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getQuakesByRadius(radius = 100)
  {
    //set a loading message in case it takes long to get the quakes
    this.parentElement.innerHTML = '<li>Loading...</li>';
    // get the list of quakes in the specified radius of the location
    const quakeList = await this.quakes.getEarthQuakesByRadius(
      this.position, this.dateRange, radius
    );

    // // render the list to html
    this.quakesView.renderQuakeList(quakeList, this.parentElement);
      // add a listener to the new list of quakes to allow drill down in to the details. The listener should call this.getQuakeDetails on the targeted element
      this.parentElement.addEventListener('click', e => {
        this.getQuakeDetails(e.target.dataset.id);
    });
  }
  async getQuakeDetails(quakeId) {
    // get the details for the quakeId provided, then send them to the view to be displayed
    const quake = this.quakes.getQuakeById(quakeId);
    this.quakesView.renderQuake(quake, this.parentElement);

    //New code
    const returnButtonID = document.getElementById('quakeReturn');
    returnButtonID.addEventListener('click', e =>{
      this.refreshQuakes();
    });
  }

  refreshQuakes()
  {
    this.quakesView.renderQuakeList(this.quakes._quakes, this.parentElement);
  }
}
