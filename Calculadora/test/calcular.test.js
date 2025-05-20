const request = require('supertest')
const app = require('../server.js')

describe('POST/calcular', () => {
    it('teste do servidor calcular', async () => {
        const res = await request(app)
            .post('/calcular')
            .send({ expressao : '5+5' });
    
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('resultado', 10);
    })
})

/*
test('Calcular', ()=>{
    const expressao = '5+5';
    const resultado = math.evaluate(expressao);
    expect(resultado).toBe(10)
})

*/