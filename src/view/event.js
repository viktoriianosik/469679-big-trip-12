import {EVENT_TYPES_ACTION} from '../const.js';
import {getEventTypeAction} from '../utils/event.js';
import AbstaractView from './adstract.js';
import moment from 'moment';

const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const MILLISECONDS_PER_MINUTE = 60000;
const MILLISECONDS_PER_HOUR = MINUTES_PER_HOUR * MILLISECONDS_PER_MINUTE;
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * HOURS_PER_DAY;

const creatEventOffer = (offers) => {
  return offers.map((obj) => `<li class="event__offer">
    <span class="event__offer-title">${obj.name}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${obj.price}</span>
    </li>`).join(``);
};

const convertTimeFormat = (time) => {
  return time.toString().padStart(2, `0`);
};

const calculateEventDuration = (start, end) => {
  const duration = end - start;
  let diff = duration;

  const dayAmount = Math.floor(diff / MILLISECONDS_PER_DAY);
  diff %= MILLISECONDS_PER_DAY;

  const hourAmount = Math.floor(diff / MILLISECONDS_PER_HOUR);
  diff %= MILLISECONDS_PER_HOUR;

  const minuteAmount = Math.floor(diff / MILLISECONDS_PER_MINUTE);

  if (duration >= MILLISECONDS_PER_DAY) {
    return convertTimeFormat(dayAmount) + `D ` + convertTimeFormat(hourAmount) + `H ` + convertTimeFormat(minuteAmount) + `M`;
  }
  if (duration >= MILLISECONDS_PER_HOUR) {
    return convertTimeFormat(hourAmount) + `H ` + convertTimeFormat(minuteAmount) + `M`;
  }
  return convertTimeFormat(minuteAmount) + `M`;
};

const createEventTemplate = (event) => {
  const {type, destination, price, offers, beginDate, endDate} = event;
  const offersTemplate = creatEventOffer(offers.slice(0, 3));
  const eventDurationTemplate = calculateEventDuration(beginDate, endDate);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${getEventTypeAction(type, EVENT_TYPES_ACTION)} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${beginDate.toLocaleString()}">${moment(beginDate).format(`HH:mm`)}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate.toLocaleString()}">${moment(endDate).format(`HH:mm`)}</time>
          </p>
          <p class="event__duration">${eventDurationTemplate}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends AbstaractView {
  constructor(event) {
    super();
    this._event = event;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
