/* import { createServer } from 'node:http'

const server = createServer((request, response) => {
  console.log('oiawdwd');

  return response.end();
});

server.listen(3333); */


import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
// const database = new DatabaseMemory();
const database = new DatabasePostgres;

// endpoints
server.get('/videos', async (request, reply) => {
  const search = request.query.search;
  const videos = await database.read(search);
  return videos;
});

server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body;

  console.log(request.body);

  await database.create({
    title: title,
    description: description,
    duration: duration
  });

  // 201 significa que algo foi criado
  return reply.status(201).send();
});

server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;
  
  const alteracoes = {
    title: title,
    description: description,
    duration: duration
  }
  await database.update(videoId, alteracoes);

  // 204 significa que tem uma resposta mas que não tem um conteúdo nessa resposta
  return reply.status(204);
});

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;
  await database.delete(videoId);

  // 204 significa que tem uma resposta mas que não tem um conteúdo nessa resposta
  return reply.status(204).send();
});

server.listen({
  port: process.env.PORT ?? 3333,
})