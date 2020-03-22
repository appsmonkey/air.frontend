import faker from "faker";

describe("Sign up", () => {
  it("succesfully performs signup action", () => {
    const user = {
      email: faker.internet.email(),
      password: `${faker.internet.password(8, true)}aA1!`
    };

    cy.visit("/signup");
    cy.get("[data-cy=email]")
      .type(user.email)
      .should("have.value", user.email);
    cy.get("[data-cy=gender]")
      .first()
      .check();
    cy.get("[data-cy=password]")
      .type(user.password)
      .should("have.value", user.password);
    cy.get("[data-cy=submit]").click();
    cy.url().should("include", "/dashboard");
  });
});
