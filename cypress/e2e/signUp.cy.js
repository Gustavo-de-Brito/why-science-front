import { faker } from '@faker-js/faker';

describe('Testes das rotas de autenticação', () => {
  it('deve mostrar um alert quando as senhas não são iguais', () => {
    cy.visit('http://localhost:3000/sign-up');

    cy.get('[data-cy="name"]').type(faker.name.fullName());
    cy.get('[data-cy="email"]').type(faker.internet.email());
    cy.get('[data-cy="password"]').type(faker.internet.password());
    cy.get('[data-cy="confirm-password"]').type(faker.internet.password());
    cy.get('[data-cy="image-url"]').type(faker.image.abstract());

    cy.get('[data-cy="register-button"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('As senhas devem ser iguais');
    });
  });

  it('deve mostrar um alert quando a url da imagem é inválida', () => {
    const password = faker.internet.password();
    cy.visit('http://localhost:3000/sign-up');

    cy.get('[data-cy="name"]').type(faker.name.fullName());
    cy.get('[data-cy="email"]').type(faker.internet.email());
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="confirm-password"]').type(password);
    cy.get('[data-cy="image-url"]').type(faker.internet.url());

    cy.get('[data-cy="register-button"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('A URL da imagem é inválida');
    });
  });

  it('deve mostar um alert de erro genérico em caso de erro na API', () => {
    const password = faker.internet.password();
    cy.intercept(
      'POST',
      '**/sign-up',
      { statusCode: 500 }
    ).as('getServerFailure');
    
    cy.visit('http://localhost:3000/sign-up');

    cy.get('[data-cy="name"]').type(faker.name.fullName());
    cy.get('[data-cy="email"]').type(faker.internet.email());
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="confirm-password"]').type(password);
    cy.get('[data-cy="image-url"]').type(faker.image.abstract());

    cy.get('[data-cy="register-button"]').click();

    cy.wait('@getServerFailure');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Não foi possível realizar o cadastro');
    });
  });

  it('deve redirecionar o usuário a página de login', () => {
    const password = faker.internet.password();
    cy.intercept(
      'POST',
      '**/sign-up',
      { statusCode: 201 }
    ).as('userRegistered');
    
    cy.visit('http://localhost:3000/sign-up');

    cy.get('[data-cy="name"]').type(faker.name.fullName());
    cy.get('[data-cy="email"]').type(faker.internet.email());
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="confirm-password"]').type(password);
    cy.get('[data-cy="image-url"]').type(faker.image.abstract());

    cy.get('[data-cy="register-button"]').click();

    cy.wait('@userRegistered');

    cy.url().should('equal', 'http://localhost:3000/');
  });
});