//@ts-check

/** Takes in a string and a list of functions used to validate the string on.
 *  Returns {true} if all the functions return {true} else returns a list of {Error}
 * @param {string} input
 * @param {function[]} validatorFns
 * @returns {true|Error[]}
 */

export const validate = (input, validatorFns) => {
  const res = validatorFns.map((fn) => {
    return fn(input);
  });
  return res.every((v) => v === true)
    ? true
    : res.filter((v) => v instanceof Error);
};
