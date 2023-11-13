// mediaCreatePage.spec.js

describe("Media Create Page", () => {
  beforeEach(() => {
    cy.loginEmployee(1, "password1");
    cy.visit("/media/create");
  });

  it("should create a new media", () => {
    cy.get('input[name="mediaTitle"]').type("Sample Media Title");
    cy.get('textarea[name="mediaContent"]').type("Sample Media Content");
    cy.get('input[name="mediaISBN"]').type("1234567890");

    // Selecting an author
    cy.get("#authorModalBtn").click();

    // Select the first row in the table
    cy.get("#modal-author-table")
      .find("tbody tr")
      .first()
      .click({ force: true });

    // Selecting a location
    cy.contains("auswählen").click();

    // Selecting an author
    cy.get("#locationModalBtn").click();

    // Select the first row in the table
    cy.get("#modal-location-table")
      .find("tbody tr")
      .first()
      .click({ force: true });

    cy.contains("auswählen").click();

    // Click the "Erstellen" button
    cy.contains("erstellen").click();

    // Assert that the success message is displayed
    //cy.contains("Medium erfolgreich erstellt!").should("be.visible");
  });
});
