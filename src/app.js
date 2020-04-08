const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  repository = { id: uuid(), title: title, url: url, techs: techs, likes: 0 }

  repositories.push(repository);

  return response.status(201).json(repository);
  
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  console.log(id);

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if ( repositoryIndex < 0 ){
    return response.status(400).json({ error: 'Nenhum repositorio foi encontrado com esse ID.' });
  }

  repositories[repositoryIndex].likes = repositories[repositoryIndex].likes + 1;

  console.log(repositories[repositoryIndex]);

  return response.status(200).json(repositories[repositoryIndex]);
})

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;
  const likes = 0;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if ( repositoryIndex < 0 ){
    return response.status(400).json({ error: 'Nenhum repositorio foi encontrado com esse ID.' });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositoryIndex] = repository;

  return response.status(200).json(repository);
  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if ( repositoryIndex < 0 ){
    return response.status(400).json({ error: 'Nenhum repositorio foi encontrado com esse ID.' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

module.exports = app;
