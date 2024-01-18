function throttle(callbackFn, wait) {
  let shouldThrottle = false;
  return function (...args) {
    if (shouldThrottle) {
      return;
    }
    callbackFn.apply(this, args);
    shouldThrottle = true;
    setTimeout(() => {
      shouldThrottle = false;
    }, wait);
  };
}

test("invokes callback immediately", () => {
  let i = 0;
  const increment = throttle(() => {
    i++;
  }, 50);

  expect(i).toEqual(0);
  increment();
  expect(i).toEqual(1);
});

test("throttles delayed invocations", (done) => {
  let i = 0;
  const increment = throttle(() => {
    i++;
  }, 100);

  expect(i).toEqual(0);
  increment();
  expect(i).toEqual(1);

  setTimeout(() => {
    increment();
    expect(i).toEqual(1);
  }, 25);

  setTimeout(() => {
    increment();
    expect(i).toEqual(1);
    done();
  }, 50);
});

test("uses arguments", () => {
  let i = 21;
  const increment = throttle((a, b) => {
    i += a * b;
  }, 50);

  expect(i).toEqual(21);
  increment(3, 7);
  expect(i).toEqual(42);
});

test("can be called again after first throttling window", (done) => {
  let i = 0;
  const increment = throttle(() => {
    i++;
  }, 100);

  expect(i).toEqual(0);
  increment();
  expect(i).toEqual(1);

  // Should not fire yet.
  setTimeout(() => {
    expect(i).toEqual(1);
    increment();
    expect(i).toEqual(1);
  }, 50);

  setTimeout(() => {
    expect(i).toEqual(1);
    increment();
    expect(i).toEqual(2);
  }, 150);

  setTimeout(() => {
    expect(i).toEqual(2);
    increment();
    expect(i).toEqual(2);
    done();
  }, 200);
});

test("callbacks can access `this`", (done) => {
  const increment = throttle(function (delta) {
    this.val += delta;
  }, 50);

  const obj = {
    val: 2,
    increment,
  };

  expect(obj.val).toEqual(2);
  obj.increment(3);
  expect(obj.val).toEqual(5);

  setTimeout(() => {
    obj.increment(10);
    expect(obj.val).toEqual(15);
    done();
  }, 100);
});
