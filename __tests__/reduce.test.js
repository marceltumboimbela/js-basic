Array.prototype.myOwnReduce = function (callbackFn, initialValue) {
  let result = null;
  let initialIndex = null;
  if (initialValue === undefined) {
    result = this[0];
    initialIndex = 1;
  } else {
    result = initialValue;
    initialIndex = 0;
  }
  for (let i = initialIndex; i < this.length; i++) {
    result = callbackFn(result, this[i], i, this);
  }
  return result;
};

test("two values", () => {
  const add = (prev, curr) => prev + curr;

  expect([-4, 10].myOwnReduce(add, 1)).toEqual(7);
});

test("without initial value", () => {
  const add = (prev, curr) => prev + curr;

  expect([-4, 10].myOwnReduce(add)).toEqual(6);
});

test("reducer uses index argument when provided", () => {
  const multiplyByIndex = (prev, curr, index) => prev + curr * index;

  expect([1, 2, 3].myOwnReduce(multiplyByIndex, 0)).toEqual(8);
});

test("reducer uses array argument when provided", () => {
  const sumOfSquares = (prev, curr, index, array) => prev + curr * array[index];

  expect([1, 2, 3, 4].myOwnReduce(sumOfSquares, 0)).toEqual(30);
});
