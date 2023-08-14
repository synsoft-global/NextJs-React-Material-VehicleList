describe('Test value page', () => {
  const CategoryName = 'Drive';
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

    cy.visit('http://localhost:3001/vehicle-config/add-category');
    cy.get('#my-category-field').as('categoryFieldName');
    cy.get('.is-active-field').as('checkedInput');
    cy.get('[type="submit"]').contains('Save').as('saveButton');
  });

    it('should retrieve data via GET request', () => {
      cy.intercept('POST', 'http://192.168.0.97:4000/vehicles-category/create', { 
        fixture:'category.json',
        statusCode: 200,
      }).as('postRequest');


    cy.visit('http://localhost:3001/vehicle-config/add-category');
      cy.get('@categoryFieldName').type(CategoryName); 
      cy.get('@checkedInput').click();
      cy.get('@saveButton').click();

      cy.wait('@postRequest', {timeout: 10000}).its('response.statusCode').should('equal', 200);
      cy.visit(`http://localhost:3001/vehicle-config`);
    });


    it('should retrieve data via GET request', () => {
      cy.visit(`http://localhost:3001/vehicle-config?tab=0`);
      cy.intercept('GET', 'http://192.168.0.97:4000/vehicles-category/list', { 
        fixture:'getVehCategory.json',
        statusCode: 200,
      }).as('getRequest');
  
      cy.wait('@getRequest').its('response.statusCode').should('equal', 200);
    })  
})