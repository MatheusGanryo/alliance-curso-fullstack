//Bicicletas 
import {Router} from 'express';
import { Client } from 'pg';

const router = Router();


router.get('/', async (req, res) => {
    let resultado = [];
    const client = criaClient();

    await client.connect();
    let queryResult = await client.query("select CODIGO, ativo from public.bicicletas");

    for (let row of queryResult.rows) {
        resultado.push({
            codigo: row.codigo,
            ativo: row.ativo
        })
        ;
        console.log(resultado[-1]);
    }
    await client.end();

    res.send(JSON.stringify(resultado));
});


router.put("/:codigo", async(req,res) =>{
    let codigo = req.params.codigo;
    let payload = req.body;

    let sql =`update BICICLETAS SET 
    ATIVO ='${payload.ativo}'
    WHERE 
    CODIGO = '${codigo}'
    `;
    console.log(sql);
    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();


    res.status(204);
    res.send();

})


router.post('/', async (req, res) => {
    let payload = req.body;
    let sql = `insert into bicicletas (CODIGO, ativo) VALUES('${payload.codigo}','${payload.ativo}')
    `;
console.log(sql)
    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(201);
    res.send();
})


router.delete('/:codigo', async(req,res) =>{
    let codigo = req.params.codigo;

    let sql =`delete from bicicletas 

    WHERE 
    CODIGO = '${codigo}'
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
        database: 'db_dia3',
        password: '123',
        port: 5432
    });
}
export default router;