/// <reference types="Cypress" />

context('register', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('register scenario', () => {
        cy.get('.Header__HeaderStyled-sc-18vx0c1-0 > :nth-child(1)').click()
      cy.get('[href="/signUp"]').click()
      cy.get('.lozDkG > :nth-child(1) > input').type('Dolmetscher')
      cy.get('.lozDkG > :nth-child(2) > input').type('Vermittlung')
   //   cy.get('input[type=checkbox]').click()
      cy.get('.sc-AykKF > path').click()
      cy.get('.lozDkG > :nth-child(1) > input').type('0123456')
      cy.get('input[type=email]').type('dolmetscher@vermittlung.de')
      cy.get('.lozDkG > :nth-child(3) > input').type('1234')
      cy.get('.lozDkG > :nth-child(4) > input').type('1234')
  //    cy.get('.sc-AykKF > path').click()
   //   cy.get('.css-1hwfws3').type('polnisch')
   cy.get('button[type=submit]').should('contain', 'Registrieren').click()
    })
  })
  