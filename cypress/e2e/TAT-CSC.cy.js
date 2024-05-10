
// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })


describe('TAT Customer Service Center', () => {

  beforeEach(() => {
    cy.visit('./src/index.html');
  })


  it('checks the application title', () => {
    const titleText = "TAT Customer Service Center";

    cy.title()
      .should('eq',titleText)
      .and('not.eq',titleText+'6');
  })


  it('fills in the required fields and submits the form', () => {
    
    const [
      testFirstName, 
      testLastName, 
      testEmail, 
      testFeedback
    ] = [
      "George", 
      "Jungle", 
      "george.jujujungle@gmail.com", 
      "all is cool and nothing extra can be said about what was decided even thou that definitely can't be called cool"
    ]

    cy.get('input[type=text][name=firstName]')
      .as('firstName')
      .type(testFirstName);
    
    cy.get('input[type=text][name=lastName]')
      .as('lastName')
      .type(testLastName);
    
    cy.get('input[type=email][name=email]')
      .as('emailAddress')
      .type(testEmail);

    cy.get('textarea[name=open-text-area]')
      .as('feedback')
      .type(testFeedback, {delay: 0});


    cy.get('@firstName')
      .should('be.visible')
      .and('have.value',testFirstName);

    cy.get('@lastName')
      .should('be.visible')
      .and('have.value',testLastName);

    cy.get('@emailAddress')
      .should('be.visible')
      .and('have.value',testEmail);

    cy.get('@feedback')
      .should('be.visible')
      .and('have.value',testFeedback);


    // cy.get('button[type=submit]').click();
    cy.contains('button','Send').click()

    cy.get('.success').should('be.visible');

  })


  it('displays an error message when submitting the form with an email with invalid formatting', () => {

    const [
      testFirstName, 
      testLastName, 
      testEmail, 
      testFeedback
    ] = [
      "George", 
      "Jungle", 
      "george.jujujungle@gmail-com", 
      "all is cool and nothing extra can be said about what was decided even thou that definitely can't be called cool"
    ]

    cy.get('input[type=text][name=firstName]')
      .type(testFirstName)
      .should('be.visible')
      .and('have.value',testFirstName);
    
    cy.get('input[type=text][name=lastName]')
      .type(testLastName)
      .should('be.visible')
      .and('have.value',testLastName);
    
    cy.get('input[type=email][name=email]')
      .type(testEmail)
      .should('be.visible')
      .and('have.value',testEmail);

    cy.get('textarea[name=open-text-area]')
      .type(testFeedback, {delay: 0})
      .should('be.visible')
      .and('have.value',testFeedback);

    // cy.get('button[type=submit]').click();
    cy.contains('button','Send').click()

    cy.get('.error').should('be.visible');

  })


  it('validate phone field only accepts numbers', () => {

    cy.get('input[type=number][name=phone]')
      .should('be.visible')
      .type('abc')
      .should('be.empty')
      .type('123')
      .should('have.value', '123')

  })


  it('displays an error message when the phone becomes required but is not filled in before the form submission', () => {

    const [
      testFirstName, 
      testLastName, 
      testEmail, 
      testFeedback
    ] = [
      "George", 
      "Jungle", 
      "george.jujujungle@gmail.com", 
      "all is cool and nothing extra can be said about what was decided even thou that definitely can't be called cool"
    ]

    cy.get('input[type=text][name=firstName]').type(testFirstName)
    cy.get('input[type=text][name=lastName]').type(testLastName)
    cy.get('input[type=email][name=email]').type(testEmail)
    cy.get('textarea[name=open-text-area]').type(testFeedback, {delay: 0})

    cy.get('input[type=checkbox][name=phone]')
      .check()
      .should('be.checked')

    cy.get('input[type=number][name=phone]')
      .as('phoneInput')
      .should('be.visible')
      .and('have.attr', 'required')
      .then( function() {

        cy.get('@phoneInput')
          .clear()
          // .type('07234345543')

        // cy.get('button[type=submit]').click()
        cy.contains('button','Send').click()
        cy.get('.error').should('be.visible')
      } )

  })


  it('fills and clears the first name, last name, email, and phone fields', () => {

    const [
      testFirstName, 
      testLastName, 
      testEmail, 
      testPhone
    ] = [
      "George", 
      "Jungle", 
      "george.jujujungle@gmail.com", 
      "07234123123"
    ]

    cy.get('input[type=text][name=firstName]')
      .type(testFirstName).should('have.value', testFirstName)
      .clear().should('be.empty')
    
    cy.get('input[type=text][name=lastName]')
      .type(testLastName).should('have.value', testLastName)
      .clear().should('be.empty')
    
    cy.get('input[type=email][name=email]')
      .type(testEmail).should('have.value', testEmail)
      .clear().should('be.empty')
    
    cy.get('input[type=number][name=phone]')
      .type(testPhone).should('have.value', testPhone)
      .clear().should('be.empty')

  })


  it('displays an error message when submitting the form without filling the required fields', () => {

    // cy.get('button[type=submit]').click()
    cy.contains('button','Send').click()
    cy.get('.error').should('be.visible')

  })


  it('successfully submits the form using a custom command', () => {

    cy.fillMandatoryFieldsAndSubmit({
      testFirstName: "Jane",  
      testLastName: "Wesminton",  
      testFeedback: " "
    })

    cy.get('.success').should('be.visible');    

  })


  // // exercise 8
  // it.only('successfully submits the form using a custom command', () => {

  // })


})
