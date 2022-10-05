import { faker } from '@faker-js/faker';

describe('Testes da view de login', () => {
  beforeEach(() => {
    cy.task('db:reset');
    localStorage.removeItem('token');
  });

  it('deve mostrar um alert quando email ou senha estiverem incorretos', () => {
    const password = faker.internet.password();

    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: password,
      confirmPassword: password,
      imageUrl: faker.image.abstract()
    };

    cy.signUp(user);
    cy.intercept('POST', '**/sign-in').as('login');

    cy.visit('/');

    cy.get('[data-cy="email"]').type(user.email);
    cy.get('[data-cy="password"]').type('a-wrong-password');

    cy.get('[data-cy="login-button"]').click();

    cy.wait('@login');

    cy.on('window:alert', (str) => {
        expect(str).to.equal('Email e/ou senha inválido(s)');
    });
  });

  it('deve navegar até a página de last-questions quando há sucesso no login',
    () => {
      const password = faker.internet.password();

      const user = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: password,
        confirmPassword: password,
        imageUrl: faker.image.abstract()
      };

      cy.signUp(user);
      cy.intercept('POST', '**/sign-in').as('login');

      cy.visit('/');

      cy.get('[data-cy="email"]').type(user.email);
      cy.get('[data-cy="password"]').type(user.password);

      cy.get('[data-cy="login-button"]').click();

      cy.wait('@login');

      cy.url().should('equals', 'http://localhost:3000/last-questions');
    }
  );

  it('deve realizar o fluxo de cadastro e login e navegar até a view de last-questions',
    () => {
      const password = faker.internet.password();
      cy.intercept('POST', '**/sign-up').as('signUp');
      cy.intercept('POST', '**/sign-in').as('login');

      const user = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: password,
        confirmPassword: password,
        imageUrl: faker.image.abstract()
      };
      //sign-up process
      cy.visit('/sign-up');

      cy.get('[data-cy="name"]').type(user.name);
      cy.get('[data-cy="email"]').type(user.email);
      cy.get('[data-cy="password"]').type(user.password);
      cy.get('[data-cy="confirm-password"]').type(user.confirmPassword);
      cy.get('[data-cy="image-url"]').type(user.imageUrl);

      cy.get('[data-cy="register-button"]').click();

      cy.wait('@signUp');

      cy.url().should('equals', 'http://localhost:3000/');

      //sign-in process
      cy.get('[data-cy="email"]').type(user.email);
      cy.get('[data-cy="password"]').type(user.password);

      cy.get('[data-cy="login-button"]').click();

      cy.wait('@login');

      cy.url().should('equals', 'http://localhost:3000/last-questions');
      expect(localStorage.getItem('token')).not.to.be.undefined
    }
  );
});