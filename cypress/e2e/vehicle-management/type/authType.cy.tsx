describe('Test value page', () => {
  const CategoryName = 'shimsu';
  const VehicleCategory = 'Car';

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

    cy.visit('http://localhost:3001/vehicle-config/add-type');
    cy.get('#my-type-field').as('categoryFieldName');
    cy.get('.my-vehicle-category .MuiInputBase-input.MuiAutocomplete-inputFocused.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input')
    .as('vehicleCategory');
    cy.get('.is-active-field').as('checkedInput');
    cy.get('[type="submit"]').contains('Save').as('saveButton');
  });

    it('should retrieve data via GET request', () => {
      cy.intercept('POST', 'http://192.168.0.97:4000/vehicles-type/create', { 
      fixture:'type.json',
      statusCode: 200,
    }).as('postRequest');

    cy.visit('http://localhost:3001/vehicle-config/add-type');
      cy.get('@categoryFieldName').type(CategoryName); 

      cy.get('@vehicleCategory').type(VehicleCategory);
      cy.contains(VehicleCategory).click();

      cy.get('@checkedInput').click();
      cy.get('@saveButton').click();

      cy.wait('@postRequest', {timeout: 10000}).its('response.statusCode').should('equal', 200);
    });


    it('should retrieve data via GET request', () => {
      cy.visit(`http://localhost:3001/vehicle-config?tab=1`);
      cy.intercept('GET', 'http://192.168.0.97:4000/vehicles-type/list', { 
        fixture:'getVehCategory.json',
        statusCode: 200,
      }).as('getRequest');
  
      cy.wait('@getRequest').its('response.statusCode').should('equal', 200);
    })
  }) 
