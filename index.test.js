describe("When using an object with a getter", () => {
  const ExampleObject = {
    get foo() {
      return {
        bar: 5
      };
    }
  };
  console.log("Tests Object", Object.keys(ExampleObject), ExampleObject.foo);

  it("works as expected when matching succeeds", () => {
    expect(ExampleObject).toMatchObject({
      foo: {
        bar: 5
      }
    });
  });

  it("works as expected when matching fails, properly shows the single mismatching field", () => {
    expect(ExampleObject).toMatchObject({
      foo: {
        bar: 6
      }
    });
  });
});

describe("When using a class with a getter and a setter", () => {
  class ExampleClass {
    get foo() {
      return {
        bar: 5
      };
    }
    // For some reason setter is required by toMatchObject, otherwise it throws
    // The setter does not matter, the output is the same if it is a valid setter or a dummy
    // See https://github.com/facebook/jest/issues/10167
    set foo(value) {} // dummy setter
  }
  const ExampleInstance = new ExampleClass();
  console.log(
    "Tests Instance",
    Object.keys(ExampleInstance),
    ExampleInstance.foo
  );

  it("works as expected when matching succeeds", () => {
    expect(ExampleInstance).toMatchObject({
      foo: {
        bar: 5
      }
    });
  });

  it("output unexpectedly shows that expectation did not match actual value at all", () => {
    expect(ExampleInstance).toMatchObject({
      foo: {
        bar: 6
      }
    });
  });
});

describe("When using a class with a getter and a setter and a value", () => {
  class ExampleClass {
    constructor() {
      this.value = 5
    }
    get foo() {
      return {
        bar: 5
      };
    }
    // For some reason setter is required by toMatchObject, otherwise it throws
    // The setter does not matter, the output is the same if it is a valid setter or a dummy
    // See https://github.com/facebook/jest/issues/10167
    set foo(value) {} // dummy setter
  }
  const ExampleInstance = new ExampleClass();
  console.log(
    "Tests Instance",
    Object.keys(ExampleInstance),
    ExampleInstance.foo
  );

  it("works as expected when matching succeeds", () => {
    expect(ExampleInstance).toMatchObject({
      value: 5,
      foo: {
        bar: 5
      }
    });
  });

  it("output shows that the objects partially matched, but unexpectedly foo is missing", () => {
    expect(ExampleInstance).toMatchObject({
      value: 5,
      foo: {
        bar: 6
      }
    });
  });
});
