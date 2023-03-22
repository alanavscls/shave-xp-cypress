/// <reference types="cypress" />

describe("login", () => {
  context("quando submeto o formulário", () => {
    it("deve logar com sucesso", () => {
      const user = {
        name: "Teste",
        email: "teste123@gmail.com",
        password: "teste123",
      };

      cy.visit("http://localhost:3000/");

      cy.get("input[placeholder$=email]").type(user.email);
      cy.get("input[placeholder*=senha]").type(user.password);

      cy.contains("button", "Entrar").click();

      cy.get(".logged-user div a")
        .should("be.visible")
        .should("have.text", "Olá, " + user.name);
    });

    it("Não deve logar com senha incorreta", () => {
      const user = {
        name: "Teste",
        email: "teste123@gmail.com",
        password: "teste123456",
      };

      cy.visit("http://localhost:3000/");

      cy.get("input[placeholder$=email]").type(user.email);
      cy.get("input[placeholder*=senha]").type(user.password);

      cy.contains("button", "Entrar").click();

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";

      cy.get(".notice-container")
        .should("be.visible")
        .find(".error p")
        .should("have.text", message);
    });

    it("Não deve logar com email não cadastrado", () => {
      const user = {
        name: "Teste",
        email: "teste404@gmail.com",
        password: "teste123456",
      };

      cy.visit("http://localhost:3000/");

      cy.get("input[placeholder$=email]").type(user.email);
      cy.get("input[placeholder*=senha]").type(user.password);

      cy.contains("button", "Entrar").click();

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";

      cy.get(".notice-container")
        .should("be.visible")
        .find(".error p")
        .should("have.text", message);
    });
  });
});
