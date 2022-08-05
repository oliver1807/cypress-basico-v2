/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenchimento de campos e envio de formulário', function() {
        cy.get('#firstName')
            .should('be.visible')
        .type('Irmão', {delay:0})
        cy.get('#lastName').type('Teste', {delay:0})
        cy.get('#email').type('irmao@teste.com', {delay:0})
        cy.get('#product').select('Mentoria')
        cy.get(':nth-child(3) > input').check()
        cy.get('#open-text-area').type('Ótima explicação e aula bem estruturada!', {delay:0})
        cy.get('.button').click()
        cy.get('.success').then((ajuste) => {
            let textFormato = ajuste.text().replace('\n','').trim()
                expect(textFormato).to.equal('Mensagem enviada com sucesso.')
        })
    })

    it('Teste com uso de delays', function() {
        const textLong = 'Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo'
        
        cy.get('#firstName')
            .should('be.visible').type('Irmão')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('irmao@teste.com', {delay:0})
        cy.get('#product').select('Mentoria')
        cy.get(':nth-child(3) > input').check()
        cy.get('#open-text-area').type(textLong, {delay:0})
        cy.get('.button').click()
        cy.get('.success').should('be.visible')  
    })

    it('Validação de e-mail inválido', function() {
        const textLong = 'Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo'
        
        cy.get('#firstName')
            .should('be.visible').type('Irmão')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('irmao@testecom', {delay:0})
        cy.get('#product').select('Mentoria')
        cy.get(':nth-child(3) > input').check()
        cy.get('#open-text-area').type(textLong, {delay:0})
        cy.get('.button').click()
        cy.get('.error').should('be.visible')  
    })

    it('Validação de campo que só aceita número', function() {
        cy.get('#phone')
            .type('abcdefghij')
        .should('have.value','')
    })

    it('Teste com pendência de preenchimento de telefone', function() {
        const textLong = 'Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo'
        
        cy.get('#firstName')
            .should('be.visible').type('Irmão')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('irmao@teste.com', {delay:0})
        cy.get('#product').select('Mentoria')
        cy.get(':nth-child(3) > input').check()
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(textLong, {delay:0})
        cy.get('.button').click()
        cy.get('.error').should('be.visible')  
    })
    

    it('Teste com função Clear', function() {
        
        /*Função "clear()"  limpa o conteúdo do campo, o teste abaixo valida o preenchimento
        vazio após o camo ser limpo */
        
        cy.get('#firstName')
            .should('be.visible').type('Luciano')
        .should('have.value','Luciano')
            .clear()
        .should('have.value','')        
    })

    it('Utilização de comando custmomizado', function() {
        
      cy.fillMandatoryFieldsAndSubmit(
        'Luciano',
        'Abreu',
        'cypress@teste.com',
        'Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo')

        cy.get('.success').then((ajuste) => {
            let textFormato = ajuste.text().replace('\n','').trim()
                expect(textFormato).to.equal('Mensagem enviada com sucesso.')
        })
    })

    it('Validação de upload de arquivo', function () {
        cy.get('#file-upload')
            .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Validação de upload de arquivo com drag-drop', function () {
        cy.get('#file-upload')
            .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Validação de POlítica de privacidade sem que haja abertura em nova aba', function() {
        cy.get('#privacy a')
            .invoke('removeAttr','target').click()
            cy.contains('Talking About Testing').should('be.visible')
    })



})