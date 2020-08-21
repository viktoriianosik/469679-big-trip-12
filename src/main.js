import TripInfoView from './view/trip-info.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import TripPresenter from './presenter/trip.js';
import {RenderPosition, render} from './utils/render.js';
import {generateEvent} from './mock/event.js';

const EVENT_COUNT = 15;

export const events = new Array(EVENT_COUNT).fill().map(generateEvent);


const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsContainer = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripControlsTitles = tripControlsContainer.querySelectorAll(`h2`);
const tripEventsElement = document.querySelector(`.trip-events`);
const tripPresenter = new TripPresenter(tripEventsElement);

render(tripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
render(tripControlsTitles[0], new MenuView(), RenderPosition.AFTEREND);
render(tripControlsTitles[1], new FilterView(), RenderPosition.AFTEREND);

tripPresenter.init(events);
