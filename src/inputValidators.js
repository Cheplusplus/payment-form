//@ts-check

/**
 * @param {string} input
 * @returns {true|Error}
 */

export const isOnlyLetters = (input) => {
  const stream = [...input];
  return stream.every((char) => char.toLowerCase() !== char.toUpperCase())
    ? true
    : new Error("No numbers or special characters allowed");
};

/**
 * @param {string} input
 * @returns {true|Error|null}
 */
export const isOnlyNumbers = (input) => {
  const numInput = Number(input);
  return !isNaN(numInput) ? true : new Error("Wrong format, numbers only");
};
