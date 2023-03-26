/// <reference types="cypress" />

import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'


describe("login", () => {

  context("quando submeto o formulário", () => {
    it("deve logar com sucesso", () => {
      const user = {
        name: "Teste",
        email: "teste123@gmail.com",
        password: "teste123",
      };

      loginPage.submit(user.email, user.password)
      shaversPage.header.userShouldBeLoggedIn(user.name)
      

      
    });

    it("Não deve logar com senha incorreta", () => {
      const user = {
        name: "Teste",
        email: "teste123@gmail.com",
        password: "teste123456",
      };

      loginPage.submit(user.email, user.password)

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";

      loginPage.noticeShouldBe(message)
    });

    it("Não deve logar com email não cadastrado", () => {
      const user = {
        name: "Teste",
        email: "teste404@gmail.com",
        password: "teste123456",
      };

      loginPage.submit(user.email, user.password)

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";

      loginPage.noticeShouldBe(message)
    });

    it('campos obrigatórios', ()=> {
      loginPage.submit()
      loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')

      
    })
  })

  context('senha muito curta', ()=> {

    const passwords = [
      '1',
      '12',
      '123',
      '1234',
      '12345'
    ]

    passwords.forEach((p)=> {
      it('não deve logar com senha ' + p, ()=> {
        loginPage.submit('teste123@gmail.com', p)
        loginPage.alertShouldBe('Pelo menos 6 caracteres')        
      })
    })
  })

  context('email no formato incorreto', ()=> {

    const emails = [
      'teste&gmail.com',
      'teste.com.br',
      '@gmail.com',
      '@',
      'teste@',
      '123456789',
      '@#!@#!#@!',
      'xpto123'
    ]

    emails.forEach((e)=> {
      it('E-mail' + e + 'não é válido!', ()=> {
        loginPage.submit(e, 'teste123') 
        loginPage.alertShouldBe('Informe um email válido')     
      })
    })
  })





})
