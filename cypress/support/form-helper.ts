export const testInputStatus = (field: string, error?: string): void => {
    const attr = `${error ? "" : "not."}have.attr`;
    cy.getByTestId(field).should(attr, "title", error);
    cy.getByTestId(`${field}-label`).should(attr, "title", error);
    cy.getByTestId(`${field}-wrap`).should("have.attr", "data-status", error ? "invalid" : "valid");
}

export const testMainError = (message: string): void => {
    cy.getByTestId("error-wrap")
        .getByTestId("error").should("not.exist")
        .getByTestId("spinner").should("not.exist")
        .getByTestId("error").should("contain.text", message);
}

export const testUrl = (url: string): void => {
    const baseUrl: string = Cypress.config().baseUrl;
    cy.url().should('eq', `${baseUrl}${url}`);
}