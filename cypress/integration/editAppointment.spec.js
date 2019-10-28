/// <reference types="Cypress" />

context('render appointments', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('input[type=email]').type('alexandra@nowak.de')
    cy.get('input[type=password]').type('1234')
    cy.get('button[type=submit]')
      .should('contain', 'einloggen')
      .click()
    cy.get('.Header__HeaderStyled-sc-18vx0c1-0 > :nth-child(1)').click()
    cy.get('[href="/appointments"]').click()
  })

  it('renders appointment details', () => {
    cy.get(
      ':nth-child(2) > .Appointment__AppointmentStyled-sc-6q0wxb-0 > .InfoBtn__InfoBtnStyled-hxjl4j-0 > .InfoBtn__MoreIconStyled-hxjl4j-3'
    ).click()
    cy.get(
      '.AppointmentDetailsSettingsBar__SettingsIconStyled-sc-1v2sv3m-2'
    ).click()
    cy.get(
      '.AppointmentDetailsSettingsBar__EditIconStyled-sc-1v2sv3m-3'
    ).click()
    cy.get('.EditForm__EditFormStyled-sc-19a0fa-0 > :nth-child(1)').click()
    cy.get(':nth-child(2) > input').check()
    cy.get('input[name="duration"]')
      .clear()
      .type('4')
    cy.get('textarea')
      .clear()
      .type('AugenPoli')
    cy.get('.EditForm__EditFormStyled-sc-19a0fa-0').submit()
    cy.get('.InfoBtn__LessIconStyled-hxjl4j-4 > path').click()
  })
})
