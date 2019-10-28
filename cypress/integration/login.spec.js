/// <reference types="Cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('login scenario', () => {
    cy.get('input[type=email]').type('alexandra@nowak.de')
    cy.get('input[type=password]').type('1234')
    cy.get('button[type=submit]')
      .should('contain', 'einloggen')
      .click()
  })
})
