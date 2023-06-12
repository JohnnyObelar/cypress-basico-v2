/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(function(){
    cy.visit('./src/index.html')
  })
    

  it('Verifica o título da aplicação', function(){
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })


  it('Preenche os campos obrigatórios e envia o formulário', function(){
    const longText = "teste , testeteste , testeteste , testeteste , testeteste , testeteste , testeteste , testeteste , testeteste , teste"
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('teste')
    cy.get('#email').type('john@teste.com.br')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Validar mensagem de erro do email', function(){
    const longText = "teste , testeteste , testeteste , testeteste , testeteste , testeteste , testeteste , testeteste , testeteste , teste"
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('teste')
    cy.get('#email').type('john@teste,com,br')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continuar vazio, validação', function(){
    cy.get('#phone')
    .type('abcfdfgj')
    .should('have.value', '')
  })

  it('Validar campo telefone obrigatório', function(){
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('teste')
    cy.get('#email').type('john@teste.com.br')
  
    cy.get('#phone-checkbox').check()

    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('Preencha e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
    .type('John')
    .should('have.value', 'John')
    .clear()
    .should('have.value', '')

    cy.get('#lastName')
    .type('teste')
    .should('have.value', 'teste')
    .clear()
    .should('have.value', '')

    cy.get('#email')
    .type('john@teste.com.br')
    .should('have.value', 'john@teste.com.br')
    .clear()
    .should('have.value', '')

    cy.get('#phone')
    .type('12131')
    .should('have.value', '12131')
    .clear()
    .should('have.value', '')
   
  })

  it('Validar mensagem de erro dos campos obrigatórios', function(){
    cy.get('button[type="submit"]').click() 

    cy.get('.error').should('be.visible')
  })

  it('Comando customizado, enviar formulário', function(){
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('Selecione produto pela caixa de seleção', function(){
    cy.get('#product').select('YouTube')
    .should('have.value', 'youtube')

    cy.get('#product').select('mentoria')
    .should('have.value', 'mentoria')

    cy.get('#product').select(2)
    .should('have.value', 'cursos')
  })

  it('Selecione pelo radiobutton', function(){
    cy.get('input[type="radio"][value="feedback"]').check()
    .should('have.value', 'feedback')
  })

  it('Marca cada tipo de atendimento radiobutton', function(){
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio){
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('Selecione pelo checkbox', function(){
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  it('Selecione um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input){
    expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Selecione um arquivo simulando drag-and-drop', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function($input){
    expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Selecione um arquivo utilizando fixture para qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
    .selectFile('@sampleFile')
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Verificar Politica de privacidade em outra aba', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
    
  })

  it('Acessar Politica de privacidade em outra aba', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('Talking About Testing').should('be.visible')
  })
  
})