function isEmpty(value) {
  const type = Object.prototype.toString.call(value).slice(8, -1);
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === "string") {
    return value.length === 0;
  }
  if (value instanceof Map) {
    return value.size === 0;
  }
  if (value instanceof Set) {
    return value.size === 0;
  }
  if (type === "Object") {
    return Object.keys(value).length === 0;
  }
  return true;
}

test("empty values", () => {
  expect(isEmpty(true)).toEqual(true);
  expect(isEmpty(1)).toEqual(true);
  expect(isEmpty(NaN)).toEqual(true);
  expect(isEmpty(/x/)).toEqual(true);
  expect(isEmpty(Symbol("x"))).toEqual(true);
});

test("empty string", () => {
  expect(isEmpty("")).toEqual(true);
});

test("non-empty string", () => {
  expect(isEmpty("a")).toEqual(false);
});

test("empty object", () => {
  expect(isEmpty({})).toEqual(true);
});

test("non-empty object", () => {
  expect(isEmpty({ a: 0 })).toEqual(false);
});

test("object that has a `length` property", () => {
  expect(isEmpty({ length: 0 })).toEqual(false);
});

test("objects with negative lengths", function () {
  function Foo() {}
  Foo.prototype.length = -1;

  expect(isEmpty(new Foo())).toEqual(true);
});

test("non-number lengths", function () {
  expect(isEmpty({ length: "0" })).toEqual(false);
});

test("empty map", () => {
  const map = new Map();
  expect(isEmpty(map)).toEqual(true);
});

test("non-empty map", () => {
  const map = new Map([["a", 1]]);
  expect(isEmpty(map)).toEqual(false);
});

test("empty set", () => {
  const set = new Set();
  expect(isEmpty(set)).toEqual(true);
});

test("non-empty set", () => {
  const set = new Set([1]);
  expect(isEmpty(set)).toEqual(false);
});

test("empty array", () => {
  expect(isEmpty([])).toEqual(true);
});

test("non-empty array", () => {
  expect(isEmpty([1])).toEqual(false);
});
