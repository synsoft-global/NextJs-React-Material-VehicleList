// cypress/integration/react_test.spec.js
import example from '../../fixtures/example.json'

describe('React Tests', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'http://192.168.0.97:4000/auth/login',
      body: {
        email: 'parmanandpatel.synsoft@gmail.com',
        password: '12345678'
      }     
    }).then((response) => {
      // cy.log('response', response)
      cy.log('response.body.token', response.body.token)
      const authToken = response.body.token;
      cy.setCookie('token', authToken);
    });
    cy.visit('http://localhost:3001/organization-management/add');

    
      cy.get('#my-company-field').as('companyFieldName');

      cy.get('.my-currency-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input')
      .as('currencySelect');
      cy.get('#my-address-field').as('companyAddressInput');

      cy.get('.my-country-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input')
      .as('countryInput');
      cy.get('.my-state-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input')
      .as('stateInput');

      cy.get('#my-city-field').as('cityInput');
      cy.get('#my-zip-field').as('zipInput');
      cy.get('#my-firstName-field') .as('firstName');
      cy.get('#my-lastName-field').as('lastName');
      cy.get('#my-email-field').as('emailInput');
      cy.get('#my-phone-field').as('phoneInput');
      cy.get('#my-password-field').as('passwordInput');
      cy.get('#my-confirmPassword-field').as('confirmPasswordInput');
      cy.get('#my-Acknowledge-field').as('checkedInput');

      cy.get('[type="submit"]')
        .contains('Save')
        .as('saveButton');
  });

  const firstName = 'demo';
  const lastName = 'user';
  const emailInput = 'usertest@gmail.com';
  const phoneInput = '9632587401';
  const passwordInput = 'abcd@123456';
  const confirmPasswordInput = 'abcd@123456';
  const companyFieldName = 'synsoft!';
  const currencySelect = 'ruppe';
  const companyAddressInput = 'Vijaynagar, Indore!';
  const countryInput = 'Afghanistan';
  const stateInput = 'Badakhshan';
  const cityInput = 'Indore';
  const zipInput = '963258';

  it('should retrieve data via GET request', () => {
    // cy.server(); // start a new server to intercept all API requests
    cy.intercept('POST', 'http://192.168.0.38:4000/api#/Agency-vehicle/AgencyVehicleController_update', { 
    fixture:'example.json',
    statusCode: 200,
    // cors: true // add this option to enable CORS headers
  }).as('postRequest');

  cy.visit('http://localhost:3001/organization-management/add');
    cy.get('@companyFieldName').type(companyFieldName);

    cy.get('@currencySelect').type(currencySelect);
    cy.contains(currencySelect).click();

    cy.get('@companyAddressInput').type(companyAddressInput);

    cy.get('@countryInput').type(countryInput);
    cy.contains(countryInput).click();

    cy.get('@stateInput').type(stateInput);
    cy.contains(stateInput).click();

    cy.get('@cityInput').type(cityInput);
    cy.get('@zipInput').type(zipInput);
    cy.get('@firstName').type(firstName);
    cy.get('@lastName').type(lastName);
    cy.get('@emailInput').type(emailInput);
    cy.get('@phoneInput').type(phoneInput);
    cy.get('@passwordInput').type(passwordInput);
    cy.get('@confirmPasswordInput').type(confirmPasswordInput);

    // cy.get('@checkedInput').click();
    cy.get('@saveButton').click();

    cy.wait('@postRequest', {timeout: 10000}).its('response.statusCode').should('equal', 200);

    // cy.visit(`http://localhost:3001/verify-otp?email=${emailInput}`);
  });

  it('should retrieve data via GET request', () => {
    cy.visit(`http://localhost:3001/organization-management`);
    cy.intercept('GET', 'http://192.168.0.97:4000/organizations/list', { 
      fixture:'getVehCategory.json',
      statusCode: 200,
    }).as('getRequest');

    cy.wait('@getRequest').its('response.statusCode').should('equal', 200);
  })
});
