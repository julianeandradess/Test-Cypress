/// <reference types='Cypress'/>

Cypress.Commands.add('Checkouts', (firstName, lastName, postalCode) =>{
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type(firstName) //type irá inserir os nomes
    cy.get('[data-test="lastName"]').type(lastName)
    cy.get('[data-test="postalCode"]').type(postalCode)
    cy.get('[data-test="continue"]').click()
})