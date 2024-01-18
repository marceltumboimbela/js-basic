Array.prototype.myOwnConcat = function (...args) {
  let result = [...this];
  for (let arg of args) {
    if (Array.isArray(arg)) {
      result.push(...arg);
    } else {
      result.push(arg);
    }
  }
  return result;
};

test("empty array", () => {
  expect([].myOwnConcat([])).toEqual([]);
});

test("single array argument", () => {
  expect([1].myOwnConcat([2])).toEqual([1, 2]);
  expect([1, 2, 3].myOwnConcat([4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
});

test("multiple arrays arguments", () => {
  expect([1, 2, 3].myOwnConcat([4, 5, 6], [7, 8, 9])).toEqual([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
});

test("primitive arguments", () => {
  expect([1, 2].myOwnConcat(3, 4)).toStrictEqual([1, 2, 3, 4]);
});

test("mixed arguments", () => {
  expect([1, 2, 3].myOwnConcat([4, 5, 6], 7)).toStrictEqual([
    1, 2, 3, 4, 5, 6, 7,
  ]);
});
