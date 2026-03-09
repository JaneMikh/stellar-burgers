const burgerConstructor = '[data-cy="burger-constructor"]';
const upperBunInConstructor = '[data-cy="constructor-upper-bun"]';
const mainInConstructor = '[data-cy="constructor-ingredients"]';
const lowerBunInConstructor = '[data-cy="constructor-lower-bun"]';
const modalCloseButton = '[data-cy="modal-close"]';
const modalOverlay = '[data-cy="modal-overlay"]';
const orderButton = '[data-cy="order-button"]';
const orderNumber = '[data-cy="order-number"]';

const firstBunId = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`; // Краторная булка N-200i
const secondBunId = `[data-cy=${'643d69a5c3f7b9001cfa093d'}]`; // Флюоресцентная булка R2-D3
const mainId = `[data-cy=${'643d69a5c3f7b9001cfa093e'}]`; // Филе Люминесцентного тетраодонтимформа
const saurceId = `[data-cy=${'643d69a5c3f7b9001cfa0944'}]`; // Соус традиционный галактический

beforeEach(() => {
  // === Перехват запросов === //
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'post-order.json' }).as('postOrder');
  
  cy.visit('/');
  cy.viewport(1920, 1080);
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

  it('Закрытие модального окна по клику на "крестик"', function () {
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

describe('Тестирование создания заказа', function () {
  this.beforeEach(() => {
    window.localStorage.setItem('refreshToken',JSON.stringify('testRefreshToken'));
    cy.getAllLocalStorage().should('be.not.empty');

    cy.setCookie('accessToken', 'testAccessToken');
    cy.getCookie('accessToken').should('be.not.empty');
  });

  this.afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.getAllLocalStorage().should('be.empty');
    cy.getAllCookies().should('be.empty');
  });

  it('Сборка и офросление заказа', function () {
    // Сборка бургера
    cy.get(firstBunId).children('button').click();
    cy.get(mainId).children('button').click();
    cy.get(saurceId).children('button').click();
  
    // Вызывается клик по кнопке «Оформить заказ»
    cy.get(orderButton).click();
    cy.wait('@postOrder');

    // Проверяется, что модальное окно открылось и номер заказа верный
    cy.get('#modals').should('be.not.empty');
    cy.get(orderNumber).contains('100100').should('exist');

    // Закрывается модальное окно и проверяется успешность закрытия
    cy.get(modalCloseButton).click();
    cy.get('#modals').should('be.not.visible');

    // Проверяется, что конструктор пуст
    cy.get(burgerConstructor).should('not.contain', 'Краторная булка N-200i');
    cy.get(burgerConstructor).should('not.contain', 'Филе Люминесцентного тетраодонтимформа');
    cy.get(burgerConstructor).should('not.contain', 'Соус традиционный галактический');
  });
});