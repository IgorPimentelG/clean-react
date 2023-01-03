import * as Helper from "../../support/form-helper";

describe('Privete Routes', () => {
    it('Should logout if survey-list has no token', () => {
        cy.visit('/survey-list');
        Helper.testUrl('/login');
    });

    it('Shousld logout if survey-result has no token', () => {
        cy.visit('/survey/1');
        Helper.testUrl('/login');
    });
})