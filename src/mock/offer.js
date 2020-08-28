import {EVENT_TYPES} from '../const.js';
import {generateRandomArray} from '../utils/common.js';

const EVENT_OFFERS_MAX_COUNT = 5;
const EVENT_OFFERS = [
  {
    name: `Add luggage`,
    price: 30,
  },
  {
    name: `Switch to comfort`,
    price: 80,
  },
  {
    name: `Add meal`,
    price: 15,
  },
  {
    name: `Choose seats`,
    price: 5,
  },
  {
    name: `Travel by train`,
    price: 40,
  },
];

export const generateOffersForAllType = () => {
  const offers = [];
  EVENT_TYPES.forEach((type) => {
    offers.push({
      type,
      offers: generateRandomArray(EVENT_OFFERS, EVENT_OFFERS_MAX_COUNT),
    });
  });
  return offers;
};
