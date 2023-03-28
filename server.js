const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const times = require('./routes/times')

const app = express();
app.use(bodyParser.json());

app.use("/time", times);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});