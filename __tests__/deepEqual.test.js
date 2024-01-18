function shouldCompare(type) {
  return type === "Array" || type === "Object";
}

function deepEqual(objectA, objectB) {
  const typeA = Object.prototype.toString.call(objectA).slice(8, -1);
  const typeB = Object.prototype.toString.call(objectB).slice(8, -1);

  if (typeA === typeB && shouldCompare(typeA) && shouldCompare(typeB)) {
    if (Object.entries(objectA).length !== Object.entries(objectB).length) {
      return false;
    }

    return Object.entries(objectA).every(([k, v]) => {
      return Object.hasOwn(objectB, k) && deepEqual(v, objectB[k]);
    });
  }

  return Object.is(objectA, objectB);
}

test("primitive values", () => {
  expect(deepEqual(0, 0)).toEqual(true);
  expect(deepEqual("foo", "foo")).toEqual(true);
  expect(deepEqual(true, 1)).toEqual(false);
  expect(deepEqual(true, true)).toEqual(true);
  expect(deepEqual(false, false)).toEqual(true);
  expect(deepEqual(null, null)).toEqual(true);
});

test("array of number and strings", () => {
  expect(deepEqual([1], [1])).toEqual(true);
  expect(deepEqual(["1"], ["1"])).toEqual(true);
  expect(deepEqual([1], ["1"])).toEqual(false);
  expect(deepEqual([1, 2], [1, 2])).toEqual(true);
  expect(deepEqual([1, 2, 3], [1, 2, 3])).toEqual(true);
  expect(deepEqual([1, 2, 3], [1, 3, 2])).toEqual(false);
});

test("array of boolean", () => {
  expect(deepEqual([true], [true])).toEqual(true);
  expect(deepEqual([true], [1])).toEqual(false);
  expect(deepEqual([false], [false])).toEqual(true);
  expect(deepEqual([true], [false])).toEqual(false);
  expect(deepEqual([0], [false])).toEqual(false);
});

test("array of objects", () => {
  expect(deepEqual([{ foo: 1 }], [{ foo: 1 }])).toEqual(true);
  expect(deepEqual([{ foo: 1 }], [{ foo: 2 }])).toEqual(false);
});

test("empty object", () => {
  expect(deepEqual({}, {})).toEqual(true);
});

test("basic object", () => {
  expect(deepEqual({}, {})).toEqual(true);
  expect(deepEqual({ foo: "bar" }, { foo: "bar" })).toEqual(true);
  expect(deepEqual({ foo: "bar", id: 1 }, { foo: "bar", id: 1 })).toEqual(true);
  expect(deepEqual({ foo: "bar", id: 1 }, { foo: "bar", id: "1" })).toEqual(
    false,
  );
});

test("object with different keys", () => {
  expect(deepEqual({ foo: "bar" }, { fob: "bar" })).toEqual(false);
});

test("object with different values", () => {
  expect(deepEqual({ foo: "bar" }, { foo: "baz" })).toEqual(false);
});

test("same keys but different types", () => {
  expect(deepEqual({ 0: "foo" }, ["foo"])).toEqual(false);
});

test("object with array properties", () => {
  expect(
    deepEqual(
      { foo: "bar", item: [1, 2, { baz: "baz" }] },
      { foo: "bar", item: [1, 2, { baz: "baz" }] },
    ),
  ).toEqual(true);
});

test("subset objects", () => {
  expect(
    deepEqual(
      { foo: "bar", item: [1, 2, { baz: "baz" }] },
      { foo: "bar", item: [1, 2, { baz: "baz" }], id: 1 },
    ),
  ).toEqual(false);
});
