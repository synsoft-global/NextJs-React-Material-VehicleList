import { Provider } from 'react-redux';
import { store } from '../../lib/redux/store/store';
// import { NextRouter } from 'next/router';
import RegisterForm from '@/pages/register/component/registerForm/RegisterForm.component';
import PersonalInformationField from '@/pages/register/component/personalInformationField/PersonalInformationField.component';


describe('RegisterForm', () => {
  beforeEach(() => {
    cy.wrap(<Provider store={store}><RegisterForm /></Provider>).as('component');
    cy.mount(<Provider store={store}><RegisterForm /></Provider>);
  });

  {/* First Name */}
  describe('First Name', () => {
    beforeEach(() => {
      cy.wrap(<Provider store={store}><RegisterForm /></Provider>).as('component');
      cy.mount(<Provider store={store}><RegisterForm /></Provider>);
      
    });

    it('should display label text correctly', () => {
      cy.contains('First Name').should('exist');
    });

    it('should display default value correctly', () => {
      cy.get('.my-firstName-field').should('have.value', '');
    });

    it('should allow input and update value correctly', () => {
      cy.get('.my-firstName-field').type('Ankit Malviya!');
      cy.get('.my-firstName-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'Ankit Malviya!');
    });
  });


  {/* Last Name */}
  describe('Last Name', () => {
    beforeEach(() => {
      cy.mount(<Provider store={store}><RegisterForm/> </Provider>);
    });

    it('should display label text correctly', () => {
      cy.contains('Last Name').should('exist');
    });

    it('should display default value correctly', () => {
      cy.get('.my-lastName-field').should('have.value', '');
    });

    it('should allow input and update value correctly', () => {
      cy.get('.my-lastName-field').type('Ankit Malviya!');
      cy.get('.my-lastName-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'Ankit Malviya!');
    });
  });


  {/* Email */}
  describe('Email', () => {
    beforeEach(() => {
      cy.wrap(<Provider store={store}><RegisterForm /></Provider>).as('component');
      cy.mount(<Provider store={store}><RegisterForm /></Provider>);
    });

    it('should display label text correctly', () => {
      cy.contains('Email').should('exist');
    });

    it('should display default value correctly', () => {
      cy.get('.my-email-field').should('have.value', '');
    });

    it('should allow input and update value correctly', () => {
      cy.get('.my-email-field').type('test@example.com');
      cy.get('.my-email-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'test@example.com');
    });

    it('should display error state when there is an error', () => {
      cy.get('.my-email-field').then(($textField) => {
        $textField[0].setAttribute('aria-invalid', 'true');
        $textField[0].setAttribute('aria-describedby', 'error-message');
        $textField[0].setAttribute('aria-errormessage', 'error-message');
      });
      cy.get('.my-email-field').should('have.attr', 'aria-invalid', 'true');
      cy.get('[aria-describedby="error-message"]').should('exist');
    });
  });


  {/* DialCode */}
  describe('Dial Code Select', () => {
    beforeEach(() => {
      cy.mount(<Provider store={store}><RegisterForm/> </Provider>);
    });

    it('should display default value correctly', () => {
      cy.get('.my-dialCode-field').should('contain', '+33');
    });

    it('should display flag and dial code correctly for selected option', () => {
      cy.get('.my-dialCode-field').click();
      cy.get('.MuiMenu-list').contains('+1').click(); 
      cy.get('.my-dialCode-field').should('contain', '+1'); 
      // cy.get('.MuiInputBase-root.css-xmy6c0-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root').should('contain', 'Australia'); // Change the flag and label display accordingly
    });

  });

  {/* Phone */}
  describe(' Phone Number', () => {
    beforeEach(() => {
      cy.mount(<Provider store={store}><RegisterForm/> </Provider>);
    });

    it('should display label text correctly', () => {
      cy.contains('Phone').should('exist');
    });

    it('should display default value correctly', () => {
      cy.get('.my-phone-field').should('have.value', '');
    });

    it('should allow entering valid phone number', () => {
      cy.get('.my-phone-field').type('1234567890'); 
      cy.get('.my-phone-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', '1234567890');
    });

  
    it('should clear error state after entering valid phone number', () => {
      cy.get('.my-phone-field').type('12345'); 
      cy.get('.my-phone-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').clear().type('1234567890'); 
      cy.get('.my-phone-field').should('not.have.attr', 'aria-invalid');
      cy.get('.my-phone-field').should('not.have.class', 'Mui-error');
      cy.get('.my-phone-field').should('not.have.attr', 'aria-describedby', 'error-message');
      cy.get('#error-message').should('not.exist');
    });
  });

  {/* Password */}
  describe('MUI Password', () => {
    beforeEach(() => {
      cy.mount(<Provider store={store}><RegisterForm/> </Provider>);
    });

    it('renders password field with label and type', () => {
      cy.get('label').contains('Password');
      cy.get('input[type="password"]').should('exist');
    });

    it('allows entering password', () => {
      cy.get('.my-password-field input[type="password"]').type('mypassword');
      cy.get('.my-password-field input[type="password"]').should('have.value', 'mypassword');
    });

    it('toggles password visibility', () => {
      cy.get('.my-password-field button.MuiButtonBase-root.css-78trlr-MuiButtonBase-root-MuiIconButton-root').click();
      cy.get('.my-password-field input[type="text"]').should('exist');
      cy.get('.my-password-field button.MuiButtonBase-root.css-78trlr-MuiButtonBase-root-MuiIconButton-root').click();
      cy.get('.my-password-field input[type="password"]').should('exist');
    });

    it('displays error message for invalid password', () => {
      cy.get('.my-password-field input[type="password"]').type('pass');
    });

    it('clears password field', () => {
      cy.get('.my-password-field input[type="password"]').type('mypassword');
      cy.get('.my-password-field input[type="password"]').clear();
      cy.get('.my-password-field input[type="password"]').should('have.value', '');
    });
  });

  {/* Confirm Password */} 
  describe('MUI Confirm Password', () => {
    beforeEach(() => {
      cy.mount(<Provider store={store}><RegisterForm/> </Provider>);
    });

    it('enters confirm password', () => {
      cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('secret123');
      cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'secret123');
    });

    it('toggles visibility of confirm password', () => {
      cy.get('.my-confirmPassword-field .MuiButtonBase-root.css-78trlr-MuiButtonBase-root-MuiIconButton-root').click();
      cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.attr', 'type', 'text');
      cy.get('.my-confirmPassword-field .MuiButtonBase-root.css-78trlr-MuiButtonBase-root-MuiIconButton-root').click();
      cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.attr', 'type', 'password');
    });

    it('clears confirm password field', () => {
      cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('secret1234');
      cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').clear();
      cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', '');
    });

    it('validates confirm password error message', () => {
      cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('universe111');
      cy.get('form').submit();
      cy.contains('Passwords and confirm password is different').should('be.visible');
    }); 
  });


  {/* Company Name */} 
   describe('First Name', () => {
    it('should display label text correctly', () => {
      cy.contains('First Name').should('exist');
    });

    it('should display default value correctly', () => {
      cy.get('.my-firstName-field').should('have.value', '');
    });

    it('should allow input and update value correctly', () => {
      cy.get('.my-firstName-field').type('Ankit Malviya!');
      cy.get('.my-firstName-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'Ankit Malviya!');
    });
  });
});
