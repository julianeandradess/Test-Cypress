/// <reference types= "Cypress"/>

describe('Teste E2S - Realizando a compra de produtos com sucesso', () => {
    it('Fluxo da compra de produtos', () => {
        cy.login_teste('standard_user', 'secret_sauce')
        cy.get('[data-test="title"]').should('contain', 'Products')

        //Ordenação de produtos do menor para o maior valor
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)') //seleciona para poder clicar onde quer

        //checagem de o produto está na ordem
        cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Onesie')
        cy.get(':nth-child(2) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bike Light')
        cy.get(':nth-child(3) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bolt T-Shirt')
        cy.get(':nth-child(4) > [data-test="inventory-item-description"]').should('contain', 'Test.allTheThings() T-Shirt (Red)')
        cy.get(':nth-child(5) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Backpack')
        cy.get(':nth-child(6) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Fleece Jacket')
        
        //adicionando produtos ao carrinho
        cy.contains('Sauce Labs Onesie').click()
        cy.get('.btn_primary').click() // o . usamos pra trazer classes e # usamos pra id
        
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bike Light').click()
        cy.get('.btn_primary').click()

        cy.get('[data-test="back-to-products"]').click()
        
        cy.contains('Sauce Labs Bolt T-Shirt').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        //checagem para verificar se os produtos estão no carrinho
        //usaremos o have pois o conteins talvez dê um falso positivo, pois poderia trazer um 43 e de fato não ta errado
        cy.get('[data-test="shopping-cart-link"]').should('have.text', '3').click()

        //checagem do que tem no carrinho:
        cy.VerificandoProdutos()
        
        //checkout
        cy.Checkouts('Teste Primeiro Nome','Teste Segundo Nome','21212121')

        //checagem de finalização de compra dos produtos
        cy.VerificandoProdutos()
        //checagem do valor total da compra
        cy.get('[data-test="total-label"]').should('have.text', 'Total: $36.69') 
        //finalizou
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')
    });
});