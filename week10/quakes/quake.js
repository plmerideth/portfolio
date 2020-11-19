import { getJSON } from './utilities.js';
// Quake Model

export default class Quake
{
  constructor()
  {
    this.baseUrl =
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
    // store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
    this._quakes = [];
  }

  async getEarthQuakesByRadius(position, dateRange, radius=100)
  {
    let QuakesUrl = this.baseUrl + `&starttime=${dateRange.start}&endtime=${dateRange.end}&latitude=${
      position.lat}&longitude=${position.lon}&maxradiuskm=${radius}`;

    // let quakesUrl = this.baseUrl + `&starttime=2019-01-01&endtime=2019-03-02&latitude=${
    //   position.lat}&longitude=${position.lon}&maxradiuskm=${radius}`;

    this._quakes = await getJSON(QuakesUrl);

    // this._quakes = await getJSON(
    //   this.baseUrl +
    //     `&starttime=2019-01-01&endtime=2019-03-02&latitude=${
    //       position.lat
    //     }&longitude=${position.lon}&maxradiuskm=${radius}`
    // );
    document.getElementById('quakeUrl').innerHTML = `<p class="quakeUrlP">Quake API URL = ${QuakesUrl}</p><p class="quakeCount">Quake Count = ${this._quakes.metadata.count}</p>`;

    return this._quakes;
  }

  getQuakeById(id)
  {
    return this._quakes.features.filter(item => item.id === id)[0];
  }
}
