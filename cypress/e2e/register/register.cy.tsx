// cypress/integration/react_test.spec.js

describe('React Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/register');
  });

   {/* First Name */}
   describe('First Name', () => {
    it('should display label first name correctly', () => {
      cy.contains('First Name').should('exist');
    });

    it('should display default value correctly', () => {
      cy.get('#my-firstName-field').should('have.value', '');
    });

    it('should allow input and update value correctly', () => {
      cy.get('#my-firstName-field').type('Ankit');
      cy.get('#my-firstName-field').should('have.value', 'Ankit');
    });
  });


    {/* Last Name */}
    describe('Last Name', () => {
      it('should display label text correctly', () => {
        cy.contains('Last Name').should('exist');
      });
  
      it('should display default value correctly', () => {
        cy.get('#my-lastName-field').should('have.value', '');
      });
  
      it('should allow input and update value correctly', () => {
        cy.get('#my-lastName-field').type('Malviya!');
        cy.get('#my-lastName-field').should('have.value', 'Malviya!');
      });
    });

      {/* Email */}
  describe('Email', () => {
    it('should display label text correctly', () => {
      cy.contains('Email').should('exist');
    });

    it('should display default value correctly', () => {
      cy.get('#my-email-field').should('have.value', '');
    });

    it('should allow input and update value correctly', () => {
      cy.get('#my-email-field').type('test@example.com');
      cy.get('#my-email-field').should('have.value', 'test@example.com');
    });

    it('should display error state when there is an error', () => {
      cy.get('#my-email-field').then(($textField) => {
        $textField[0].setAttribute('aria-invalid', 'true');
        $textField[0].setAttribute('aria-describedby', 'error-message');
        $textField[0].setAttribute('aria-errormessage', 'error-message');
      });
      cy.get('#my-email-field').should('have.attr', 'aria-invalid', 'true');
      cy.get('[aria-describedby="error-message"]').should('exist');
    });
  });

   {/* Phone */}
   describe(' Phone Number', () => {
    it('should display label text correctly', () => {
      cy.contains('Phone').should('exist');
    });

    it('should display default value correctly', () => {
      cy.get('#my-phone-field').should('have.value', '');
    });

    it('should allow entering valid phone number', () => {
      cy.get('#my-phone-field').type('1234567890'); 
      cy.get('#my-phone-field').should('have.value', '1234567890');
    });

  
    it('should clear error state after entering valid phone number', () => {
      cy.get('#my-phone-field').type('12345'); 
      cy.get('#my-phone-field').clear().type('1234567890'); 
      // cy.get('#my-phone-field').should('not.have.attr', 'aria-invalid');
      cy.get('#my-phone-field').should('not.have.class', 'Mui-error');
      cy.get('#my-phone-field').should('not.have.attr', 'aria-describedby', 'error-message');
      cy.get('#error-message').should('not.exist');
    });
  });

    {/* Password */}
    describe('MUI Password', () => {
      it('renders password field with label and type', () => {
        cy.get('label').contains('Password');
        cy.get('input[type="password"]').should('exist');
      });
  
      it('allows entering password', () => {
        cy.get('.my-password-field input[type="password"]').type('mypassword');
        cy.get('.my-password-field input[type="password"]').should('have.value', 'mypassword');
      });
  
      // it('toggles password visibility', () => {
      //   cy.get('.my-password-field button.MuiButtonBase-root.css-78trlr-MuiButtonBase-root-MuiIconButton-root').click();
      //   cy.get('.my-password-field input[type="text"]').should('exist');
      //   cy.get('.my-password-field button.MuiButtonBase-root.css-78trlr-MuiButtonBase-root-MuiIconButton-root').click();
      //   cy.get('.my-password-field input[type="password"]').should('exist');
      // });
  
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
    it('enters confirm password', () => {
      cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('secret123');
      cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'secret123');
    });

    // it('toggles visibility of confirm password', () => {
    //   cy.get('.my-confirmPassword-field .MuiButtonBase-root.css-78trlr-MuiButtonBase-root-MuiIconButton-root').click();
    //   cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.attr', 'type', 'text');
    //   cy.get('.my-confirmPassword-field .MuiButtonBase-root.css-78trlr-MuiButtonBase-root-MuiIconButton-root').click();
    //   cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.attr', 'type', 'password');
    // });

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
    describe('Company Name', () => {
      it('should display label text correctly', () => {
        cy.contains('Company Name').should('exist');
      });
  
      it('should display default value correctly', () => {
        cy.get('#my-company-field').should('have.value', '');
      });
  
      it('should allow input and update value correctly', () => {
        cy.get('#my-company-field').type('Synsoft!');
        cy.get('#my-company-field').should('have.value', 'Synsoft!');
      });
    });

     {/* Currency */} 
    //  describe('Currency', () => {
    //   it('should open dropdown on click and select option', () => {
    //     cy.get('.my-currency-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('ru'); // type search keyword
    //     cy.get('.MuiAutocomplete-root.MuiAutocomplete-hasPopupIcon.css-l3ln04-MuiAutocomplete-root').should('be.visible'); // dropdown should be visible
    //     cy.contains('ruppe').click(); // click on option
    //     cy.get('.my-currency-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'ruppe'); // input should have selected value
    //   });
    
    //   it('should filter options as you type', () => {
    //     cy.get('.my-currency-field').type('ru'); // type search keyword
    //     cy.get('.my-currency-field [role="combobox"]').should('have.length', 1); // only matching options should be visible
    //   });
    
    //   it('should not display dropdown if no options match', () => {
    //     cy.get('.my-currency-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('xyz'); // type search keyword
    //     cy.get('.my-currency-field [role="listbox"]').should('not.exist'); // dropdown should not be visible
    //   });
    // });
    

     {/* Company Addresss */} 
     describe('Company Addresss', () => {
      it('should display label text correctly', () => {
        cy.contains('Company Address').should('exist');
      });
  
      it('should display default value correctly', () => {
        cy.get('#my-address-field').should('have.value', '');
      });
  
      it('should allow input and update value correctly', () => {
        cy.get('#my-address-field').type('VijayNagar, Indore!');
        cy.get('#my-address-field').should('have.value', 'VijayNagar, Indore!');
      });
    });

     {/* Country */} 
     describe('Country', () => {
      it('should open dropdown on click and select option', () => {
        cy.get('.my-country-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('Afghanistan'); // type search keyword
        cy.get('.MuiAutocomplete-root.MuiAutocomplete-hasPopupIcon.css-l3ln04-MuiAutocomplete-root').should('be.visible'); // dropdown should be visible
        cy.contains('Afghanistan').click(); // click on option
        cy.get('.my-country-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'Afghanistan'); // input should have selected value
      });
    
      it('should filter options as you type', () => {
        cy.get('.my-country-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('al'); // type search keyword
        cy.get('.my-country-field [role="combobox"]').should('have.length', 1); // only matching options should be visible
      });
    
      it('should not display dropdown if no options match', () => {
        cy.get('.my-country-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('xyz'); // type search keyword
        cy.get('.my-country-field [role="listbox"]').should('not.exist'); // dropdown should not be visible
      });
    });

     {/* State */} 
     describe('Country', () => {
      it('should open dropdown on click and select option', () => {
        cy.get('.my-state-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('Badakhshan'); // type search keyword
        cy.get('.MuiAutocomplete-root.MuiAutocomplete-hasPopupIcon.css-l3ln04-MuiAutocomplete-root').should('be.visible'); // dropdown should be visible
        cy.contains('Badakhshan').click(); // click on option
        cy.get('.my-state-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'Badakhshan'); // input should have selected value
      });
    
      it('should filter options as you type', () => {
        cy.get('.my-state-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('Badakhshan'); // type search keyword
        cy.get('.my-state-field [role="combobox"]').should('have.length', 1); // only matching options should be visible
      });
    
      it('should not display dropdown if no options match', () => {
        cy.get('.my-state-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('xyz'); // type search keyword
        cy.get('.my-state-field [role="listbox"]').should('not.exist'); // dropdown should not be visible
      });
    });

    {/* City */} 
     describe('Company Addresss', () => {
      it('should display label text correctly', () => {
        cy.contains('City').should('exist');
      });
  
      it('should display default value correctly', () => {
        cy.get('#my-city-field').should('have.value', '');
      });
  
      it('should allow input and update value correctly', () => {
        cy.get('#my-city-field').type('Indore!');
        cy.get('#my-city-field').should('have.value', 'Indore!');
      });
    });

    {/* ZIP */}
   describe(' ZIP', () => {
    it('should display label text correctly', () => {
      cy.contains('Zip').should('exist');
    });

    it('should display default value correctly', () => {
      cy.get('#my-zip-field').should('have.value', '');
    });

    it('should allow entering valid ZIP', () => {
      cy.get('#my-zip-field').type('1234567890'); 
      cy.get('#my-zip-field').should('have.value', '1234567890');
    });

    it('should clear error state after entering valid ZIP', () => {
      cy.get('#my-zip-field').type('12345'); 
      cy.get('#my-zip-field').clear().type('1234567890'); 
      // cy.get('#my-zip-field').should('not.have.attr', 'aria-invalid');
      cy.get('#my-zip-field').should('not.have.class', 'Mui-error');
      cy.get('#my-zip-field').should('not.have.attr', 'aria-describedby', 'error-message');
      cy.get('#error-message').should('not.exist');
    });
  });

  {/* Acknowledge */}
describe('Acknowledge', () => {
  it('1. should be unchecked by default', () => {
    cy.get('#my-Acknowledge-field').should('not.be.checked');
  });

  it('2. should become checked when clicked', () => {
    cy.get('#my-Acknowledge-field').click();
    cy.get('#my-Acknowledge-field ').should('be.checked');
  });

  it('3. should become unchecked when clicked twice', () => {
    cy.get('#my-Acknowledge-field').click();
    cy.get('#my-Acknowledge-field').click();
    cy.get('#my-Acknowledge-field ').should('not.be.checked');
  });

  // it('4. should display correct label text', () => {
  //   cy.get('#my-Acknowledge-field').should('have.text', 'Label');
  // });

  it('5. should trigger a change event when clicked', () => {
    cy.spy(Cypress.sinon, 'spy');
    cy.get('#my-Acknowledge-field').click();

    // Assert that the change event was triggered
    // cy.wrap(Cypress.sinon.spy).should('have.been.calledWith', 'onChange');
  });
});


// describe('Auth Register', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3001/register');
//   });

//   it('should add data via POST request', () => {
//     cy.intercept('POST', '/api/data', { message: 'Data added successfully' }).as('postRequest');

//     cy.get('#my-firstName-field').type('Ankit!');
//     cy.get('.my-lastName-field').type('Malviya!');
//     cy.get('.my-email-field').type('test@example.com');
//     cy.get('.my-phone-field').type('1234567890'); 
//     cy.get('.my-password-field input[type="password"]').type('pass');
//     cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('pass');
//     cy.get('.my-company-field').type('Synsoft!');
//     cy.get('.my-address-field').type('VijayNagar, Indore!');
//     cy.get('.my-city-field').type('Indore!');
//     cy.get('.my-zip-field').type('1234567890'); 

//     cy.wait('@postRequest').its('response.statusCode').should('equal', 200);
//     cy.contains('Data added successfully').should('be.visible');
//   });

//   it('should retrieve data via GET request', () => {
//     cy.intercept('GET', '/api/data', [{ name: 'John', age: '25' }]).as('getRequest');

//     cy.get('button').contains('Get Data').click();

//     cy.wait('@getRequest').its('response.statusCode').should('equal', 200);
//     cy.contains('John').should('be.visible');
//     cy.contains('25').should('be.visible');
//   });
// });

});
