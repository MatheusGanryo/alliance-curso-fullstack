import {Router} from "express";
import {Client} from "pg";

const router = Router();

router.get('/', async(req, res) => {
    let resultado = [];
    const client = criaClient();
    await client.connect();

    let queryResult = await client.query("select CODIGO, DESCRICAO from ATIVOS");
    for (let row of queryResult.rows) {
        resultado.push({
            codigo: row.codigo,
            descricao: row.descricao,
        });
    };
    await client.end();
    res.send(JSON.stringify(resultado));
});

router.post('/', async(req, res) => {
    let payload = req.body;
    let sql = `insert into ATIVOS (CODIGO, DESCRICAO) values
    ('${payload.codigo}','${payload.descricao}')
    `;
    console.log(sql);
    const client = criaClient();
    await client.connect();
    await client.query(sql);
    client.end();

    res.status(201);
    res.send();
});

router.put('/:codigo', async(req, res) => {
    let codigo = req.params.codigo;
    let payload = req.body;
    let sql = `update ATIVOS set
        DESCRICAO = '${payload.descricao}'
    where
        CODIGO = '${codigo}'
    `;
    const client = criaClient();
    await client.connect();
    await client.query(sql);
    client.end();

    res.status(204);
    res.send();
});

router.delete('/:codigo', async(req, res) => {
    let codigo = req.params.codigo;
    let sql = `delete from ATIVOS
    where
        CODIGO = '${codigo}'
    `;

    const client = criaClient();
    await client.connect();
    await client.query(sql);
    client.end();

    res.status(204);
    res.send();
});

function criaClient() {
    return new Client({
        user: "dia3",
        host: "localhost",
        database: "db_teste",
        password: '123',
        port: 5432
    });
};

export default router;