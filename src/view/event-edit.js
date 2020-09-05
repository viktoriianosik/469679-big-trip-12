import {getEventTypeAction} from '../utils/event.js';
import {EVENT_TYPES_ACTION, EVENT_TYPES_TRANSFER, EVENT_TYPES_ACTIVITY, EVENT_DESTINATIONS} from '../const.js';
import SmartView from './smart.js';

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

const createOffers = (offers, checkedOffers) => {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers.map((offer) => createOfferItem(offer, checkedOffers.includes(offer))).join(``)}
    </section>`
  );
};

const createDestinationList = (destinations) => {
  return destinations.map((destination) => `<option value="${destination}"></option>`).join(``);
};

const createEventTypeItem = (type) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}">${type}</label>
    </div>`
  );
};

const createEventTypeGroup = (types) => {
  return types.map((type) => createEventTypeItem(type)).join(``);
};

const createPhotos = (photos) => {
  return photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``);
};

const createEventEditTemplate = (data, typesOffers) => {
  const {type, destination, cityDescriptions, beginDate, endDate, offers, photos, price, isFavorite} = data;
  const typeOffers = typesOffers.find((el) => el.type === type);
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
  const cityDescription = cityDescriptions.find((el) => el.destination === destination);
  const description = cityDescription ? cityDescription.description : ``;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle" type="checkbox">

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
          <label class="event__label  event__type-output" for="event-destination">
            ${type} ${getEventTypeAction(type, EVENT_TYPES_ACTION)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination" type="text" name="event-destination" value="${destination}" list="destination-list">
          <datalist id="destination-list">
            ${createDestinationList(EVENT_DESTINATIONS)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value="${beginDate.toLocaleString(`en-GB`, dateOptions).replace(/,/g, ``)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="${endDate.toLocaleString(`en-GB`, dateOptions).replace(/,/g, ``)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${typeOffers.offers.length !== 0 ? createOffers(typeOffers.offers, offers) : ``}
        ${destination.length !== 0 ? `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${createPhotosTemplate}
            </div>
          </div>
        </section>` : ``}
      </section>
    </form>`
  );
};

export default class EventEdit extends SmartView {
  constructor(data, typesOffers) {
    super();
    this._data = data;
    this._typesOffres = typesOffers;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._favotiteClickHandler = this._favotiteClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEventEditTemplate(this._data, this._typesOffres);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  _favotiteClickHandler() {
    this._callback.favotiteClick();
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    const selectedType = evt.target.value;

    if (selectedType === this._data.type) {
      return;
    }

    this.updateData(
        {
          type: selectedType,
        }
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseClickHandler(this._callback.closeClick);
    this.setFavoriteClickhandler(this._callback.favotiteClick);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._typeChangeHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._priceInputHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData(
        {
          destination: evt.target.value,
        }
    );
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeClickHandler);
  }

  setFavoriteClickhandler(callback) {
    this._callback.favotiteClick = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._favotiteClickHandler);
  }

  reset(event) {
    this.updateData(event);
  }
}
