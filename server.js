const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/sugestao", (req, res) => {
    const { nome, ingredientes } = req.query;
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Sugestão Recebida!</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <div class="container">
                <h1>Obrigado pela sua sugestão!</h1>
                <p>Recebemos a sua ideia de lanche e vamos analisá-la com carinho.</p>
                <h2>Dados da sua sugestão:</h2>
                <p><strong>Nome do Lanche:</strong> ${nome}</p>
                <p><strong>Ingredientes:</strong> ${ingredientes}</p>
                <div class="nav-links">
                   <a href="/">Fazer outra sugestão</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.get("/contato", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "contato.html"));
});

app.post("/contato", (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Contato Recebido</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <div class="container">
                <h1>Contato Recebido com Sucesso!</h1>
                <p>Olá, ${nome}. Agradecemos por sua mensagem!</p>
                <h2>Detalhes do seu contato:</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Assunto:</strong> ${assunto}</p>
                <p><strong>Mensagem:</strong> ${mensagem}</p>
                 <div class="nav-links">
                   <a href="/">Voltar para a Página Inicial</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.get("/api/lanches", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "data", "lanches.json"));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
