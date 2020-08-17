import TripInfoView from './view/trip-info.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import EventEditView from './view/event-edit.js';
import DayListView from './view/day-list.js';
import DayView from './view/day.js';
import EventView from './view/event.js';
import NoPointView from './view/no-point.js';
import {generateEvent} from './mock/event.js';
import {RenderPosition, render} from './utils.js';

const EVENT_COUNT = 18;

export const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const renderEvent = (container, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replacePointToForm = () => {
    container.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToPoint = () => {
    container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsContainer = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripControlsTitles = tripControlsContainer.querySelectorAll(`h2`);

render(tripMainElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsTitles[0], new MenuView().getElement(), RenderPosition.AFTEREND);
render(tripControlsTitles[1], new FilterView().getElement(), RenderPosition.AFTEREND);

const renderList = (evts) => {
  const mainElement = document.querySelector(`.page-main`);
  const tripEventsElement = mainElement.querySelector(`.trip-events`);

  if (evts.length === 0) {
    render(tripEventsElement, new NoPointView().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);

  const dayListComponent = new DayListView();
  render(tripEventsElement, dayListComponent.getElement(), RenderPosition.BEFOREEND);

  const daysListElement = tripEventsElement.querySelector(`.trip-days`);

  const dates = () => {
    return evts.map((event) => new Date(event.beginDate).toDateString());
  };

  const uniqueDates = [...new Set(dates())];

  uniqueDates.sort().forEach((date, dateCount) => {
    render(dayListComponent.getElement(), new DayView(dateCount + 1, date).getElement(), RenderPosition.BEFOREEND);
    const tripEventsLists = daysListElement.querySelectorAll(`.trip-events__list`);

    evts
    .filter((event) => new Date(event.beginDate).toDateString() === date)
    .forEach((event) => {
      renderEvent(tripEventsLists[dateCount], event);
    });
  });
};

renderList(events);


