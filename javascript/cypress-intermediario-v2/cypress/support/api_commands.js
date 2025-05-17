// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const authorization = `Bearer ${Cypress.env('gitlab_access_token')}`;

Cypress.Commands.add('apiCreateProject', (project) => {
    cy.api({
        method: 'POST',
        url: '/api/v4/projects',
        headers: {
            'Authorization': authorization
        },
        body: {
            name: project.name,
            description: project.description,
            initialize_with_readme: true
        }
    });
});

Cypress.Commands.add('apiGetAllProjects', () => {
    cy.api({
        method: 'GET',
        url: '/api/v4/projects',
        headers: {
            'Authorization': authorization
        }
    });
});

Cypress.Commands.add('apiDeleteAllProjects', () => {
    cy.apiGetAllProjects().then((response) => {
        const projects = response.body;
        projects.forEach((project) => {
            cy.api({
                method: 'DELETE',
                url: `/api/v4/projects/${project.id}`,
                headers: {
                    'Authorization': authorization
                }
            });
        });
    });
});

Cypress.Commands.add('apiCreateIssue', (issue) => {
    cy.apiCreateProject(issue.project).then((response) => {
        cy.request({
            method: 'POST',
            url: `/api/v4/projects/${response.body.id}/issues`,
            body: {
                title: issue.title,
                description: issue.description
            },
            headers: { 'Authorization': authorization }
        });
    });
});

Cypress.Commands.add('apiCreateLabel', (projectId, label) => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/${projectId}/labels`,
        body: {
            name: label.name,
            color: label.color
        },
        headers : { 'Authorization': authorization }
    });
});

Cypress.Commands.add('apiCreateMilestone', (projectId, milestone) => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/${projectId}/milestones`,
        body: {
            title: milestone.title
        },
        headers : { 'Authorization': authorization }
    });
});