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



Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (formData) => {
    const defaFormData = {
        testFirstName: "George",  
        testLastName: "Jungle",  
        testEmail: "george.jujujungle@gmail.com",  
        testFeedback: "all is cool and nothing extra can be said about what was decided even thou that definitely can't be called cool"
    }
    
        cy.get('input[type=text][name=firstName]')
        .type(formData?.testFirstName ?? defaFormData.testFirstName);
        
        cy.get('input[type=text][name=lastName]')
        .type(formData?.testLastName ?? defaFormData.testLastName);
        
        cy.get('input[type=email][name=email]')
        .type(formData?.testEmail ?? defaFormData.testEmail);
    
        cy.get('textarea[name=open-text-area]')
        .type(formData?.testFeedback ?? defaFormData.testFeedback, {delay: 0});
    
        // cy.get('button[type=submit]').click();
        cy.contains('button','Send').click()

})