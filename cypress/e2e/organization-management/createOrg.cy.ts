// cypress/integration/react_test.spec.js

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
  });

    // it('should render title with specified text', () => {
    //   cy.visit('http://localhost:3001/');
    //   const title = 'Dashboard';
    //   cy.get('.MuiTypography-root.css-zie486-MuiTypography-root').should('have.text', title);
    // });

    // describe('Organization Management', () => {
    //   beforeEach(() => {
    //     cy.visit('http://localhost:3001/organization-management');
    //   })
    //   it('should render title with specified text', () => {
    //     const title = 'Organization List';
    //     cy.get('.MuiTypography-root.css-1cexda8-MuiTypography-root').should('have.text', title);
    //   });
  
    //   it('should render title with specified text', () => {
    //     cy.get('.MuiButtonBase-root.css-1hd4x0b-MuiButtonBase-root-MuiButton-root').click()
    //     cy.visit('http://localhost:3001/organization-management/add');
    //   });
    // })

    // it('should render title with specified text', () => {
    //   cy.visit('http://localhost:3001/organization-management/add');
    //   const title = 'Create Organization';
    //   cy.get('.MuiTypography-root.css-1cexda8-MuiTypography-root').should('have.text', title);
    // });
    

    {/* Company Name */} 
    // describe('Company Name', () => {
    //   beforeEach(() => {
    //     cy.visit('http://localhost:3001/organization-management/add');
    //   })
    //   it('should display label text correctly', () => {
    //     cy.contains('Company Name').should('exist');
    //   });
  
    //   it('should display default value correctly', () => {
    //     cy.get('#my-company-field').should('have.value', '');
    //   });
  
    //   it('should allow input and update value correctly', () => {
    //     cy.get('#my-company-field').type('Synsoft!');
    //     cy.get('#my-company-field').should('have.value', 'Synsoft!');
    //   });
    // });

    //  {/* Currency */} 
    //  describe('Currency', () => {
    //   beforeEach(() => {
    //     cy.visit('http://localhost:3001/organization-management/add');
    //   })
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
    

    //  {/* Company Addresss */} 
    //  describe('Company Addresss', () => {
    //   beforeEach(() => {
    //     cy.visit('http://localhost:3001/organization-management/add');
    //   })
    //   it('should display label text correctly', () => {
    //     cy.contains('Company Address').should('exist');
    //   });
  
    //   it('should display default value correctly', () => {
    //     cy.get('#my-address-field').should('have.value', '');
    //   });
  
    //   it('should allow input and update value correctly', () => {
    //     cy.get('#my-address-field').type('VijayNagar, Indore!');
    //     cy.get('#my-address-field').should('have.value', 'VijayNagar, Indore!');
    //   });
    // });

    //  {/* Country */} 
    //  describe('Country', () => {
    //   beforeEach(() => {
    //     cy.visit('http://localhost:3001/organization-management/add');
    //   })
    //   it('should open dropdown on click and select option', () => {
    //     cy.get('.my-country-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('al'); // type search keyword
    //     cy.get('.MuiAutocomplete-root.MuiAutocomplete-hasPopupIcon.css-l3ln04-MuiAutocomplete-root').should('be.visible'); // dropdown should be visible
    //     cy.contains('Albania').click(); // click on option
    //     cy.get('.my-country-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', 'Albania'); // input should have selected value
    //   });
    
    //   it('should filter options as you type', () => {
    //     cy.get('.my-country-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('al'); // type search keyword
    //     cy.get('.my-country-field [role="combobox"]').should('have.length', 1); // only matching options should be visible
    //   });
    
    //   it('should not display dropdown if no options match', () => {
    //     cy.get('.my-country-field .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('xyz'); // type search keyword
    //     cy.get('.my-country-field [role="listbox"]').should('not.exist'); // dropdown should not be visible
    //   });
    // });

     {/* State */} 
    //  describe('Country', () => {
      // beforeEach(() => {
      //   cy.visit('http://localhost:3001/organization-management/add');
      // })
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
  //    describe('City', () => {
  //     beforeEach(() => {
  //       cy.visit('http://localhost:3001/organization-management/add');
  //     })
  //     it('should display label text correctly', () => {
  //       cy.contains('City').should('exist');
  //     });
  
  //     it('should display default value correctly', () => {
  //       cy.get('#my-city-field').should('have.value', '');
  //     });
  
  //     it('should allow input and update value correctly', () => {
  //       cy.get('#my-city-field').type('Indore!');
  //       cy.get('#my-city-field').should('have.value', 'Indore!');
  //     });
  //   });

  //   {/* ZIP */}
  //  describe(' ZIP', () => {
  //   beforeEach(() => {
  //     cy.visit('http://localhost:3001/organization-management/add');
  //   })
  //   it('should display label text correctly', () => {
  //     cy.contains('Zip').should('exist');
  //   });

  //   it('should display default value correctly', () => {
  //     cy.get('#my-zip-field').should('have.value', '');
  //   });

  //   it('should allow entering valid ZIP', () => {
  //     cy.get('#my-zip-field').type('1234567890'); 
  //     cy.get('#my-zip-field ').should('have.value', '1234567890');
  //   });

  //   it('should clear error state after entering valid ZIP', () => {
  //     cy.get('#my-zip-field').type('12345'); 
  //     cy.get('#my-zip-field').clear().type('1234567890'); 
  //     cy.get('#my-zip-field').should('not.have.attr', 'aria-invalid');
  //     cy.get('#my-zip-field').should('not.have.class', 'Mui-error');
  //     cy.get('#my-zip-field').should('not.have.attr', 'aria-describedby', 'error-message');
  //     cy.get('#error-message').should('not.exist');
  //   });
  // });


  //    {/* First Name */}
  //    describe('First Name', () => {
  //     beforeEach(() => {
  //       cy.visit('http://localhost:3001/organization-management/add');
  //     })
  //     it('should display label first name correctly', () => {
  //       cy.contains('First Name').should('exist');
  //     });
  
  //     it('should display default value correctly', () => {
  //       cy.get('#my-firstName-field').should('have.value', '');
  //     });
  
  //     it('should allow input and update value correctly', () => {
  //       cy.get('#my-firstName-field').type('Ankit!');
  //       cy.get('#my-firstName-field').should('have.value', 'Ankit!');
  //     });
  //   });
  
  
  //     {/* Last Name */}
  //     describe('Last Name', () => {
  //       beforeEach(() => {
  //         cy.visit('http://localhost:3001/organization-management/add');
  //       })
  //       it('should display label text correctly', () => {
  //         cy.contains('Last Name').should('exist');
  //       });
    
  //       it('should display default value correctly', () => {
  //         cy.get('#my-lastName-field').should('have.value', '');
  //       });
    
  //       it('should allow input and update value correctly', () => {
  //         cy.get('#my-lastName-field').type('Malviya!');
  //         cy.get('#my-lastName-field').should('have.value', 'Malviya!');
  //       });
  //     });
  
  //       {/* Email */}
  //   describe('Email', () => {
  //     beforeEach(() => {
  //       cy.visit('http://localhost:3001/organization-management/add');
  //     })
  //     it('should display label text correctly', () => {
  //       cy.contains('Email').should('exist');
  //     });
  
  //     it('should display default value correctly', () => {
  //       cy.get('#my-email-field').should('have.value', '');
  //     });
  
  //     it('should allow input and update value correctly', () => {
  //       cy.get('#my-email-field').type('test@example.com');
  //       cy.get('#my-email-field').should('have.value', 'test@example.com');
  //     });
  
  //     it('should display error state when there is an error', () => {
  //       cy.get('#my-email-field').then(($textField) => {
  //         $textField[0].setAttribute('aria-invalid', 'true');
  //         $textField[0].setAttribute('aria-describedby', 'error-message');
  //         $textField[0].setAttribute('aria-errormessage', 'error-message');
  //       });
  //       cy.get('#my-email-field').should('have.attr', 'aria-invalid', 'true');
  //       cy.get('[aria-describedby="error-message"]').should('exist');
  //     });
  //   });
  
  //    {/* Phone */}
     describe(' Phone Number', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3001/organization-management/add');
      })
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
        cy.get('#my-phone-field').should('not.have.class', 'Mui-error');
        cy.get('#my-phone-field').should('not.have.attr', 'aria-describedby', 'error-message');
        cy.get('#error-message').should('not.exist');
      });
    });
  
      {/* Password */}
      // describe('MUI Password', () => {
      //   beforeEach(() => {
      //     cy.visit('http://localhost:3001/organization-management/add');
      //   })
      //   it('renders password field with label and type', () => {
      //     cy.get('label').contains('Password');
      //     cy.get('input[type="password"]').should('exist');
      //   });
    
      //   it('allows entering password', () => {
      //     cy.get('#my-password-field').type('mypassword');
      //     cy.get('#my-password-field').should('have.value', 'mypassword');
      //   });
    
      //   it('toggles password visibility', () => {
      //     cy.get('.my-password-field .MuiButtonBase-root.css-cnkzaq-MuiButtonBase-root-MuiIconButton-root').click();
      //     cy.get('#my-password-field ').should('exist');
      //     cy.get('.my-password-field .MuiButtonBase-root.css-cnkzaq-MuiButtonBase-root-MuiIconButton-root').click();
      //     cy.get('#my-password-field ').should('exist');
      //   });
    
      //   it('displays error message for invalid password', () => {
      //     cy.get('#my-password-field ').type('pass');
      //   });
    
      //   it('clears password field', () => {
      //     cy.get('#my-password-field ').type('mypassword');
      //     cy.get('#my-password-field ').clear();
      //     cy.get('#my-password-field ').should('have.value', '');
      //   });
      // });
  
       {/* Confirm Password */} 
        // describe('MUI Confirm Password', () => {
        //   beforeEach(() => {
        //     cy.visit('http://localhost:3001/organization-management/add');
        //   })
        //   it('enters confirm password', () => {
        //     cy.get('#my-confirmPassword-field').type('secret123');
        //     cy.get('#my-confirmPassword-field').should('have.value', 'secret123');
        //   });
      
        //   it('toggles visibility of confirm password', () => {
        //     cy.get('.my-confirmPassword-field .MuiButtonBase-root.css-cnkzaq-MuiButtonBase-root-MuiIconButton-root').click();
        //     cy.get('#my-confirmPassword-field').should('have.attr', 'type', 'text');
        //     cy.get('.my-confirmPassword-field .MuiButtonBase-root.css-cnkzaq-MuiButtonBase-root-MuiIconButton-root').click();
        //     cy.get('#my-confirmPassword-field').should('have.attr', 'type', 'password');
        //   });
      
        //   it('clears confirm password field', () => {
        //     cy.get('#my-confirmPassword-field').type('secret1234');
        //     cy.get('#my-confirmPassword-field').clear();
        //     cy.get('#my-confirmPassword-field').should('have.value', '');
        //   });
      
        //   it('validates confirm password error message', () => {
        //     cy.get('#my-confirmPassword-field').type('universe111');
        //     cy.get('form').submit();
        //     cy.contains('Passwords and confirm password is different').should('be.visible');
        //   }); 
        // });

});
