//@ts-check

/** Takes in a string and a list of functions used to validate the string on.
 *  Returns {true} if all functions return {true} else returns a list of {string} errors
 * @param {string} input
 * @param {function[]} validatorFns
 * @returns {true|string[]}
 */

export const validate = (input, validatorFns) => {
  const res = validatorFns.map((fn) => {
    return fn(input);
  });
  return res.every((v) => v === true)
    ? true
    : res.filter((v) => typeof v === "string");
};
