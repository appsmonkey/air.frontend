import faker from "faker";

describe("Add device", () => {
  beforeEach(() => {
    const emailValue = Cypress.env("email");
    const passwordValue = Cypress.env("password");

    cy.login(emailValue, passwordValue);
    cy.visit("/dashboard");
  });
  it("succesfully performs add device action", () => {
    const device = {
      name: faker.random.words()
    };

    cy.visit("/dashboard/devices/new");
    cy.url().should("include", "/dashboard/devices/new");
    cy.get("[data-cy=name]")
      .type(device.name)
      .should("have.value", device.name);
    cy.get("[data-cy=type]")
      .first()
      .check();
    cy.get("[data-cy=submit]").click();
    cy.url().should("include", "/dashboard");
    cy.contains(device.name);
  });
});
