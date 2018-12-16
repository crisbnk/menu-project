// User Story #1: User should be able to check homepage of Menu-Project App (http://localhost:8000).
// User Story #2: User should be able to see a page title called "Menu-Project App".
// User Story #3: User should be able to list between three kind of daily dishes: Starter list, Main list and Dessert list.
// User Story #4: User should be able to check Name, Price and Description for each of the dishes, in an info card.
// User Story #5: User should be able to select a dish, clicking an "Add to menu" button. After selecting it, user should be able to see the dish added to the menu list.
// User Story #6: Adding a dish to the menu list, user should be able to see the total price updated.

describe("Membership price page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("As a User I can navigate to homepage of Menu-Project App", () => {
    cy.get(".title").contains("Menu - Project App");
  });

  it("As a User I can check three lists of daily dishes: Starter list, Main list and Dessert list", () => {
    cy.get(".starter-list")
      .children()
      .should("have.lenght.of.at.least", "1");
    cy.get(".main-list")
      .children()
      .should("have.lenght.of.at.least", "1");
    cy.get(".dessert-list")
      .children()
      .should("have.lenght.of.at.least", "1");
  });

  it("As a User I can check Name, Price and Description for each of the dishes, in an info card", () => {
    cy.get(".starter-list").select("Starter name");
    cy.get(".dish-card").within(() => {
      cy.get(".name").contains("Starter Name");
      cy.get(".price").contains("€ 7,50");
      cy.get(".description").contains("Dish description");
      cy.get(".button").contains("Add to menu");
    });
  });
});
