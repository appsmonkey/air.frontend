Cypress.Commands.add("login", (email, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/auth/login`,
    body: {
      email: email,
      password: password
    }
  }).then(data => {
    const { id_token } = data.body.data;
    const { refresh_token } = data.body.data;

    localStorage.setItem("id_token", id_token);
    localStorage.setItem("refresh_token", refresh_token);
  });
});
