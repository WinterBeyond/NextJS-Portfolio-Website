describe("Landing page", () => {
  it("should load the landing page", () => {
    cy.request("http://localhost:3000/").its("status").should("equal", 200);
  });

  it("should render spotify songs", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#spotify-songs").should("exist");
  });
});
