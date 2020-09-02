export const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
export const EVENT_TYPES_TRANSFER = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
export const EVENT_TYPES_ACTIVITY = [`Check-in`, `Sightseeing`, `Restaurant`];
export const EVENT_TYPES_ACTION = {
  to: EVENT_TYPES_TRANSFER,
  in: EVENT_TYPES_ACTIVITY,
};
export const EVENT_DESTINATIONS = [`Kiev`, `Lviv`, `Berlin`, `Madrid`, `Paris`, `Amsterdam`, `Copenhagen`, `Milan`, `Barselona`];
export const EVENT_OFFERS = [
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
export const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};
