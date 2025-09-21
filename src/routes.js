import { randomUUID } from 'node:crypto'
import { Database } from "./database.js";
import { buildRoutePath } from './utils/build-route-path.js';
const database = new Database()

/*
1) Query Parameters: URL Stateful => Usamos para Filtros, paginação, não obrigatorios 
  localhost/3333/users?userId=1&name=Leandro - Usamos esse tipo pra enviar informações que não são sensiveis 

2) Route Parameters: geralmente usado para identificação de recurso (exemplo usando para deletar). 
  localhost/3333/users/1
  
3) Request Body:  Envio de informações de um formulario (HTTPS) ele não fica na URL
*/

export const routes = [
  {
    method: "GET",
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query
      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null)

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };
      database.insert("users", user);
      return res.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email } = req.body

      database.update('users', id, {
        name,
        email,
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('users', id)

      return res.writeHead(204).end()
    }
  }
];
