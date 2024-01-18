Array.prototype.myOwnMap = function (callbackFn, thisArg) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callbackFn.call(thisArg, this[i], i, this));
  }
  return result;
};

test("multiply by 2", () => {
  const multiplyBy2 = (element) => element * 2;

  expect([1, 2, 3, 4, 5].myOwnMap(multiplyBy2)).toEqual([2, 4, 6, 8, 10]);
});

test("use this", () => {
  const useThis = function (element) {
    return element * this;
  };

  expect([1, 2, 3, 4, 5].myOwnMap(useThis, 3)).toEqual([3, 6, 9, 12, 15]);
});

test("use index argument", () => {
  const multiplyByIndex = (element, index) => element * index;

  expect([1, 2, 3, 4, 5].myOwnMap(multiplyByIndex)).toEqual([0, 2, 6, 12, 20]);
});

test("use array argument", () => {
  const square = (element, index, array) => element * array[index];

  expect([1, 2, 3, 4, 5].myOwnMap(square)).toEqual([1, 4, 9, 16, 25]);
});
