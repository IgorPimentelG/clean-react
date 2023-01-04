import faker from 'faker'
import * as Helper from '../../support/form-helper';

type HttpMethod = 'GET' | 'PUT';

type MockSurveyResultParams = {
    method: HttpMethod;
    statusCode: number;
}

const mockSurveyResult = ({ method, statusCode }: MockSurveyResultParams): void => {
    cy.fixture('survey-result.json').then((fakeResponse) => {
        cy.intercept(
            method,  
            `${Cypress.env("api")}/surveys/*/results`, 
            { 
                statusCode: statusCode,
                body: fakeResponse
            }
        ).as('request');
    });
}

describe('SurveyResult', () => {
    describe('load', () => {
        beforeEach(() => {
            cy.setAccount(faker.name.findName(), faker.random.uuid());
        });

        it('Should present error on UnexpectedError', () => {
            mockSurveyResult({ method: 'GET', statusCode: 400 });
            cy.visit('/survey/any_id');
            cy.wait('@request').then(() => {
                cy.getByTestId('error')
                    .should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.');
            });
        });
    
        it('Should reload on button click', () => {
            mockSurveyResult({ method: 'GET', statusCode: 400 });
            cy.visit('/survey/any_id');
            cy.wait('@request').then(() => {
                cy.getByTestId('error')
                    .should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.');
                mockSurveyResult({ method: 'GET', statusCode: 200 });
                cy.getByTestId('reload').click();
            });
            cy.wait('@request').then(() => {
                cy.getByTestId('question').should('exist');
            });
        });
    
        it('Should logout on AccessDeniedError', () => {
            mockSurveyResult({ method: 'GET', statusCode: 403 });
            cy.visit('/survey/any_id');
            Helper.testUrl('/login');
        });
    
        it('Should present survey result', () => {
            mockSurveyResult({ method: 'GET', statusCode: 200 });
            cy.visit('/survey/any_id');
            cy.wait('@request').then(() => {
                cy.getByTestId('question').should('have.text', 'Question');
                cy.getByTestId('day').should('have.text', '03');
                cy.getByTestId('month').should('have.text', 'fev');
                cy.getByTestId('year').should('have.text', '2018');
                cy.get('li:nth-child(1)').then(li => {
                    assert.equal(li.find('[data-testid="answer"]').text(), 'any answer 1');
                    assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image');
                    assert.equal(li.find('[data-testid="percent"]').text(), '70%');
                });
                cy.get('li:nth-child(2)').then(li => {
                    assert.equal(li.find('[data-testid="answer"]').text(), 'any answer 2');
                    assert.notExists(li.find('[data-testid="image"]'));
                    assert.equal(li.find('[data-testid="percent"]').text(), '30%');
                });
            });
        });
    
        it('Should logout ', () => {
            mockSurveyResult({ method: 'GET', statusCode: 200 });
            cy.visit('/survey-list');
            cy.visit('/survey/any_id');
            cy.getByTestId('back-button').click();
            cy.wait('@request').then(() => {
                Helper.testUrl('/survey-list');
            });
        });
    });

    describe('save', () => {
        beforeEach(() => {
            cy.setAccount(faker.name.findName(), faker.random.uuid());
            mockSurveyResult({ method: 'GET', statusCode: 200 });
            cy.visit('/survey/any_id');
        });

        it('Should present error on UnexpectedError', () => {
            mockSurveyResult({ method: 'PUT', statusCode: 400 });
            cy.get('li:nth-child(2)').click();
            cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.');
        });

        it('Should logout on AccessDeniedError', () => {
            mockSurveyResult({ method: 'PUT', statusCode: 403 });
            cy.get('li:nth-child(2)').click();
            Helper.testUrl('/login');
        });

        it('Should save survey result', () => {
            mockSurveyResult({ method: 'PUT', statusCode: 200 });
            cy.get('li:nth-child(2)').click();
            cy.wait('@request').then(() => {
                cy.getByTestId('question').should('have.text', 'Question');
                cy.getByTestId('day').should('have.text', '03');
                cy.getByTestId('month').should('have.text', 'fev');
                cy.getByTestId('year').should('have.text', '2018');
                cy.get('li:nth-child(1)').then(li => {
                    assert.equal(li.find('[data-testid="answer"]').text(), 'any answer 1');
                    assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image');
                    assert.equal(li.find('[data-testid="percent"]').text(), '70%');
                });
                cy.get('li:nth-child(2)').then(li => {
                    assert.equal(li.find('[data-testid="answer"]').text(), 'any answer 2');
                    assert.notExists(li.find('[data-testid="image"]'));
                    assert.equal(li.find('[data-testid="percent"]').text(), '30%');
                });
            });
        });
    });
})