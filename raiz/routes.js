import { Router } from "express";
import { createTable, insertCadastro, updateCadastro, selectCadastros, selectCadastro, deleteCadastro } from './Controler/cadastro.js';

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "api funcionando"
    })
})

router.get('/cadastros', selectCadastros);
router.get('/cadastro', selectCadastro);
router.post('/cadastro', insertCadastro);
router.put('/cadastro', updateCadastro);
router.delete('/cadastro', deleteCadastro);

export default router;