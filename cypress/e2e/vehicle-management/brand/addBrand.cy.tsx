describe('Test value page', () => {
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


  it('should render title with specified text', () => {
    cy.visit('http://localhost:3001/vehicle-config/add-brand');
    const title = 'Add Vehicle Brand'
    cy.get('.MuiTypography-root.css-zie486-MuiTypography-root').should('have.text', title);
  });


  {/* Type */} 
  describe('Brand Name', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/vehicle-config/add-brand');
    })

    it('should display label text correctly', () => {
      cy.contains('Brand Name').should('exist');
    });

    it('should display default value correctly', () => {
      cy.get('#my-brand-field').should('have.value', '');
    });

    it('should allow input and update value correctly', () => {
      cy.get('#my-brand-field').type('Synsoft!');
      cy.get('#my-brand-field').should('have.value', 'Synsoft!');
    });
  });


  {/* Vehicle Category */} 
  describe(' Vehicle Category', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/vehicle-config/add-brand');
    })
    it('should open dropdown on click and select option', () => {
      cy.get('.my-vehicle-type .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('6'); // type search keyword
      cy.get('.MuiAutocomplete-root.MuiAutocomplete-hasPopupIcon.css-l3ln04-MuiAutocomplete-root').should('be.visible'); // dropdown should be visible
      cy.contains('6 wheeler').click(); // click on option
      cy.get('.my-vehicle-type .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').should('have.value', '6 wheeler'); // input should have selected value
    });
  
    it('should filter options as you type', () => {
      cy.get('.my-vehicle-type .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('6'); // type search keyword
      cy.get('.my-vehicle-type [role="combobox"]').should('have.length', 1); // only matching options should be visible
    });
  
    it('should not display dropdown if no options match', () => {
      cy.get('.my-vehicle-type .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input').type('xyz'); // type search keyword
      cy.get('.my-vehicle-type [role="listbox"]').should('not.exist'); // dropdown should not be visible
    });
  });

  {/*Check Box */} 
  describe('is Active', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/vehicle-config/add-brand');
    })
    it('1. should be unchecked by default', () => {
      cy.get('.is-active-field').should('not.be.checked');
    });
  
    it('2. should become checked when clicked', () => {
      cy.get('.is-active-field').click();
      cy.get('.is-active-field .PrivateSwitchBase-input.css-1m9pwf3').should('be.checked');
    });
  
    it('3. should become unchecked when clicked twice', () => {
      cy.get('.is-active-field').click();
      cy.get('.is-active-field').click();
      cy.get('.is-active-field .PrivateSwitchBase-input.css-1m9pwf3').should('not.be.checked');
    });
  
    it('4. should display correct label text', () => {
      cy.get('.is-active-field .MuiTypography-root.css-18mbpzx-MuiTypography-root').should('have.text', 'isActive');
    });
  
    it('5. should trigger a change event when clicked', () => {
      cy.spy(Cypress.sinon, 'spy');
      cy.get('.is-active-field .PrivateSwitchBase-input.css-1m9pwf3').click();
  
      // Assert that the change event was triggered
      // cy.wrap(Cypress.sinon.spy).should('have.been.calledWith', 'onChange');
    });
  });
})






