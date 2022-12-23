import faker from "faker";
import * as FormHelper from "../../support/form-helper";

const baseUrl: string = Cypress.config().baseUrl;

describe("Login", () => {
    beforeEach(() => {
        cy.visit("/login");
    });

    it("Should load with correct initial state", () => {
        cy.getByTestId("email").should("have.attr", "readOnly");
        FormHelper.testInputStatus("email", "Campo obrigatório");
        cy.getByTestId("password").should("have.attr", "readOnly");
        FormHelper.testInputStatus("password", "Campo obrigatório");
        cy.getByTestId("submit").should("have.attr", "disabled");
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });

    it("Should present error state if form is invalid", () => {
        cy.getByTestId("email").focus().type(faker.random.word());
        FormHelper.testInputStatus("email", "Valor Inválido");
        cy.getByTestId("password").focus().type(faker.random.alphaNumeric(4));
        FormHelper.testInputStatus("email", "Valor Inválido");
        cy.getByTestId("submit").should("have.attr", "disabled");
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });

    it("Should present valid state if form is valid", () => {
        cy.getByTestId("email").focus().type(faker.internet.email());
        FormHelper.testInputStatus("email");
        cy.getByTestId("password").focus().type(faker.random.alphaNumeric(6));
        FormHelper.testInputStatus("password");
        cy.getByTestId("submit").should("not.have.attr", "disabled");
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });

    it("Should present InvalidCredentailsError on 401", () => {
        cy.intercept("POST", `${Cypress.env("api")}/login`, { 
            statusCode: 401,
        });

        cy.getByTestId("email").focus().type(faker.internet.email());
        cy.getByTestId("password").focus().type(faker.random.alphaNumeric(6));
        cy.getByTestId("submit").click();
        FormHelper.testMainError("Credenciais inválidas");
        FormHelper.testUrl("/login");
    });

      it("Should present InvalidCredentailsError on 400", () => {
        cy.intercept("POST", `${Cypress.env("api")}/login`, { 
            statusCode: 400,
        });

        cy.getByTestId("email").focus().type(faker.internet.email());
        cy.getByTestId("password").focus().type(faker.random.alphaNumeric(6));
        cy.getByTestId("submit").click();
        FormHelper.testMainError("Algo de errado aconteceu. Tente novamente em breve.");
        FormHelper.testUrl("/login");
    });

    it("Should present save accessToken if valid credentails are provided", () => {
        cy.intercept("POST", `${Cypress.env("api")}/login`, { 
            statusCode: 200,
            body: {
                accessToken: faker.random.uuid()
            }
        });

        cy.getByTestId("email").focus().type(faker.internet.email());
        cy.getByTestId("password").focus().type(faker.random.alphaNumeric(6));
        cy.getByTestId("submit").click();
        cy.getByTestId("error-wrap")
            .getByTestId("spinner").should("exist")
            .getByTestId("error").should("not.exist")
            .getByTestId("spinner").should("not.exist")
        FormHelper.testUrl("/login");
        cy.window().then(window => assert.isOk(window.localStorage.getItem("accessToken")));
    });

    it("Should present UnexpectedError if invalid data is returned", () => {
        cy.intercept("POST", `${Cypress.env("api")}/login`, { 
            statusCode: 200,
            body: {
                invalidProperty: faker.random.uuid()
            }
        });

        cy.getByTestId("email").focus().type(faker.internet.email());
        cy.getByTestId("password").focus().type(faker.random.alphaNumeric(6));
        cy.getByTestId("submit").click();
        FormHelper.testMainError("Algo de errado aconteceu. Tente novamente em breve.");
        FormHelper.testUrl("/login");
    });

    it("Should prevent multiple submits", () => {
        cy.intercept("POST", `${Cypress.env("api")}/login`, { 
            statusCode: 200,
            body: {
                accessToken: faker.random.uuid()
            }
        }).as("request");

        cy.getByTestId("email").focus().type(faker.internet.email());
        cy.getByTestId("password").focus().type(faker.random.alphaNumeric(5));
        cy.getByTestId("submit").dblclick();
        cy.get("@request.all").should("have.length", 1);
    });

    it("Should not call submit if form is invalid", () => {
        cy.intercept("POST", `${Cypress.env("api")}/login`, { 
            statusCode: 200,
            body: {
                accessToken: faker.random.uuid()
            }
        }).as("request");

        cy.getByTestId("email").focus().type(faker.internet.email()).type("{enter}");
        cy.get("@request.all").should("have.length", 0);
    });
})