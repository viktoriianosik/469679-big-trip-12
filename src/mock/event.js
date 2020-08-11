import {generateRandomArray, randomArrayItem, getRandomInteger} from '../utils.js';
import {EVENT_TYPES, EVENT_DESTINATION, DESCRIPTIONS, EVENT_OFFERS} from '../const.js';

const EVENT_OFFERS_MAX_COUNT = 3;
const EVENT_DESCRIPTION_MAX_SENTENCE = 5;

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

export const generateEvent = () => {
  return {
    type: randomArrayItem(EVENT_TYPES),
    destination: randomArrayItem(EVENT_DESTINATION),
    offers: generateRandomArray(EVENT_OFFERS, EVENT_OFFERS_MAX_COUNT),
    description: generateRandomArray(DESCRIPTIONS, EVENT_DESCRIPTION_MAX_SENTENCE),
    photos: generatePhotos(),
    price: getRandomInteger(20, 1000),
    beginDate: generateRandomBeginDate(),
    endDate: generateRandomEndDate(),
  };
};
