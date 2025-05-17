import { faker } from '@faker-js/faker';

const options = { env: { snapshotOnly: true } };

describe('Set label on issue', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    };
    const label = {
        name: `label-${faker.datatype.uuid()}`,
        color: '#ffaabb'
    }

    beforeEach(() => {
        cy.apiDeleteAllProjects();
        cy.login();
        cy.apiCreateIssue(issue).then(response => {
            cy.apiCreateLabel(response.body.project_id, label);
            cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`);
        });
    });

    it('successfully', () => {
        cy.guiSetLabelOnIssue(label);
        cy.get('.label').should('have.text', label.name).and('have.attr', 'style', `background-color: ${label.color}; color: #333333;`);
    })
});