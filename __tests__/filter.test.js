Array.prototype.myOwnFilter = function (callbackFn, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callbackFn.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

test("multiple values", () => {
  const isEven = (element) => element % 2 === 0;

  expect([1, 2, 3, 4, 5].myOwnFilter(isEven)).toEqual([2, 4]);
});

test("use this", () => {
  const isThisProductEven = function (element) {
    return (element * this) % 2 === 0;
  };

  expect([1, 2, 3, 4, 5].myOwnFilter(isThisProductEven, 3)).toEqual([2, 4]);
});

test("use index argument", () => {
  const isEvenIndex = (_, index) => index % 2 === 0;

  expect([1, 2, 3, 4, 5].myOwnFilter(isEvenIndex)).toEqual([1, 3, 5]);
});

test("use array argument", () => {
  const isSquareEven = (_, index, array) =>
    (array[index] * array[index]) % 2 === 0;

  expect([1, 2, 3, 4, 5].myOwnFilter(isSquareEven)).toEqual([2, 4]);
});
