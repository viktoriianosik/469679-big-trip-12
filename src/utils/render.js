import Abstract from '../view/adstract.js';

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

export const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};
