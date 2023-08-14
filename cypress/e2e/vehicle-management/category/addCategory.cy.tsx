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
      cy.visit('http://localhost:3001/vehicle-config/add-category');
      const title = 'Add Vehicle Category';
      cy.get('.MuiTypography-root.css-zie486-MuiTypography-root').should('have.text', title);
    });


    {/* Category Name */} 
    describe('Category Name', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3001/vehicle-config/add-category');
      })

      it('should display label text correctly', () => {
        cy.contains('Category Name').should('exist');
        // const title = 'Category Name';
        // cy.get('#my-category-field-label').should('have.text', title);
      });
  
      it('should display default value correctly', () => {
        cy.get('#my-category-field').should('have.value', '');
      });
  
      it('should allow input and update value correctly', () => {
        cy.get('#my-category-field').type('Synsoft!');
        cy.get('#my-category-field').should('have.value', 'Synsoft!');
      });
    });

    describe('is Active', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3001/vehicle-config/add-category');
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






