const upperBunInConstructor = '[data-cy="constructor-upper-bun"]';
const mainInConstructor = '[data-cy="constructor-ingredients"]';
const lowerBunInConstructor = '[data-cy="constructor-lower-bun"]';
const modalCloseButton = '[data-cy="modal-close"]';
const modalOverlay = '[data-cy="modal-overlay"]'

const firstBunId = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`; // Краторная булка N-200i
const secondBunId = `[data-cy=${'643d69a5c3f7b9001cfa093d'}]`; // Флюоресцентная булка R2-D3
const mainId = `[data-cy=${'643d69a5c3f7b9001cfa093e'}]`; // Филе Люминесцентного тетраодонтимформа
const saurceId = `[data-cy=${'643d69a5c3f7b9001cfa0944'}]`; // Соус традиционный галактический

beforeEach(() => {
  // Перехват запроса на эндпоинт 'api/ingredients’, 
  // в ответе на который возвращаются моковые данные из ingredients.json
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

  cy.visit('/');
  cy.viewport(1680, 1024); //пока так
});

describe('Тестирование на добавление ингредиентов в конcтруктор', function () {
  
  it('Добавление булок', function () {
    cy.get(firstBunId).children('button').click();
    cy.get(upperBunInConstructor).contains('Краторная булка N-200i').should('exist');
    cy.get(lowerBunInConstructor).contains('Краторная булка N-200i').should('exist');
  });

  it('Добавление булок, начинок и соусов', function () {
    cy.get(firstBunId).children('button').click();
    cy.get(upperBunInConstructor).contains('Краторная булка N-200i').should('exist');
    cy.get(lowerBunInConstructor).contains('Краторная булка N-200i').should('exist');

    cy.get(mainId).children('button').click();
    cy.get(mainInConstructor).contains('Филе Люминесцентного тетраодонтимформа').should('exist');

    cy.get(saurceId).children('button').click();
    cy.get(mainInConstructor).contains('Соус традиционный галактический').should('exist');
  });

  it('Замена булок в конструкторе', function () {
    cy.get(firstBunId).children('button').click();
    cy.get(upperBunInConstructor).contains('Краторная булка N-200i').should('exist');
    cy.get(lowerBunInConstructor).contains('Краторная булка N-200i').should('exist');

    cy.get(secondBunId).children('button').click();
    cy.get(upperBunInConstructor).contains('Флюоресцентная булка R2-D3').should('exist');
    cy.get(lowerBunInConstructor).contains('Флюоресцентная булка R2-D3').should('exist');
  });
});

describe('Тестирование модальных окон', function () {
  it('Открытие модального окна с описанием ингредиента', function () {
    cy.get('#modals').should('be.not.visible');
    cy.get(mainId).click();
    cy.get('#modals').contains('Филе Люминесцентного тетраодонтимформа').should('exist');
  });

  it('Закрытие модального окна по клику на "крестик"', () => {
    cy.get('#modals').should('be.not.visible');
    cy.get(firstBunId).click();
    cy.get('#modals').should('be.not.empty');
    cy.get(modalCloseButton).click();
    cy.get('#modals').should('be.not.visible');
  });

  it('Закрытие модального окна на overlay', function () {
    cy.get('#modals').should('be.not.visible');
    cy.get(firstBunId).click();
    cy.get('#modals').should('be.not.empty');
    cy.get(modalOverlay).click({force: true});
    cy.get('#modals').should('be.not.visible');
  });

  it('Закрытие модального окна по клику на кнопку "Escape" (опционально)', function () {
    cy.get('#modals').should('be.not.visible');
    cy.get(firstBunId).click();
    cy.get('#modals').should('be.not.empty');
    cy.get('body').trigger('keydown', { key: 'Escape' });
    cy.get('#modals').should('be.not.visible');
  });
});
