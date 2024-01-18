function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

function deepClone(object) {
  const type = getType(object);

  if (type === "Array") {
    return object.map((item) => deepClone(item));
  }

  if (type === "Object") {
    return Object.fromEntries(
      Object.entries(object).map(([k, v]) => [k, deepClone(v)]),
    );
  }

  return object;
}

test("primitive values", () => {
  expect(deepClone("foo")).toEqual("foo");
  expect(deepClone(123)).toEqual(123);
  expect(deepClone(true)).toEqual(true);
  expect(deepClone(false)).toEqual(false);
  expect(deepClone(null)).toEqual(null);
});

test("object no nesting", () => {
  const obj = { role: "foo" };
  const clonedObj = deepClone(obj);
  clonedObj.role = "bar";
  expect(obj).toEqual({ role: "foo" });
});

test("object one level of nesting", () => {
  const obj = { user: { role: "admin", id: "123" } };
  const clonedObj = deepClone(obj);
  clonedObj.user.role = "bar";
  expect(obj).toEqual({ user: { role: "admin", id: "123" } });
});

test("object two levels of nesting", () => {
  const obj = { a: { b: { c: "d" } }, e: "f" };
  const clonedObj = deepClone(obj);
  clonedObj.a.b = {};
  expect(obj).toEqual({ a: { b: { c: "d" } }, e: "f" });
});

test("object containing arrays", () => {
  const obj = { foo: [{ bar: "baz" }] };
  const clonedObj = deepClone(obj);
  clonedObj.foo[0].bar = "bax";

  expect(obj).toEqual({ foo: [{ bar: "baz" }] });
});

test("array containing objects", () => {
  const obj = [{ a: "foo" }, { b: "bar" }];
  const clonedObj = deepClone(obj);
  clonedObj[1].b = "baz";

  expect(obj).toEqual([{ a: "foo" }, { b: "bar" }]);
});

test("array containing nested objects", () => {
  const obj = [{ a: { id: "foo" } }, { b: { id: "baz" } }];
  const clonedObj = deepClone(obj);
  clonedObj[1].b = { id: "bax" };

  expect(obj).toEqual([{ a: { id: "foo" } }, { b: { id: "baz" } }]);
});
