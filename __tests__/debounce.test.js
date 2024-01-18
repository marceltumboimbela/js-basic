function debounce(callbackFn, wait) {
  let timeoutId = null;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callbackFn.apply(this, args), wait);
  };
}

test("executes after duration", (done) => {
  let i = 0;
  const increment = debounce(() => {
    i++;
  }, 10);

  expect(i).toEqual(0);
  increment();
  expect(i).toEqual(0);

  setTimeout(() => {
    expect(i).toEqual(1);
    done();
  }, 20);
});

test("uses arguments of latest invocation", (done) => {
  let i = 21;
  const increment = debounce((a, b) => {
    i += a * b;
  }, 10);

  expect(i).toEqual(21);
  increment(3, 7);
  increment(4, 5);
  expect(i).toEqual(21);

  setTimeout(() => {
    expect(i).toEqual(41);
    done();
  }, 20);
});

test("execute once even after calling it multiple times", (done) => {
  let i = 0;
  const increment = debounce(() => {
    i++;
  }, 20);

  expect(i).toEqual(0);
  increment();
  increment();
  increment();
  increment();
  expect(i).toEqual(0);

  // Should not fire yet.
  setTimeout(() => {
    expect(i).toEqual(0);
  }, 10);

  setTimeout(() => {
    expect(i).toEqual(1);
    done();
  }, 30);
});

test("duration extended if called again during window", (done) => {
  let i = 0;
  const increment = debounce(() => {
    i++;
  }, 100);

  expect(i).toEqual(0);
  increment();
  increment();
  expect(i).toEqual(0);

  // Should not fire yet.
  setTimeout(() => {
    expect(i).toEqual(0);
    increment();
    expect(i).toEqual(0);
  }, 50);

  setTimeout(() => {
    // Still 0 because we fired again at t=50, increment will only happen at t=150
    expect(i).toEqual(0);
  }, 125);

  setTimeout(() => {
    expect(i).toEqual(1);
    done();
    // Add a longer delay because the browser timer is unreliable.
  }, 1500);
});

test("callbacks can access `this`", (done) => {
  const increment = debounce(function (delta) {
    this.val += delta;
  }, 10);

  const obj = {
    val: 2,
    increment,
  };

  expect(obj.val).toEqual(2);
  obj.increment(3);
  expect(obj.val).toEqual(2);

  setTimeout(() => {
    expect(obj.val).toEqual(5);
    done();
  }, 20);
});
