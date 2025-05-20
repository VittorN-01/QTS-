const express = require('express')
const cors = require('cors')
const math = require('mathjs')


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
        res.status(400).json({erro: 'expressão inválida' })
   }
});

module.exports = app;



