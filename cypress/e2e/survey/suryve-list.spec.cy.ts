import * as Helper from "../../support/form-helper";
import faker from 'faker'

const mockSurveys = (stateCode: number): void => {
    cy.intercept(
        'GET',  
        `${Cypress.env("api")}/surveys`,
        { statusCode: stateCode }
    ).as('request');
}

describe('Privete Routes', () => {
    beforeEach(() => {
        cy.setAccount(faker.name.findName(), faker.random.uuid());
    });

    it('Should present error on UnexpectedError', () => {
        mockSurveys(500)
        cy.visit('/survey-list');
        cy.wait('@request').then(() => {
            cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.');
        })
    });

    it('Should logout on AccessDeniedError', () => {
        mockSurveys(403);
        cy.visit('/survey-list');
        Helper.testUrl('/login');
    })

    it('Should present correct username', () => {
        const username = faker.name.findName();
        cy.setAccount(username, faker.random.uuid());
        mockSurveys(200);
        cy.visit('/survey-list');
        cy.getByTestId('username').should('contain.text', username)
    })

    it('Should on logout link click', () => {
        mockSurveys(200);
        cy.visit('/survey-list');
        cy.getByTestId('logout').click()
        Helper.testUrl('/login')
    })
})