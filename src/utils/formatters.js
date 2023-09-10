/**
 *
 * @param {string} month
 * @returns {string}
 */
export const monthFormatter = (month) => {
  return month.length === 1 ? month.padStart(2, "0") : month;
};

/**
 *
 * @param {string} cardNumber
 * @returns {string}
 */
export const cardNumberFormatter = (cardNumber) => {
  cardNumber = cardNumber.split(" ").join("");
  let pattern = /(.{4})(?! )/g;
  let outputString = cardNumber.replace(pattern, "$1 ");
  return outputString.slice(0, 19);
};
