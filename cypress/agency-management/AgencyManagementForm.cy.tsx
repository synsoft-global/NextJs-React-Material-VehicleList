import AgencyManagementForm from '@/pages/agency-management/component/AgencyManagementForm.component';
import { Provider } from 'react-redux';
import { store } from '../../lib/redux/store/store'; 
const mode = 'add'

describe('Profile testing functionality', () => {
  beforeEach(() => {
    cy.wrap(<Provider store={store}><AgencyManagementForm mode={mode}/></Provider>).as('component');
    cy.mount(
      <Provider store={store}>
        <AgencyManagementForm mode={mode}/>
      </Provider>);
  });

  it('Should  go to vehichle management page and test functionality ', () => {
    cy.intercept({
      method: 'POST',
      url: `http://192.168.0.97:4000/vehicles-category/create`,
    }).as('vehicle');
  });

  // it('Should  go to vehichle management page and test functionality ', () => {
  //   cy.intercept({
  //     method: 'GET',
  //     url: `http://192.168.0.97:4000/vehicles-category/list`,
  //   }).as('List');
  // })

});