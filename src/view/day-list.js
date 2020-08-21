import AbstaractView from './adstract.js';

const createDayListTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DaysList extends AbstaractView {
  getTemplate() {
    return createDayListTemplate();
  }
}

