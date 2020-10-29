// JavaScript Document



import Hikes from './hikes.js';

const teamHikes = new Hikes("hikes");
export default teamHikes;

window.addEventListener('load', () => {
  teamHikes.showHikeList();
});
