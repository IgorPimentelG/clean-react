import faker from "faker"
import * as FormHelper from "../../support/form-helper";

const simulateValidSubmit = (): void => {
    const password = faker.random.alphaNumeric(5);
    cy.getByTestId("name").focus().type(faker.name.findName());
    cy.getByTestId("email").focus().type(faker.internet.email());
    cy.getByTestId("password").focus().type(password);
    cy.getByTestId("passwordConfirmation").focus().type(password);
}

describe("SignUp", () => {
    beforeEach(() => {
        cy.visit("signup");
    })

    it("Should load with correct initial state", () => {
        cy.getByTestId("name").should("have.attr", "readOnly");
        FormHelper.testInputStatus("name", "Campo obrigatório");
        cy.getByTestId("email").should("have.attr", "readOnly");
        FormHelper.testInputStatus("email", "Campo obrigatório");
        cy.getByTestId("password").should("have.attr", "readOnly");
        FormHelper.testInputStatus("password", "Campo obrigatório");
        cy.getByTestId("passwordConfirmation").should("have.attr", "readOnly");
        FormHelper.testInputStatus("passwordConfirmation", "Campo obrigatório");
        cy.getByTestId("submit").should("have.attr", "disabled");
    });

    it("Should reset state on page load", () => {
        cy.getByTestId("email").focus().type(faker.internet.email());
        FormHelper.testInputStatus("email");
        cy.getByTestId("login-link").click();
        cy.getByTestId("signup-link").click();
        FormHelper.testInputStatus("email", "Campo obrigatório");
    });

    it("Should present error state if form is invalid", () => {
        cy.getByTestId("email").focus().type(faker.random.alphaNumeric(4));
        FormHelper.testInputStatus("email", "Valor Inválido");
        cy.getByTestId("password").focus().type(faker.random.alphaNumeric(4));
        FormHelper.testInputStatus("password", "Valor Inválido");
        cy.getByTestId("passwordConfirmation").focus().type(faker.random.alphaNumeric(3));
        FormHelper.testInputStatus("passwordConfirmation", "Valor Inválido");
        cy.getByTestId("submit").should("have.attr", "disabled");
    });

    it("Should present valid state if form is valid", () => {
        simulateValidSubmit();
        FormHelper.testInputStatus("name");
        FormHelper.testInputStatus("email");
        FormHelper.testInputStatus("password");
        FormHelper.testInputStatus("passwordConfirmation");
        cy.getByTestId("submit").should("not.have.attr", "disabled");
    });

    it("Should present EmailInUseError on 403", () => {
        cy.intercept("POST", `${Cypress.env("api")}/signup`, { 
            statusCode: 403,
        });

       simulateValidSubmit();
       cy.getByTestId("submit").click();
       FormHelper.testMainError("Esse e-mail já está em uso");
       FormHelper.testUrl("/signup");
    });

    it("Should present UnexpectedError on default error cases", () => {
        cy.intercept("POST", `${Cypress.env("api")}/signup`, { 
            statusCode: 400,
        });

       simulateValidSubmit();
       cy.getByTestId("submit").click();
       FormHelper.testMainError("Algo de errado aconteceu. Tente novamente em breve.");
       FormHelper.testUrl("/signup");
    });

    it("Should present save accessToken if valid credentials are provided", () => {
        cy.intercept("POST", `${Cypress.env("api")}/signup`, { 
            statusCode: 200,
            body: {
                name: faker.name.findName(),
                accessToken: faker.random.uuid()
            }
        }).as("request");

       simulateValidSubmit();
       cy.getByTestId("submit").click();

       cy.wait("@request").then(() => {
           cy.window().then(window => assert.isOk(window.localStorage.getItem("account")));
           FormHelper.testUrl("/login");
       });
    });

    it("Should prevent multiple submits", () => {
        cy.intercept("POST", `${Cypress.env("api")}/signup`, { 
            statusCode: 200,
            body: {
                name: faker.name.findName(),
                accessToken: faker.random.uuid()
            }
        }).as("request");

        simulateValidSubmit();
        cy.getByTestId("submit").dblclick();
        cy.get("@request.all").should("have.length", 1);
    });

    it("Should not call submit if form is invalid", () => {
        cy.intercept("POST", `${Cypress.env("api")}/signup`, { 
            statusCode: 200,
            body: {
                name: faker.name.findName(),
                accessToken: faker.random.uuid()
            }
        }).as("request");

        cy.getByTestId("email").focus().type(faker.internet.email()).type("{enter}");
        cy.get("@request.all").should("have.length", 0);
    });
})