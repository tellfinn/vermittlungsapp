/// <reference types="Cypress" />

context('open menu', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('input[type=email]').type('dolmetscher@vermittlung.de')
    cy.get('input[type=password]').type('1234')
    cy.get('button[type=submit]')
      .should('contain', 'einloggen')
      .click()
  })

  it('open menu', () => {
    cy.get('.Header__HeaderStyled-sc-18vx0c1-0 > :nth-child(1)').click()
    cy.get('[href]').should('have.length', 5)
  })
})
