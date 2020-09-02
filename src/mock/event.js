import {generateRandomArray, randomArrayItem, getRandomInteger} from '../utils/common.js';
import {EVENT_TYPES, EVENT_DESTINATIONS, DESCRIPTIONS} from '../const.js';

const EVENT_DESCRIPTION_MAX_SENTENCE = 5;

const descriptions = EVENT_DESTINATIONS.map((destination) => {
  return ({
    destination,
    description: generateRandomArray(DESCRIPTIONS, EVENT_DESCRIPTION_MAX_SENTENCE),
  });
});

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generatePhotos = () => {
  return new Array(getRandomInteger(1, 5)).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
};

const generateRandomBeginDate = () => {
  const start = new Date().getTime();
  const end = new Date(start + 86400000);
  return new Date(start + Math.random() * (end - start));
};

const generateRandomEndDate = () => {
  const current = new Date().getTime();
  const start = new Date(current + 86400000).getTime();
  const end = new Date(current + (86400000 * 2));
  return new Date(start + Math.random() * (end - start));
};

export const generateEvent = (array) => {
  const type = randomArrayItem(EVENT_TYPES);
  const typeOffers = array.find((el) => el.type === type);

  return {
    id: generateId(),
    type,
    destination: randomArrayItem(EVENT_DESTINATIONS),
    offers: generateRandomArray(typeOffers.offers, typeOffers.offers.length),
    descriptions,
    photos: generatePhotos(),
    price: getRandomInteger(20, 1000),
    beginDate: generateRandomBeginDate(),
    endDate: generateRandomEndDate(),
    isFavorite: Boolean(getRandomInteger()),
  };
};
