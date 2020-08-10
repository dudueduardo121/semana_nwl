import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(3333);




// Rotas http:localhost:3333
// Recursos  http:localhost:3333/users

//GET: Buscar informação listar
//POST: Criar alguma informação
//PUT: Atualizar informação
//DELETE: Deletar informação

// orpo (request, body) dados para criação ou atualização de um registro
//route params: Identificar qual recurso atualizar ou deletar
//query params: paginação, filtros, ordenação

// vai ouvir a requisição e a porta localhost:3333/users


