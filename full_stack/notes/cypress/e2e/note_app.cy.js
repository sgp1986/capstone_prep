describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http:localhost:3002/api/testing/reset');
    const user = {
      username: 'test',
      name: 'Test Admin',
      password: 'admintest'
    };
    cy.request('POST', 'http:localhost:3002/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023');
  });

  it('login for can be openend', function() {
    cy.contains('log in').click();
  });

  it('user can login', function() {
    cy.contains('log in').click();
    cy.get('#username').type('test');
    cy.get('#password').type('admintest');
    cy.get('#login-button').click();

    cy.contains('Test Admin logged in');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'admintest' });
    });

    it('a new note can be created', function() {
      cy.contains('new note').click();
      cy.get('#note').type('test note created by cypress');
      cy.get('#save-button').click();
      cy.contains('test note created by cypress');
    });

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createNote({
          content: 'test note created by cypress',
          important: true
        });
      });

      it('it can be made not important', function() {
        cy.contains('test note created by cypress')
          .contains('make not important')
          .click();

        cy.contains('test note created by cypress')
          .contains('make important');
      });
    });

    describe('and several notes exist', function() {
      beforeEach(function() {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', function() {
        cy.contains('second note')
          .contains('make important')
          .click();

        cy.contains('second note')
          .contains('make not important');
      });
    });
  });

  it('login fails with wrong password', function() {
    cy.contains('log in').click();
    cy.get('#username').type('test');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error').should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Test Admin logged in');
  });
});
