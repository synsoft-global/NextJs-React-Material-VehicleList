// cypress/integration/react_test.spec.js

describe('React Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/vehicle-management/add');
  });


  {/* Category */}
  describe('Category', () => {
    it('should open dropdown on click and select option', () => {
      cy.get('.my-category-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('ca'); // type search keyword
      cy.get('.MuiAutocomplete-root.MuiAutocomplete-hasPopupIcon.css-l3ln04-MuiAutocomplete-root').should('be.visible'); // dropdown should be visible
      cy.contains('Car').click(); // click on option
      cy.get('.my-category-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'Car'); // input should have selected value
    });
  
    it('should filter options as you type', () => {
      cy.get('#my-category-field').type('ca'); // type search keyword
      cy.get('.my-category-field [role="combobox"]').should('have.length', 1); // only matching options should be visible
    });
  
    it('should not display dropdown if no options match', () => {
      cy.get('.my-category-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('xyz'); // type search keyword
      cy.get('.my-category-field [role="listbox"]').should('not.exist'); // dropdown should not be visible
    });
  });


  {/* Type */}
  describe('Type', () => {
    it('should open dropdown on click and select option', () => {
      cy.get('.my-type-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('2'); // type search keyword
      cy.get('.MuiAutocomplete-root.MuiAutocomplete-hasPopupIcon.css-l3ln04-MuiAutocomplete-root').should('be.visible'); // dropdown should be visible
      cy.contains('2 wheeler').click(); // click on option
      cy.get('.my-type-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', '2 wheeler'); // input should have selected value
    });
  
    it('should filter options as you type', () => {
      cy.get('#my-type-field').type('2'); // type search keyword
      cy.get('.my-type-field [role="combobox"]').should('have.length', 1); // only matching options should be visible
    });
  
    it('should not display dropdown if no options match', () => {
      cy.get('.my-type-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('xyz'); // type search keyword
      cy.get('.my-type-field [role="listbox"]').should('not.exist'); // dropdown should not be visible
    });
  });


  {/* brand */}
  describe('brand', () => {
    it('should open dropdown on click and select option', () => {
      cy.get('.my-brand-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('IB'); // type search keyword
      cy.get('.MuiAutocomplete-root.MuiAutocomplete-hasPopupIcon.css-l3ln04-MuiAutocomplete-root').should('be.visible'); // dropdown should be visible
      cy.contains('IB').click(); // click on option
      cy.get('.my-brand-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'IB'); // input should have selected value
    });
  
    it('should filter options as you type', () => {
      cy.get('#my-brand-field').type('IB'); // type search keyword
      cy.get('.my-brand-field [role="combobox"]').should('have.length', 1); // only matching options should be visible
    });
  
    it('should not display dropdown if no options match', () => {
      cy.get('.my-brand-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('xyz'); // type search keyword
      cy.get('.my-brand-field [role="listbox"]').should('not.exist'); // dropdown should not be visible
    });
  });

   {/* Model */}
   describe('Model', () => {
    it('should display label Model correctly', () => {
      cy.contains('Model').should('exist');
    });

    it('should display default value correctly', () => {
      cy.get('#my-model-field').should('have.value', '');
    });

    it('should allow input and update value correctly', () => {
      cy.get('#my-model-field').type('Ankit Malviya!');
      cy.get('#my-model-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'Ankit!');
    });
  });


  {/* No of Doors */}
  describe('No of Doors', () => {  
    it('should have select input of name select', () => {
      cy.get(".my-door-field").parent().as('selectField');
      cy.get('@selectField').should('exist');
    })

    it('should display the select input field', () => {
      cy.get('.my-door-field .MuiSelect-select.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input').should('be.visible');
    });

    it('should be able to click the select input field', () => {
      cy.get('.MuiInputBase-formControl.my-select-field.css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root').click();
      cy.get('.MuiPopover-paper.css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper').should('be.visible');
    });

      it('should open the dropdown menu when clicked', () => {
        cy.get('.my-door-field.css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root').click();
        cy.get('.MuiPopover-paper.css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper').should('be.visible');
    });

    it('should display the expected options in the dropdown menu', () => {
      const expectedOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      cy.get('.my-door-field.css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root').click();
      cy.get('.MuiPopover-paper.css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper')
        .find('li')
        .should('have.length', expectedOptions.length)
        .each(($el, index) => {
          expect($el.text()).to.equal(expectedOptions[index]);
        });
    });

    it('should update the input field with the selected option', () => {
      const expectedOption = '2';
      cy.get('.my-door-field.css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root').click();
      cy.get('.MuiPopover-paper.css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper')
        .contains(expectedOption)
        .click();
    
      // cy.get('.my-door-field [aria-haspopup="listbox"]').should('have.value', expectedOption);
    });


    // it('should display an error message for an invalid option', () => {
    //   const invalidOption = 'Option 4';
    //   cy.get('.my-door-field.css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root').click();
    //   cy.get('.MuiPopover-paper.css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper')
    //     .contains(invalidOption)
    //     .click();
    //   cy.get('[data-testid=error-message]').should('be.visible');
    // });
  })

    {/* Last Name */}
    describe('Last Name', () => {
      it('should display label text correctly', () => {
        cy.contains('Last Name').should('exist');
      });
  
      it('should display default value correctly', () => {
        cy.get('.my-lastName-field').should('have.value', '');
      });
  
      it('should allow input and update value correctly', () => {
        cy.get('.my-lastName-field').type('Malviya!');
        cy.get('.my-lastName-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'Malviya!');
      });
    });

      {/* Email */}
  describe('Email', () => {
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

   {/* Phone */}
   describe(' Phone Number', () => {
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
    describe('Company Name', () => {
      it('should display label text correctly', () => {
        cy.contains('Company Name').should('exist');
      });
  
      it('should display default value correctly', () => {
        cy.get('.my-company-field').should('have.value', '');
      });
  
      it('should allow input and update value correctly', () => {
        cy.get('.my-company-field').type('Synsoft!');
        cy.get('.my-company-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'Synsoft!');
      });
    });

     {/* Currency */} 
     describe('Currency', () => {
      it('should open dropdown on click and select option', () => {
        cy.get('.my-currency-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('ru'); // type search keyword
        cy.get('.MuiAutocomplete-root.MuiAutocomplete-hasPopupIcon.css-l3ln04-MuiAutocomplete-root').should('be.visible'); // dropdown should be visible
        cy.contains('ruppe').click(); // click on option
        cy.get('.my-currency-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'ruppe'); // input should have selected value
      });
    
      it('should filter options as you type', () => {
        cy.get('#my-currency-field').type('ru'); // type search keyword
        cy.get('.my-currency-field [role="combobox"]').should('have.length', 1); // only matching options should be visible
      });
    
      it('should not display dropdown if no options match', () => {
        cy.get('.my-currency-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('xyz'); // type search keyword
        cy.get('.my-currency-field [role="listbox"]').should('not.exist'); // dropdown should not be visible
      });
    });
    

     {/* Company Addresss */} 
     describe('Company Addresss', () => {
      it('should display label text correctly', () => {
        cy.contains('Company Address').should('exist');
      });
  
      it('should display default value correctly', () => {
        cy.get('.my-address-field').should('have.value', '');
      });
  
      it('should allow input and update value correctly', () => {
        cy.get('.my-address-field').type('VijayNagar, Indore!');
        cy.get('.my-address-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'VijayNagar, Indore!');
      });
    });

     {/* Country */} 
     describe('Country', () => {
      it('should open dropdown on click and select option', () => {
        cy.get('.my-country-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('al'); // type search keyword
        cy.get('.MuiAutocomplete-root.MuiAutocomplete-hasPopupIcon.css-l3ln04-MuiAutocomplete-root').should('be.visible'); // dropdown should be visible
        cy.contains('Albania').click(); // click on option
        cy.get('.my-country-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'Albania'); // input should have selected value
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
    //  describe('Country', () => {
    //   it('should open dropdown on click and select option', () => {
    //     cy.get('.my-state-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('al'); // type search keyword
    //     cy.get('.MuiAutocomplete-root.MuiAutocomplete-hasPopupIcon.css-l3ln04-MuiAutocomplete-root').should('be.visible'); // dropdown should be visible
    //     cy.contains('Albania').click(); // click on option
    //     cy.get('.my-state-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'Albania'); // input should have selected value
    //   });
    
    //   it('should filter options as you type', () => {
    //     cy.get('.my-state-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('al'); // type search keyword
    //     cy.get('.my-state-field [role="combobox"]').should('have.length', 1); // only matching options should be visible
    //   });
    
    //   it('should not display dropdown if no options match', () => {
    //     cy.get('.my-state-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('xyz'); // type search keyword
    //     cy.get('.my-state-field [role="listbox"]').should('not.exist'); // dropdown should not be visible
    //   });
    // });

    {/* City */} 
     describe('Company Addresss', () => {
      it('should display label text correctly', () => {
        cy.contains('City').should('exist');
      });
  
      it('should display default value correctly', () => {
        cy.get('.my-city-field').should('have.value', '');
      });
  
      it('should allow input and update value correctly', () => {
        cy.get('.my-city-field').type('Indore!');
        cy.get('.my-city-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'Indore!');
      });
    });

    {/* ZIP */}
   describe(' ZIP', () => {
    it('should display label text correctly', () => {
      cy.contains('Zip').should('exist');
    });

    it('should display default value correctly', () => {
      cy.get('.my-zip-field').should('have.value', '');
    });

    it('should allow entering valid ZIP', () => {
      cy.get('.my-zip-field').type('1234567890'); 
      cy.get('.my-zip-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', '1234567890');
    });

    it('should clear error state after entering valid ZIP', () => {
      cy.get('.my-zip-field').type('12345'); 
      cy.get('.my-zip-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').clear().type('1234567890'); 
      cy.get('.my-zip-field').should('not.have.attr', 'aria-invalid');
      cy.get('.my-zip-field').should('not.have.class', 'Mui-error');
      cy.get('.my-zip-field').should('not.have.attr', 'aria-describedby', 'error-message');
      cy.get('#error-message').should('not.exist');
    });
  });

  {/* Acknowledge */}
describe('Acknowledge', () => {
  it('1. should be unchecked by default', () => {
    cy.get('.my-Acknowledge-field .MuiButtonBase-root.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root').should('not.be.checked');
  });

  it('2. should become checked when clicked', () => {
    cy.get('.my-Acknowledge-field .MuiButtonBase-root.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root').click();
    cy.get('.my-Acknowledge-field .PrivateSwitchBase-input.css-1m9pwf3').should('be.checked');
  });

  it('3. should become unchecked when clicked twice', () => {
    cy.get('.my-Acknowledge-field .MuiButtonBase-root.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root').click();
    cy.get('.my-Acknowledge-field .MuiButtonBase-root.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root').click();
    cy.get('.my-Acknowledge-field .PrivateSwitchBase-input.css-1m9pwf3').should('not.be.checked');
  });

  it('4. should display correct label text', () => {
    cy.get('.my-Acknowledge-field .MuiFormControlLabel-label.css-ahj2mt-MuiTypography-root').should('have.text', 'Label');
  });

  it('5. should trigger a change event when clicked', () => {
    cy.spy(Cypress.sinon, 'spy');
    cy.get('.my-Acknowledge-field .PrivateSwitchBase-input.css-1m9pwf3').click();

    // Assert that the change event was triggered
    // cy.wrap(Cypress.sinon.spy).should('have.been.calledWith', 'onChange');
  });
});


describe('Auth Register', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/register');
  });

  it('should add data via POST request', () => {
    cy.intercept('POST', '/api/data', { message: 'Data added successfully' }).as('postRequest');

    cy.get('#my-firstName-field').type('Ankit!');
    cy.get('.my-lastName-field').type('Malviya!');
    cy.get('.my-email-field').type('test@example.com');
    cy.get('.my-phone-field').type('1234567890'); 
    cy.get('.my-password-field input[type="password"]').type('pass');
    cy.get('.my-confirmPassword-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('pass');
    cy.get('.my-company-field').type('Synsoft!');
    cy.get('.my-address-field').type('VijayNagar, Indore!');
    cy.get('.my-city-field').type('Indore!');
    cy.get('.my-zip-field').type('1234567890'); 

    cy.wait('@postRequest').its('response.statusCode').should('equal', 200);
    cy.contains('Data added successfully').should('be.visible');
  });

  it('should retrieve data via GET request', () => {
    cy.intercept('GET', '/api/data', [{ name: 'John', age: '25' }]).as('getRequest');

    cy.get('button').contains('Get Data').click();

    cy.wait('@getRequest').its('response.statusCode').should('equal', 200);
    cy.contains('John').should('be.visible');
    cy.contains('25').should('be.visible');
  });
});

});
