import AbstaractView from './adstract.js';

const createNoPointTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoPoint extends AbstaractView {
  getTemplate() {
    return createNoPointTemplate(this._event);
  }
}
