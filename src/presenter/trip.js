import SortView from '../view/sort.js';
import DayListView from '../view/day-list.js';
import DayView from '../view/day.js';
import NoPointView from '../view/no-point.js';
import EventPresenter from './event.js';
import {RenderPosition, render} from '../utils/render.js';
import {sortEventsByDate, sortEventsByPrice, sortEventsByTime} from '../utils/event.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';

export default class Trip {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._currentSortType = SortType.EVENT;
    this._eventPresenter = {};

    this._sortComponent = new SortView();
    this._dayListComponent = new DayListView();
    this._noPointComponent = new NoPointView();

    this._handlerSortTypeChange = this._handlerSortTypeChange.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripEvents, typesOffers) {
    this._tripEvents = tripEvents.slice();
    this._sourcedTripEvents = tripEvents.slice();
    this._typesOffers = typesOffers;
    this._renderTrip();
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripEvents.sort(sortEventsByTime);
        break;
      case SortType.PRICE:
        this._tripEvents.sort(sortEventsByPrice);
        break;
      case SortType.EVENT:
        this._tripEvents = this._sourcedTripEvents.slice();
    }
    this._currentSortType = sortType;
  }

  _renderSortedEvents() {
    render(this._dayListComponent, new DayView(``, ``), RenderPosition.BEFOREEND);
    const tripEventsLists = this._dayListComponent.getElement().querySelector(`.trip-events__list`);
    this._tripEvents.forEach((tripEvent) => {
      this._renderEvent(tripEventsLists, tripEvent, this._typesOffers);
    });
  }

  _clearDayList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
    this._dayListComponent.getElement().innerHTML = ``;
  }

  _handlerSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortEvents(sortType);
    this._clearDayList();
    if (this._currentSortType === `event`) {
      this._sortComponent.getElement().querySelector(`.trip-sort__item--day`).innerHTML = `Day`;
      this._renderDay();
    } else {
      this._sortComponent.getElement().querySelector(`.trip-sort__item--day`).innerHTML = ``;
      this._renderSortedEvents();
    }
  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handlerSortTypeChange);
  }

  _renderNoPoint() {
    render(this._tripEventsContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderDayList() {
    render(this._tripEventsContainer, this._dayListComponent, RenderPosition.BEFOREEND);
  }

  _handleEventChange(updatedEvent) {
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    this._sourcedTripEvents = updateItem(this._sourcedTripEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent, this._typesOffers);
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderEvent(container, event, typesOffers) {
    const eventPresenter = new EventPresenter(container, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event, typesOffers);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderDay() {
    const dates = () => {
      return this._tripEvents.map((tripEvent) => new Date(tripEvent.beginDate).toDateString());
    };

    const uniqueDates = [...new Set(dates())];

    uniqueDates.sort(sortEventsByDate).forEach((date, dateCount) => {
      render(this._dayListComponent, new DayView(dateCount + 1, date), RenderPosition.BEFOREEND);
      const tripEventsLists = this._dayListComponent.getElement().querySelectorAll(`.trip-events__list`);

      this._tripEvents
      .filter((tripEvent) => new Date(tripEvent.beginDate).toDateString() === date)
      .forEach((tripEvent) => {
        this._renderEvent(tripEventsLists[dateCount], tripEvent, this._typesOffers);
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
