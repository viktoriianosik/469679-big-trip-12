import {createTripInfoTemplate} from './view/trip-info.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortElement} from './view/sort.js';
import {createEventWithoutDestinationTemplate} from './view/event-without-destination.js';
import {createDaysListTemplate} from './view/days-list.js';
import {createDayTemplate} from './view/day.js';
import {createEventTemplate} from './view/event.js';
import {generateEvent} from './mock/event.js';

const EVENT_COUNT = 15;

export const events = new Array(EVENT_COUNT).fill().map(generateEvent);

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
renderTemplate(tripEventsElement, `beforeend`, createEventWithoutDestinationTemplate(events[0]));
renderTemplate(tripEventsElement, `beforeend`, createDaysListTemplate());

const daysListElement = tripEventsElement.querySelector(`.trip-days`);

const createDaysTemplate = (evts) => {
  const dates = () => {
    return evts.map((event) => new Date(event.beginDate).toDateString());
  };

  const uniqueDates = [...new Set(dates())];

  uniqueDates.sort().forEach((date, dateCount) => {
    renderTemplate(daysListElement, `beforeend`, createDayTemplate(dateCount + 1, date));
    const tripEventsLists = daysListElement.querySelectorAll(`.trip-events__list`);

    evts
    .filter((event) => new Date(event.beginDate).toDateString() === date)
    .forEach((event) => {
      renderTemplate(tripEventsLists[dateCount], `beforeend`, createEventTemplate(event));
    });
  });
};

createDaysTemplate(events);

