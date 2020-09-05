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
    case RenderPosition.AFTEREND:
      container.after(child);
      break;
  }
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  const isAbstract = (component instanceof Abstract);

  if (component === null) {
    return;
  }

  if (!isAbstract) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
