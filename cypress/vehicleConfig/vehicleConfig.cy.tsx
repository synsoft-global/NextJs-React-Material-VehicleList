import CategoryList from '@/pages/vehicle-config/component/categoryList/CategoryList.component';
import CategoryForm from '@/pages/vehicle-config/component/categoryForm/CategoryForm.component';
import { Provider } from 'react-redux';
import { store } from '../../lib/redux/store/store'; 



describe('Profile testing functionality', () => {
  beforeEach(() => {
    cy.wrap(<Provider store={store}><CategoryList /></Provider>).as('component');
    cy.mount(<Provider store={store}><CategoryList/></Provider>);
  });

  it('Should  go to vehichle management page and test functionality ', () => {
    cy.intercept({
      method: 'POST',
      url: `http://192.168.0.97:4000/vehicles-category/create`,
    }).as('vehicle');
  });

  it('Should  go to vehichle management page and test functionality ', () => {
    cy.intercept({
      method: 'GET',
      url: `http://192.168.0.97:4000/vehicles-category/list`,
    }).as('List');
  })

});