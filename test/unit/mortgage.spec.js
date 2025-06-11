const expect = require("chai").expect;
const Mortgage = require("../../src/js/lib/Mortgage");

describe("Mortgage Calculator", () => {
  it("should calculate the monthly payment correctly", () => {
    const mortgage = new Mortgage(200000, 5, 30, 12);
    const result = mortgage.monthlyPayment();
    expect(result).to.equal("1073.64");
  });

  it("should handle zero interest rate", () => {
    const mortgage = new Mortgage(200000, 0, 30, 12);
    const result = mortgage.monthlyPayment();
    expect(result).to.equal("555.56");
  });

  it("should handle fractional interest rates", () => {
    const mortgage = new Mortgage(200000, 3.5, 30, 12);
    const result = mortgage.monthlyPayment();
    expect(result).to.equal("898.09");
  });

  it("should return a string with two decimal places", () => {
    const mortgage = new Mortgage(150000, 5, 15, 12);
    const result = mortgage.monthlyPayment();
    expect(result).to.match(/^\d+\.\d{2}$/); // This Regex means the result should be a string with two decimal places
  });

  it("should handle large loan amounts", () => {
    const mortgage = new Mortgage(10000000, 4, 30, 12); // $10M loan
    const result = mortgage.monthlyPayment();
    expect(result).to.equal("47741.53");
  });

  it("should calculate correctly for short-term loans", () => {
    const mortgage = new Mortgage(10000, 5, 1, 12); // 1-year term
    const result = mortgage.monthlyPayment();
    expect(result).to.equal("856.07");
  });

  it("should calculate correctly with quarterly payments", () => {
    const mortgage = new Mortgage(100000, 6, 15, 4); // Quarterly compounding
    const result = mortgage.monthlyPayment();
    expect(result).to.equal("2539.34");
  });
});
