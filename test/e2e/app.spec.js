const express = require("express");
const expect = require("chai").expect;
const path = require("path");
const Nightmare = require("nightmare");

const app = express();

app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../dist")));

const url = "http://localhost:8888";

const nightmare = new Nightmare();

describe("End to End Tests", () => {
  let httpServer = null;
  let pageObject = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  it("should contain a <h1> element for the page title", () => {
    return pageObject
      .evaluate(() => document.querySelector("h1").innerText)
      .then((headerText) => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal("Mortgage Calculator");
      });
  });

  it("should contain a <select> element with 2 options", () => {
    return pageObject
      .evaluate(() => document.querySelector("select").options.length)
      .then((optionCount) => {
        expect(optionCount).to.equal(2);
      });
  });

  it("should have a button with the text 'Calculate'", () => {
    return pageObject
      .evaluate(() => document.querySelector("button").innerText)
      .then((buttonText) => {
        expect(buttonText).to.equal("Calculate");
      });
  });

  it("should have an input field for principal, interest rate, and loan term", () => {
    return pageObject
      .evaluate(() => {
        const principalInput = document.querySelector(
          "input[name='principal']"
        );
        const interestRateInput = document.querySelector(
          "input[name='interestRate']"
        );
        const loanTermInput = document.querySelector("input[name='loanTerm']");
        return {
          principal: principalInput !== null,
          interestRate: interestRateInput !== null,
          loanTerm: loanTermInput !== null,
        };
      })
      .then((inputs) => {
        expect(inputs.principal).to.be.true;
        expect(inputs.interestRate).to.be.true;
        expect(inputs.loanTerm).to.be.true;
      });
  });

  it("should contain a <p> element with id 'output' for displaying the result", () => {
    return pageObject
      .evaluate(() => document.getElementById("output") !== null)
      .then((outputExists) => {
        expect(outputExists).to.be.true;
      });
  });

  it("should contain an <option> element with value '12' in the select dropdown", () => {
    return pageObject
      .evaluate(() => {
        const options = document.querySelectorAll("select option");
        return Array.from(options).some((option) => option.value === "12");
      })
      .then((optionExists) => {
        expect(optionExists).to.be.true;
      });
  });

  it("should contain an <option> element with value '4' in the select dropdown", () => {
    return pageObject
      .evaluate(() => {
        const options = document.querySelectorAll("select option");
        return Array.from(options).some((option) => option.value === "4");
      })
      .then((optionExists) => {
        expect(optionExists).to.be.true;
      });
  });

  it("should correctly calculate mortgage", () =>
    pageObject
      .wait()
      .type("input[name=principal]", 300000)
      .type("input[name=interestRate]", 3.75)
      .type("input[name=loanTerm]", 30)
      .select("select[name=period]", 12)
      .click("button#calculate")
      .wait("#output")
      .evaluate(() => document.querySelector("#output").innerText)
      .then((outputText) => {
        expect(outputText).to.equal("$1389.35");
      })).timeout(6500);
});
