describe("Log In", () => {
  it("succesfully performs login action", () => {
    const emailValue = Cypress.env("email");
    const passwordValue = Cypress.env("password");

    cy.visit("/login");
    cy.get("[data-cy=email]")
      .type(emailValue)
      .should("have.value", emailValue);
    cy.get("[data-cy=password]")
      .type(passwordValue)
      .should("have.value", passwordValue);
    cy.get("[data-cy=submit]").click();
    cy.url().should("include", "/dashboard");
  });
});
