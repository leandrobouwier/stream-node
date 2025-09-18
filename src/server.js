import http from "node:http";
import { json } from "./middleware/json.js";

// - Criar usuários
// - Listagem usuários
// - Edição de usuários
// - Remoção de usuários

// - HTTP
//   - Método HTTP
//   - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários no banc-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless
// A diferença é que a Stateful sempre vai ter algum tipo de informação sendo guardado em memoria,
// a aplicação ela depende da meoria  - Enquanto a Stateless ela n salva nada em memoria, ela salva em Banco de dados,
// arquivos de texto, os dados e arquivos vai se manter igual.

// Cabeçalhos (Requisição/resposta) => Metadados

//middleware - nada mais é que um interceptador - um interceptador no node é uma função que ela vai interceptar nossa
// requisição. São faceis de ser reconhecido porque sempre receberam "req" e "res"

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req,res)


  if (method === "GET" && url === "/users") {
    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body

    users.push({
      id: 1,
      name,
      email
    });
    //
    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
