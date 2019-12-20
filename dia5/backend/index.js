import express from 'express';
import cors from 'cors';

import Carteira from './carteira';
import Ativos from './ativos';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/carteira', Carteira);
app.use('/ativos', Ativos)

app.listen(3000, () =>
    console.log('Servidor rodando na porta 30000!'),
);