import {getEventTypeAction, createElement} from '../utils.js';
import {EVENT_TYPES_ACTION, EVENT_OFFERS, EVENT_TYPES_TRANSFER, EVENT_TYPES_ACTIVITY} from '../const.js';

const createOfferItem = (offer, isChecked) => {
  const offerID = offer.name.split(` `).splice(-1);
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerID}-1" type="checkbox" name="event-offer-${offerID}" ${isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${offerID}-1">
        <span class="event__offer-title">${offer.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  );
};

const createOffers = (checkedOffers) => {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${EVENT_OFFERS.map((offer) => createOfferItem(offer, checkedOffers.includes(offer))).join(``)}
    </section>`
  );
};

const createEventTypeItem = (type) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`
  );
};

const createEventTypeGroup = (types) => {
  return types.map((type) => createEventTypeItem(type)).join(``);
};

const createPhotos = (photos) => {
  return photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``);
};

const createEventEditTemplate = (event) => {
  const {type, destination, description, beginDate, endDate, offers, photos} = event;
  const dateOptions = {
    day: `numeric`,
    month: `numeric`,
    year: `2-digit`,
    hour: `numeric`,
    minute: `numeric`,
  };
  const createEventTransferTypeTemplate = createEventTypeGroup(EVENT_TYPES_TRANSFER);
  const createEventActivityTypeTemplate = createEventTypeGroup(EVENT_TYPES_ACTIVITY);
  const createPhotosTemplate = createPhotos(photos);


  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${createEventTransferTypeTemplate}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${createEventActivityTypeTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type} ${getEventTypeAction(type, EVENT_TYPES_ACTION)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="Saint Petersburg"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${beginDate.toLocaleString(`en-GB`, dateOptions).replace(/,/g, ``)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate.toLocaleString(`en-GB`, dateOptions).replace(/,/g, ``)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        ${createOffers(offers)}
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${createPhotosTemplate}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

export default class EventEdit {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
