const request = require('supertest');
const app = require('../server.js');

describe('POST /calcular', () => {
    it('deve retornar 200 e o resultado correto da expressão', async () => {
        const res = await request(app)
            .post('/calcular')
            .send({ expressao: '5+5' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('resultado', 10);
    });
    it('deve retornar 400 para expressão inválida', async () => {
    const res = await request(app)
        .post('/calcular')
        .send({ expressao: '5+*5' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erro');
    });
});
