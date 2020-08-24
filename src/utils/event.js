export const getEventTypeAction = (type, obj) => {
  let action = ``;
  for (const [key, value] of Object.entries(obj)) {
    if (value.includes(type)) {
      action = key;
    }
  }
  return action;
};


export const sortByDate = (dateA, dateB) => {
  return new Date(dateA) - new Date(dateB);
};
