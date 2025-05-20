import express from 'express'
import cors from 'cors'
import * as math from 'mathjs'


const app = express();

app.use(cors({
    origin: 3000
}));


app.use(express.json());

app.post('/calcular', (req, res) => {
    const { expressao } = req.body;

    if (!expressao){
        return res.status(400).json({erro:"nenhuma expressao válida"}); 
    }

   try {
    const resultado = math.evaluate(expressao);
    res.json({ resultado });
   }  catch (error) {
        res.status(400)({erro: 'expressão inválida' })
   }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
