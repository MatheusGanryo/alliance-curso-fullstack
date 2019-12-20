import {Router} from 'express';
import { Client } from 'pg';

const router = Router();

router.get('/', async (req, res) => {
    let resultado = [];
    const client = criaClient();

    await client.connect();
    let queryResult = await client.query("select codigo_ativo, quantidade, preco_medio from public.carteira");
    for (let row of queryResult.rows) {
        resultado.push({
            codigo_ativo: row.codigo_ativo,
            quantidade: row.quantidade,
            preco_medio: row.preco_medio,

        });
        console.log(resultado[-1]);
    }
    await client.end();
    

    res.send(JSON.stringify(resultado));
});

// Entrada é:
// payload = {nome: string, telefone: strsring, email: string, saldoCreditos: numerico}
router.post('/', async (req, res) => {
    let payload = req.body;
    let sql = `insert into CARTEIRA (codigo_ativo, quantidade, preco_medio) VALUES
    ('${payload.codigo_ativo}','${payload.quantidade}','${payload.preco_medio}')
    `;

    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(201);
    res.send();
})

router.put('/:codigo_ativo', async (req, res) => {
    let codigo_ativo = req.params.codigo_ativo;
    let payload = req.body;

    let sql = `update CARTEIRA SET
        quantidade = '${payload.quantidade}',
        preco_medio = '${payload.preco_medio}'
    where
        codigo_ativo = ${codigo_ativo}
    `;

    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(204);
    res.send();
})


function criaClient() {
    return new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'db_teste',
        password: '123',
        port: 5432
    });
}

router.delete('/:codigo_ativo', async(req, res) => {
    let codigo_ativo = req.params.codigo_ativo;
    let sql = `delete from CARTEIRA
    where
        codigo_ativo = '${codigo_ativo}'
    `;

    const client = criaClient();
    await client.connect();
    await client.query(sql);
    client.end();

    res.status(204);
    res.send();
});
export default router;