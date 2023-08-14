// cypress/integration/react_test.spec.js
import example from '../fixtures/example.json'
import { Provider } from 'react-redux';
import { store } from '../../lib/redux/store/store'; 
import LoginFields from "@/pages/login/component/LoginForm/LoginForm.component";


describe('React Tests', () => {
  const username = 'parmanandpatel.synsoft@gmail.com';
  const password = '123456';

  beforeEach(() => {
    cy.wrap(<Provider store={store}><LoginFields /></Provider>).as('component');
    cy.mount(<Provider store={store}><LoginFields /></Provider>);
    cy.get('.my-email-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input')
        .as('usernameInput');
    cy.get('.my-password-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input')
      .as('passwordInput');
    cy.get('.MuiButtonBase-root.css-1vjdlz8-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root')
      .contains('Sign In')
      .as('loginButton');
  });

  it('should retrieve data via GET request', () => {
    // cy.visit('http://localhost:3001/login');

    cy.get('@usernameInput').type(username);
    cy.get('@passwordInput').type(password);
    cy.get('@loginButton').click();

    cy.intercept('POST', 'http://192.168.0.97:8000/auth/login', { 
      fixture:'example.json',
      statusCode: 200,
    }).as('postRequest');

    cy.wait('@postRequest', {timeout: 10000}).its('response.statusCode').should('equal', 200);

  });
});
