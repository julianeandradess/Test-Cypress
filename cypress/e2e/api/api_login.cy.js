/// <reference types='Cypress'/>

describe('API - Teste Funcional de Login', () => {
    it('Deve realizar o login com sucesso', () => {
        cy.request({   //iremos fazer o back, precisamos da requisição
            method: 'POST',
            url: 'http://localhost:3000/login', //foi o local da api + endpoint
            body: {
                "email": "fulano@qa.com",
                "password": "teste"
            }
        }).then((Response) =>{   //criaremos uma primicia(then = então), e usaremos o Response pra confirmar o status(200)
            expect(Response.status).to.equal(200)
            expect(Response.body.message).to.equal('Login realizado com sucesso')
        })
    
    });

    it('Deve validar senha Incorreta', () => {
        cy.request({   //iremos fazer o back, precisamos da requisição
            method: 'POST',
            url: 'http://localhost:3000/login', //foi o local da api + endpoint
            body: {
                "email": "fulano@qa.com",
                "password": "teste1"
            },
            failOnStatusCode: false //é para justamente não quebrar nosso teste mas alertar que está incorreto
        }).then((Response) =>{   //criaremos uma primicia(then = então), e usaremos o Response pra confirmar o status(200)
            expect(Response.status).to.equal(401)
            expect(Response.body.message).to.equal('Email e/ou senha inválidos')
        })
    });
});