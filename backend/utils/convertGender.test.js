// Import the function or module you want to test
const convertGender = require("./convertGender");

// Describe the test suite
describe("convertGender", () => {
  test("should return 1 for 'male'", () => {
    expect(convertGender("male")).toBe(1);
  });

  test("should return 1 for 'm'", () => {
    expect(convertGender("m")).toBe(1);
  });

  test("should return 2 for 'female'", () => {
    expect(convertGender("female")).toBe(2);
  });

  test("should return 2 for 'f'", () => {
    expect(convertGender("f")).toBe(2);
  });

  test("should return 3 for 'non-binary'", () => {
    expect(convertGender("non-binary")).toBe(3);
  });

  test("should return 3 for 'nonbinary'", () => {
    expect(convertGender("nonbinary")).toBe(3);
  });

  test("should return 3 for 'nb'", () => {
    expect(convertGender("nb")).toBe(3);
  });

  test("should return 4 for 'transgender'", () => {
    expect(convertGender("transgender")).toBe(4);
  });

  test("should return 4 for 'trans'", () => {
    expect(convertGender("trans")).toBe(4);
  });

  test("should return 4 for 'tg'", () => {
    expect(convertGender("tg")).toBe(4);
  });

  test("should return 5 for 'intersex'", () => {
    expect(convertGender("intersex")).toBe(5);
  });

  test("should return 5 for 'i'", () => {
    expect(convertGender("i")).toBe(5);
  });

  test("should return 6 for 'prefer not to say'", () => {
    expect(convertGender("prefer not to say")).toBe(6);
  });

  test("should return 6 for 'pnts'", () => {
    expect(convertGender("pnts")).toBe(6);
  });

  test("should return 7 for 'other'", () => {
    expect(convertGender("other")).toBe(7);
  });

  test("should return 7 for 'o'", () => {
    expect(convertGender("o")).toBe(7);
  });

  test("should return null for unrecognized gender", () => {
    expect(convertGender("unknown")).toBeNull();
  });

  // Test cases for case sensitivity
  test("should handle uppercase inputs", () => {
    expect(convertGender("MALE")).toBe(1);
    expect(convertGender("FEMALE")).toBe(2);
    expect(convertGender("NB")).toBe(3);
  });

  // Test for trimming spaces
  test("should trim spaces in input", () => {
    expect(convertGender(" male ")).toBe(1);
    expect(convertGender(" female ")).toBe(2);
  });

  // Test for empty string or null input
  test("should return null for empty or null input", () => {
    expect(convertGender("")).toBeNull();
    expect(convertGender(null)).toBeNull();
  });
});
