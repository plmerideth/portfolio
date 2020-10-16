// JavaScript Document



import Hikes from './hikes.js';

const teamHikes = new Hikes("hikes");

window.addEventListener('load', () => {
  teamHikes.showHikeList();
});
