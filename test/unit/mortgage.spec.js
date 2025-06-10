const expect = require("chai").expect;
const Mortgage = require("../../src/js/lib/Mortgage");

describe("Mortgage Calculator", () => {

    it("should calculate the monthly payment correctly", () => {
        const mortgage = new Mortgage(200000, 5, 30, 12);
        const result = mortgage.monthlyPayment();
        expect(result).to.equal("1073.64");
    })

    it("should handle zero interest rate", () => {
        const mortgage = new Mortgage(200000, 0, 30, 12);
        const result = mortgage.monthlyPayment();
        expect(result).to.equal("555.56");
    });
});
