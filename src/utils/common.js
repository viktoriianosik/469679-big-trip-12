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
