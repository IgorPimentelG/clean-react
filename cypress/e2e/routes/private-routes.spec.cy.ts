import * as FormHelper from "../../support/form-helper";

describe('Privete Routes', () => {
    it('Should logout if survey-list has no token', () => {
        cy.visit('/survey-list')
        FormHelper.testUrl('/login')
    })
})