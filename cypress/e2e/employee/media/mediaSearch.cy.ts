describe("Media Search Page", () => {
  before(() => {
    cy.loginEmployee(1, "password1");
  });

  it("renders media table with search and pagination", () => {
    cy.visit("/media/search");

    cy.get('input[placeholder="Suche nach Titel..."]').type("Business-focused");
  });
});
