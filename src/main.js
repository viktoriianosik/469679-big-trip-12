import {createTripInfoTemplate} from './view/trip-info.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortElement} from './view/sort.js';
import {createEventWithoutDestinationTemplate} from './view/event-without-destination.js';
import {createDaysListTemplate} from './view/days-list.js';
import {createDayTemplate} from './view/day.js';
import {createEventTemplate} from './view/event.js';

const EVENT_COUNT = 3;

const tripMainElement = document.querySelector(`.trip-main`);

const renderTemplate = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};

renderTemplate(tripMainElement, `afterbegin`, createTripInfoTemplate());

const tripControlsContainer = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripControlsTitles = tripControlsContainer.querySelectorAll(`h2`);

renderTemplate(tripControlsTitles[0], `afterend`, createMenuTemplate());
renderTemplate(tripControlsTitles[1], `afterend`, createFilterTemplate());

const mainElement = document.querySelector(`.page-main`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

renderTemplate(tripEventsElement, `beforeend`, createSortElement());
renderTemplate(tripEventsElement, `beforeend`, createEventWithoutDestinationTemplate());
renderTemplate(tripEventsElement, `beforeend`, createDaysListTemplate());

const daysListElement = tripEventsElement.querySelector(`.trip-days`);

renderTemplate(daysListElement, `beforeend`, createDayTemplate());

const eventsListElement = daysListElement.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  renderTemplate(eventsListElement, `beforeend`, createEventTemplate());
}
