import * as Helper from "../../support/form-helper";
import faker from 'faker'

const mockSurveys = (stateCode: number): void => {
    cy.fixture('survey-list.json').then((fakeResponse) => {
        cy.intercept(
            'GET',  
            `${Cypress.env("api")}/surveys`,
            { 
                statusCode: stateCode,
                body: fakeResponse
             }
        ).as('request');
    })
}

describe('SurveyList', () => {
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

    it('Should reload on button click', () => {
        mockSurveys(500);
        cy.visit('/survey-list');

        cy.wait('@request').then(() => {
            cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.');
            mockSurveys(200);
            cy.getByTestId('reload').click();
            cy.get('li:not(:empty)').should('have.length', 2);
        })
    });

    it('Should logout on AccessDeniedError', () => {
        mockSurveys(403);
        cy.visit('/survey-list');
        Helper.testUrl('/login');
    });

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
        cy.getByTestId('logout').click();
        Helper.testUrl('/login');
    })

    it('Should present survey items', () => {
        mockSurveys(200);
        cy.visit('/survey-list');
        cy.get('li:empty').should('have.length', 4);
        cy.get('li:not(:empty)').should('have.length', 2);
        cy.get('li:nth-child(1)').then((li) => {
            assert.equal(li.find('[data-testid="day"]').text(), '03');
            assert.equal(li.find('[data-testid="month"]').text(), 'fev');
            assert.equal(li.find('[data-testid="year"]').text(), '2018');
            assert.equal(li.find('[data-testid="question"]').text(), 'Question 1');
        })
    });;
})