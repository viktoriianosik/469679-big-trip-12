export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
};

export const renderTemplate = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};

export const createElement = (fragment) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = fragment;
  return newElement.firstChild;
};

export const render = (container, element, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const randomArrayItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const shuffleArray = (array) => {
  return array.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);
};

export const generateRandomArray = function (array, number) {
  const newAmount = getRandomInteger(1, number);
  const newArray = shuffleArray(array).slice(0, newAmount);
  return newArray;
};

export const getEventTypeAction = (type, obj) => {
  let action = ``;
  for (const [key, value] of Object.entries(obj)) {
    if (value.includes(type)) {
      action = key;
    }
  }
  return action;
};
