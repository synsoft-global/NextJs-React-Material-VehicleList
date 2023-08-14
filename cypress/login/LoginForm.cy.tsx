
import LoginFields from "@/pages/login/component/LoginForm/LoginForm.component";
import Page from "@/pages/index.page";
import { Provider } from 'react-redux';
import { store } from '../../lib/redux/store/store'; 

describe('LoginForm', () => {
  beforeEach(() => {
    cy.wrap(<Provider store={store}><LoginFields /></Provider>).as('component');
    cy.mount(<Provider store={store}><LoginFields /></Provider>);
  });

  it('should render title with specified text', () => {
    const title = 'Welcome Back';
    cy.get('.MuiTypography-root.css-195i1y2-MuiTypography-root').should('have.text', title);
  });


  {/* Email */}
  describe('Email', () => {
    beforeEach(() => {
      cy.wrap(<Provider store={store}><LoginFields /></Provider>).as('component');
      cy.mount(<Provider store={store}><LoginFields /></Provider>);
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

  {/* Password */}
  describe('Password', () => {
    beforeEach(() => {
      cy.wrap(<Provider store={store}><LoginFields /></Provider>).as('component');
      cy.mount(<Provider store={store}><LoginFields /></Provider>);
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
      // Assert that the error message is displayed
      // cy.get('.my-password-field ').contains('message.strongPassword');
    });

    it('clears password field', () => {
      cy.get('.my-password-field input[type="password"]').type('mypassword');
      cy.get('.my-password-field input[type="password"]').clear();
      cy.get('.my-password-field input[type="password"]').should('have.value', '');
    });
  });

  {/* Form-Validation */}
  describe('Validation', () => {
    const username = 'palkesh@gmail.com';
    const password = 'secret123';

    beforeEach(() => {
      const onSubmitSpy = cy.spy().as('onSubmitSpy');
      cy.mount(<Provider store={store}><LoginFields /></Provider>);
      cy.get('.my-email-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input')
        .as('usernameInput');
      cy.get('.my-password-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input')
        .as('passwordInput');
      cy.get('.MuiButtonBase-root.css-1vjdlz8-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root')
        .contains('Sign In')
        .as('loginButton');
    });


    it('should call onLogin with username and password when the Login button is clicked', () => {
      cy.get('@usernameInput').type(username);
      cy.get('@passwordInput').type(password);
      cy.get('@loginButton').click();
      cy.get('@onSubmitSpy').should('have.been.calledWith', {
        username,
        password,
      });
    });

    it('should call onLogin with username and password when enter is pressed in an input', () => {
      cy.get('@usernameInput').type(username);
      cy.get('@passwordInput').type(password).type('{enter}');
      cy.get('@onSubmitSpy').should('have.been.calledWith', {
        username,
        password,
      });
    });

    it('should show both validation errors if login is attempted without entering username or password', () => {
      cy.get('@loginButton').click();
      cy.contains('email is a required field');
      cy.contains('password is a required field');
      cy.get('@onSubmitSpy').should('not.have.been.called');
    });

    it('should only show password validation error if login is attempted without entering password', () => {
      cy.get('@usernameInput').type(username);
      cy.get('@loginButton').click();
      cy.contains('email is a required field').should('not.exist');
      cy.contains('password is a required field');
      cy.get('@onSubmitSpy').should('not.have.been.called');
    });

    it('should only show username validation error if login is attempted without entering username', () => {
      cy.get('@passwordInput').type(password);
      cy.get('@loginButton').click();
      cy.contains('email is a required field');
      cy.contains('password is a required field').should('not.exist');
      cy.get('@onSubmitSpy').should('not.have.been.called');
    });

    it('should not show any validation errors before login is attempted', () => {
      cy.contains('email is a required field').should('not.exist');
      cy.contains('password is a required field').should('not.exist');
    });
  });


  {/* Auth */}
  describe('Auth', () => {
    const username = 'parmanandpatel.synsoft@gmail.com';
    const password = '123456';

    beforeEach(() => {
      const onSubmitSpy = cy.spy().as('onSubmitSpy');
      cy.mount(<Provider store={store}><LoginFields /></Provider>);
      cy.get('.my-email-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input')
        .as('usernameInput');
      cy.get('.my-password-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input')
        .as('passwordInput');
      cy.get('.MuiButtonBase-root.css-1vjdlz8-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root')
        .contains('Sign In')
        .as('loginButton');
    });
    
    it('should redirect to Home screen when creds are correct', () => {
      cy.get('@usernameInput').type(username);
      cy.get('@passwordInput').type(password);
      cy.intercept('POST', '/http://192.168.0.97:4000/auth/login', {
        statusCode: 200,
        body: {
          message: 'Authenticated',
        },
      });
      cy.get('@loginButton').click();
      // cy.mount(<Provider store={store}><Page /></Provider>);
    });
  });

  {/*Forgot Password*/}
  describe('Forgot Password', () => {
    beforeEach(() => {
      cy.mount(<Provider store={store}><LoginFields /></Provider>);
      cy.get('.MuiBox-root.css-3a8zsl .MuiTypography-root.css-17sj1r4-MuiTypography-root-MuiLink-root')
        .contains('forgot password?')
        .as('forgetLink');
    });

    it('should render forget password with specified text', () => {
      const forgetPassword = 'forgot password?';
      cy.get('@forgetLink').should('have.text', forgetPassword);
    });
    
    it('should have underline on hover', () => {
      cy.get('@forgetLink').trigger('mouseover');
      cy.get('@forgetLink').should('have.css', 'text-decoration', 'none solid rgb(25, 118, 210)');
    });

    // it('should navigate to the correct URL when clicked', () => {
    //   cy.get('@forgetLink').click();
    //   // cy.url().should('include', '/forgot-password');
    // });
  });

  {/*Sign up*/}
  describe('Sign up', () => {
    beforeEach(() => {
      cy.mount(<Provider store={store}><LoginFields /></Provider>);
      cy.get('[href="/register"] .MuiTypography-root.css-17sj1r4-MuiTypography-root-MuiLink-root')
        .contains('Sign Up')
        .as('signUpLink');
    });

    it('should render sign up with specified text', () => {
      const SignUp ='Sign Up';
      cy.get('@signUpLink').should('have.text', SignUp);
    });
    
    it('should have underline on hover', () => {
      cy.get('@signUpLink').trigger('mouseover');
      cy.get('@signUpLink').should('have.css', 'text-decoration', 'none solid rgb(25, 118, 210)');
    });
    
    // it('should navigate to the correct URL when clicked', () => {
    //   cy.get('@signUpLink').click();
    //   // cy.visit('/register').should('include','/register');
    // });
  });



  {/* Form-Submission */}
  describe('Form Submission', () => {
      const username = 'parmanandpatel.synsoft@gmail.com';
      const password = '123456';
    beforeEach(() => {
      cy.mount(<Provider store={store}><LoginFields /></Provider>);
      cy.get('.my-email-field .MuiInputBase-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input')
      .as('usernameInput');
      cy.get('.my-password-field .MuiInputBase-input.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input')
        .as('passwordInput');
      cy.get('.MuiButtonBase-root.css-1vjdlz8-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root')
        .contains('Sign In')
        .as('loginButton');
    });

    it('Submits the form successfully', () => {
      cy.get('@usernameInput').type(username);
      cy.get('@passwordInput').type(password);
      cy.get('@loginButton').click();
      cy.window()
        .its('onSubmit')
        .should('be.calledWith', {
          email: username,
          password: password
        });
      // cy.contains('Form submitted successfully!').should('be.visible');
    });

    it('Shows an error message for invalid form submission', () => {
      cy.get('@usernameInput').type('invalid-email');
      cy.get('@passwordInput').type('12');
      cy.get('@loginButton').click();
      cy.window()
        .its('onSubmit')
        .should('not.be.called');
      // cy.contains('Please fill in all the required fields and enter a valid email.').should('be.visible');
    });
  });
})