// User Story #1: User should be able to check homepage of Menu-Project App (http://localhost:8000).
// User Story #2: User should be able to see a page title called "Menu-Project App".
// User Story #3: User should be able to list between three kind of daily dishes: Starter list, Main list and Dessert list.
// User Story #4: User should be able to check Name, Price and Description for each of the dishes, in an info card.
// User Story #5: User should be able to select a dish, clicking an "Add to menu" button. After selecting it, user should be able to see the dish added to the menu list.
// User Story #6: Adding a dish to the menu list, user should be able to see the total price updated.

describe("Menu-Project App page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("As a User I can navigate to homepage of Menu-Project App", () => {
    cy.get(".title").contains("Menu - Project App");
  });

  it("As a User I can check three lists of daily dishes: Starter list, Main list and Dessert list", () => {
    cy.get(".starter-list")
      .children()
      .should("have.length.of.at.least", "1");
    cy.get(".main-list")
      .children()
      .should("have.length.of.at.least", "1");
    cy.get(".dessert-list")
      .children()
      .should("have.length.of.at.least", "1");
  });

  it("As a User I can check Name and Price for each of the dishes, in an info card", () => {
    cy.get(".starter-list").select("Starter name");
    cy.get(".dish-card").within(() => {
      cy.get(".dish-name").contains("Starter Name");
      cy.get(".dish-price").contains("€ 7,50");
    });
  });

  it("As a User I can select a dish from a list. Then I can click an 'Add to menu' button in the info card and I should be able to see the dish added to the menu list", () => {
    cy.get(".starter-list").select("Starter name");
    cy.get(".dish-card")
      .find(".button")
      .contains("Add to menu")
      .click();
    cy.get(".menu-list").within(() => {
      cy.get("ul.menu-dishes li").should($lis => {
        expect($lis).to.have.length(1);
        expect($lis.eq(0)).to.contain("Starter name");
      });
    });
  });

  it("As a User I can add a dish to the menu list and I should be able to see the total price updated", () => {
    cy.get(".starter-list").select("Starter name");
    cy.get(".dish-card")
      .find(".button")
      .contains("Add to menu")
      .click();
    cy.get(".menu-list").within(() => {
      cy.get(".total-price").contains("€ 7,50");
    });
  });
});
