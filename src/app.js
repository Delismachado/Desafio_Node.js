const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");


const app = express();

app.use(express.json());
app.use(cors());
app.use("/repositories/:id", doesIdExist);

//Armazenar dados em um array, este array pode ser entendido como um banco de
// dados provisório
const repositories = [];

// Esta função é u Middleware, conceito um pouco dificil de entender. Se trata 
// de um intercptador de requisições. Pode ficar entre Cliente e Servidor por exemplo
//Aqui a função será usada apenas nos métdos que possuem identificador único 

function doesIdExist(request, response, next) {
    const { id } = request.params;

    const idExists = repositories.find((repo) => repo.id === id);

    if (!idExists) {
        return response.status(400).json({ error: 'Repository not found' });
    }

    return next();
}
//Método GET - Para pegar informações
app.get("/repositories", (request, response) => {
    // TODO
    return response.json(repositories);
});
//Método POST  - Para postar /mandar informações
app.post("/repositories", (request, response) => {
    // TODO
    const { title, url, techs } = request.body;

    const repository = {
        id: uuid(),
        title,
        url,
        techs,
        likes: 0,
    };
    repositories.push(repository);

    return response.json(repository);
});
//Método PUT  - Para alterar informações

app.put("/repositories/:id", (request, response) => {
    // TODO
    const { title, url, techs } = request.body;
    const { id } = request.params;

    const repository = repositories.find((repo) => repo.id === id);
    repository.title = title;
    repository.url = url;
    repository.techs = techs;

    return response.json(repository);
});
//Método DELETE - Para deletar informações

app.delete("/repositories/:id", (request, response) => {
    // TODO
    const { id } = request.body;

    const repository = repositories.find((repo) => repo.id === id);
    repositories.pop(repository);

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    // TODO
    const { id } = request.params;

    const repository = repositories.find((repo) => repo.id === id);

    repository.likes += 1;

    return response.json(repository);


});

module.exports = app;