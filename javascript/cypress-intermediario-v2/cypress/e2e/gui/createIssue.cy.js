import { faker } from '@faker-js/faker';

const options = { env: {snapshotOnly: true }}

describe('Create Issue', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    beforeEach(() => {
        cy.apiDeleteAllProjects();
        cy.apiCreateProject(issue.project);
        cy.login();
    });

  it('successfully', () => {
    cy.guiCreateIssue(issue);
    cy.contains(issue.title).should('be.visible');
    cy.contains(issue.description).should('be.visible');
  });
});