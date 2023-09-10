/**
 *
 * @param {string} idNum
 * @returns
 */
const getCheckDigit = (idNum) => {
  let check = "";

  for (let i = idNum.length - 2; i >= 0; i--) {
    let x = idNum[i];
    if (i % 2 === 0) {
      x = parseInt(x);
      x *= 2;
    }

    check += x.toString();
  }

  let checkSum = 0;
  for (let x of check) {
    checkSum += parseInt(x, 10);
  }
  return 10 - (checkSum % 10);
};

export const checkSum = (payload) => {
  payload = payload.split(" ").join("");
  return getCheckDigit(payload) === parseInt(payload.slice(-1), 10)
    ? true
    : "Card Number is incorrect";
};

console.log(checkSum("9710064503105395"));
