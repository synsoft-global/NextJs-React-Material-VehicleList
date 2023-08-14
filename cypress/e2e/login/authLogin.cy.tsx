// cypress/integration/react_test.spec.js
import example from '../../fixtures/example.json'

// describe('React Tests', () => {
//   const username = 'parmanandpatel.synsoft@gmail.com';
//   const password = '123456';

//   beforeEach(() => {
//     cy.visit('http://localhost:3001/login');
//     cy.get('.my-email-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input')
//         .as('usernameInput');
//     cy.get('.my-password-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input')
//       .as('passwordInput');
//     cy.get('.MuiButtonBase-root.css-w2u87x-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root')
//       .contains('Sign In')
//       .as('loginButton');
//   });

//   it('should retrieve data via GET request', () => {
//     cy.visit('http://localhost:3001/login');

//     cy.get('@usernameInput').type(username);
//     cy.get('@passwordInput').type(password);
//     cy.get('@loginButton').click();

//     cy.intercept('POST', 'http://192.168.0.97:8000/auth/login', { 
//       fixture:'example.json',
//       statusCode: 200,
//     }).as('postRequest');

//     cy.wait('@postRequest', {timeout: 10000}).its('response.statusCode').should('equal', 200);
//   });
// });

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
    })  
  })
  it('should retrieve data via GET request', () => {
    cy.visit('http://localhost:3001');
    const title = 'Dashboard'
    cy.get('.MuiTypography-root.css-zie486-MuiTypography-root').should('have.text', title);
  });
})
