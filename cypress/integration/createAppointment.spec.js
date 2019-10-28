/// <reference types="Cypress" />

context('create appointment', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('input[type=email]').type('dolmetscher@vermittlung.de')
    cy.get('input[type=password]').type('1234')
    cy.get('button[type=submit]')
      .should('contain', 'einloggen')
      .click()
    cy.get('.Header__HeaderStyled-sc-18vx0c1-0 > :nth-child(1)').click()
  })

  it('create new appointment', () => {
    cy.get('[href="/newAppointment"]').click()
    cy.get(':nth-child(1) > .css-yk16xz-control > .css-1hwfws3').type(
      'polnisch'
    )
    cy.get('.sc-AykKF').click()
    cy.get('.sc-AykKF').click()
    cy.get('.sc-AykKE').click()
    cy.get(':nth-child(5) > .react-datepicker__day--030').click()
    cy.get(':nth-child(55)').click()
    cy.get('input[name=duration]').type('0.5')
    cy.get('.sc-AykKF').click()
    cy.get('.sc-AykKC > :nth-child(2)').click()
    cy.get('input[name=station]').type('I3')
    cy.get('input[name=contact]').type('Sabrina')
    cy.get('input[name=extension]').type('123')
    cy.get('.sc-AykKF').click()
    cy.get('textarea[name=message]').type('Sozialdienst')
    // cy.get('button[style="background-color: var(--green);"]').click()
    cy.get(
      '.Header__HeaderStyled-sc-18vx0c1-0 > :nth-child(2) > #Capa_1'
    ).click()
  })
})
