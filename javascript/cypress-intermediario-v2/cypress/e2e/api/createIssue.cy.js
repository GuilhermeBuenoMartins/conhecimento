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
    });

  it('successfully', () => {
    cy.apiCreateIssue(issue).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal(issue.title);
        expect(response.body.description).to.equal(issue.description);
    });
  });
});