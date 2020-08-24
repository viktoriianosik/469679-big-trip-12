export const getEventTypeAction = (type, obj) => {
  let action = ``;
  for (const [key, value] of Object.entries(obj)) {
    if (value.includes(type)) {
      action = key;
    }
  }
  return action;
};


export const sorEventstByDate = (dateA, dateB) => {
  return new Date(dateA) - new Date(dateB);
};

export const sortEventsByPrice = (priceA, priceB) => {
  return priceB.price - priceA.price;
};

export const sortEventsByTime = (eventA, eventB) => {
  const durationA = new Date(eventA.endDate) - new Date(eventA.beginDate);
  const durationB = new Date(eventB.endDate) - new Date(eventB.beginDate);

  return durationB - durationA;
};

