import SortView from '../view/sort.js';
import EventEditView from '../view/event-edit.js';
import DayListView from '../view/day-list.js';
import DayView from '../view/day.js';
import EventView from '../view/event.js';
import NoPointView from '../view/no-point.js';
import {RenderPosition, render} from '../utils/render.js';
import {sortByDate} from '../utils/event.js';

export default class Trip {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;

    this._sortComponent = new SortView();
    this._dayListComponent = new DayListView();
    this._eventComponent = new EventView();
    this._noPointComponent = new NoPointView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._renderTrip();
  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderNoPoint() {
    render(this._tripEventsContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderDayList() {
    render(this._tripEventsContainer, this._dayListComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(container, event) {
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

    eventComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(container, eventComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderDay() {
    const dates = () => {
      return this._tripEvents.map((tripEvent) => new Date(tripEvent.beginDate).toDateString());
    };

    const uniqueDates = [...new Set(dates())];

    uniqueDates.sort(sortByDate).forEach((date, dateCount) => {
      render(this._dayListComponent, new DayView(dateCount + 1, date), RenderPosition.BEFOREEND);
      const tripEventsLists = this._dayListComponent.getElement().querySelectorAll(`.trip-events__list`);

      this._tripEvents
      .filter((tripEvent) => new Date(tripEvent.beginDate).toDateString() === date)
      .forEach((tripEvent) => {
        this._renderEvent(tripEventsLists[dateCount], tripEvent);
      });
    });
  }

  _renderTrip() {
    if (this._tripEvents.length === 0) {
      this._renderNoPoint();
      return;
    }
    this._renderSort();
    this._renderDayList();
    this._renderDay();
  }
}
