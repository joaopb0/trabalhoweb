import { json } from "express";
import { openDb } from "../CfgDB.js";

export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Cadastro (ID INTEGER PRIMARY KEY, nome TEXT, sobrenome TEXT, email TEXT,senha TEXT, telefone TEXT)')
    })
}

export async function insertCadastro(req, res) {
    let cadastro = req.body
    var nome = req.body.nome
    var sobrenome = req.body.sobrenome
    var email = req.body.email
    var senha = req.body.senha
    var telefone = req.body.telefone
    if (nome == ''){
       return res.status(400).json({error: "Nome inválido"});
    }
    else if (sobrenome == ''){
        return res.status(400).json({error: "Sobrenome inválido"})
    }
    else if (email == ''){
        return res.status(400).json({error: "Email inválido"})
    }
    else if (senha == ''){
        return res.status(400).json({error: "Senha inválida"})
    }
    else if (telefone == ''){
        return res.status(400).json({error: "Telefone inválido"})
    }
    openDb().then(db => {
        db.run('INSERT INTO Cadastro (nome, sobrenome, email, senha, telefone) VALUES (?, ?, ?, ?, ?)', [cadastro.nome, cadastro.sobrenome, cadastro.email, cadastro.senha, cadastro.telefone]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function updateCadastro(req, res) {
    let cadastro = req.body;
    var nome = req.body.nome
    var sobrenome = req.body.sobrenome
    var email = req.body.email
    var senha = req.body.senha
    var telefone = req.body.telefone
    if (nome == ''){
       return res.status(400).json({error: "Alteração inválida"});
    }
    else if (sobrenome == ''){
        return res.status(400).json({error: "Alteração inválida"})
    }
    else if (email == ''){
        return res.status(400).json({error: "Alteração inválida"})
    }
    else if (senha == ''){
        return res.status(400).json({error: "Alteração inválida"})
    }
    else if (telefone == ''){
        return res.status(400).json({error: "Alteração inválida"})
    }
    openDb().then(db => {
        db.run('UPDATE Cadastro SET nome=?, sobrenome=?, email=?, senha=?, telefone=? WHERE id=?', [cadastro.nome, cadastro.sobrenome, cadastro.email, cadastro.senha, cadastro.telefone, cadastro.id]);
    });
   res.json({
        "statusCode": 200
    });
}

export async function selectCadastros(req, res) {
    openDb().then(db => {
        db.all('SELECT * FROM Cadastro')
            .then(cadastros => res.json(cadastros))
    });
}

export async function selectCadastro(req, res) {
    let id = req.body.id;
    return openDb().then(db => {
        return db.get('SELECT * FROM Cadastro WHERE id=?', [id])
            .then(cadastro => res.json(cadastro));
    });
}

export async function deleteCadastro(req, res) {
    let id = req.body.id;
    openDb().then(db => {
        db.get('DELETE FROM Cadastro WHERE id=?', [id])
            .then(res => res)
    });
    res.json({
        "statusCode": 200
    })
}