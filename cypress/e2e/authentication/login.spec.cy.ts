import faker from "faker"

const baseUrl: string = Cypress.config().baseUrl;

describe("Login", () => {
    beforeEach(() => {
        cy.visit("/login");
    });

    it("Should load with correct initial state", () => {
        cy.getByTestId("email").should("have.attr", "readOnly");
        cy.getByTestId("email-status")
            .should("have.attr", "title", "Campo obrigatório")
            .should("contain.text", "🔴");
        cy.getByTestId("password").should("have.attr", "readOnly");
        cy.getByTestId("password-status")
            .should("have.attr", "title", "Campo obrigatório")
            .should("contain.text", "🔴");;
        cy.getByTestId("submit").should("have.attr", "disabled");
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });

    it("Should present error state if form is invalid", () => {
        cy.getByTestId("email").focus().type(faker.random.word());
        cy.getByTestId("email-status")
            .should("have.attr", "title", "Valor Inválido")
            .should("contain.text", "🔴");
        cy.getByTestId("password").focus().type(faker.random.alphaNumeric(3));
        cy.getByTestId("password-status")
            .should("have.attr", "title", "Valor Inválido")
            .should("contain.text", "🔴");
        cy.getByTestId("submit").should("have.attr", "disabled");
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });

    it("Should present valid state if form is valid", () => {
        cy.getByTestId("email").focus().type(faker.internet.email());
        cy.getByTestId("email-status")
            .should("have.attr", "title", "Tudo certo!")
            .should("contain.text", "🟢");
        cy.getByTestId("password").focus().type(faker.random.alphaNumeric(6));
        cy.getByTestId("password-status")
            .should("have.attr", "title", "Tudo certo!")
            .should("contain.text", "🟢");
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
        cy.getByTestId("error-wrap")
            .getByTestId("spinner").should("exist")
            .getByTestId("error").should("not.exist")
            .getByTestId("spinner").should("not.exist")
            .getByTestId("error").should("contain.text", "Credenciais inválidas");
        cy.url().should('eq', `${baseUrl}/login`);
    });

      it("Should present InvalidCredentailsError on 400", () => {
        cy.intercept("POST", `${Cypress.env("api")}/login`, { 
            statusCode: 400,
        });

        cy.getByTestId("email").focus().type(faker.internet.email());
        cy.getByTestId("password").focus().type(faker.random.alphaNumeric(6));
        cy.getByTestId("submit").click();
        cy.getByTestId("error-wrap")
            .getByTestId("spinner").should("exist")
            .getByTestId("error").should("not.exist")
            .getByTestId("spinner").should("not.exist")
            .getByTestId("error").should("contain.text", "Algo de errado aconteceu. Tente novamente em breve.");
        cy.url().should('eq', `${baseUrl}/login`);
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
        cy.url().should('eq', `${baseUrl}/login`);
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
        cy.getByTestId("error-wrap")
            .getByTestId("spinner").should("exist")
            .getByTestId("error").should("not.exist")
            .getByTestId("spinner").should("not.exist")
            .getByTestId("error").should("contain.text", "Algo de errado aconteceu. Tente novamente em breve.");
        cy.url().should('eq', `${baseUrl}/login`);
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