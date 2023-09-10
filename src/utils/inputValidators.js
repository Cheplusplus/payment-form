//@ts-check

/**
 * @param {string} input
 * @returns {true|string}
 */

export const isOnlyLetters = (input) => {
  const stream = [...input];
  return stream.every((char) =>
    char !== " " ? char.toLowerCase() !== char.toUpperCase() : true
  )
    ? true
    : "No numbers or special characters";
};

/**
 * @param {string} input
 * @returns {true|string}
 */
export const isOnlyNumbers = (input) => {
  const numInput = Number(input.split(" ").join(""));
  return !isNaN(numInput) ? true : "Wrong format, numbers only";
};

/**
 * @param {string} input
 * @returns {true|string}
 */
export const cannotBeBlank = (input) => {
  return input === "" ? "Cannot be blank" : true;
};
