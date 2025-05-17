import { faker } from '@faker-js/faker';

describe('git clone', () => {
    const project = {
        name: faker.datatype.uuid(),
        description: faker.random.words(5)
    }
    beforeEach(() => {
        cy.apiDeleteAllProjects();
        cy.apiCreateProject(project);
    });
    it('successfully', () => {
        cy.cloneViaSSH(project);
        cy.readFile(`cypress/downloads/${project.name}/README.md`)
            .should('contain', `# ${project.name}`)
            .and('contain', project.description);
    });
});