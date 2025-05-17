import { faker } from '@faker-js/faker'

const options = { env: {snapshotOnly: true }}

describe('Create Project', options, () => {
    before(() => {
        cy.apiDeleteAllProjects();
    });

    it('successfully', () => {
        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
        cy.apiCreateProject(project).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq(project.name);
            expect(response.body.description).to.eq(project.description);
        });
    });
});