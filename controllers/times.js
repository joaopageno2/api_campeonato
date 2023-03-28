const database = require('./../data/database')


exports.insertPartida = (req, res, next) => {    
    const novaPartida = req.body
    const query = 'INSERT INTO Placares(id_partida, data, time_1, placar_1, placar_2, time_2) VALUES ($1, $2, $3, $4, $5, $6)'
    const values = [novaPartida.id_partida, novaPartida.data, novaPartida.time_1, novaPartida.placar_1, novaPartida.placar_2, novaPartida.time_2]

    if(!novaPartida?.time_1 || novaPartida?.time_2 == undefined) {
        res.status(404).send('Times não localizados');
    } else if (novaPartida.placar_1 == novaPartida.placar_2) {
        database.query = `UPDATE pontuacao SET empates = empates + 1 WHERE time=${novaPartida.time_1}`
        database.query = `UPDATE pontuacao SET empates = empates + 1 WHERE time=${novaPartida.time_2}`
        database.query = `UPDATE pontuacao SET pontuacao = pontuacao + 1 WHERE time=${novaPartida.time_1}`
        database.query = `UPDATE pontuacao SET pontuacao = pontuacao + 1 WHERE time=${novaPartida.time_2}`
        res.status(200).send(pontuacao)

    } else if (novaPartida.placar_1 > novaPartida.placar_2) {
        database.query = `UPDATE pontuacao SET vitoria = vitoria + 1 WHERE time=${novaPartida.time_1}`
        database.query = `UPDATE pontuacao SET derrotas = derrotas + 1 WHERE time=${novaPartida.time_2}`
        database.query = `UPDATE pontuacao SET pontuacao = pontuacao + 3 WHERE time=${novaPartida.time_1}`
        res.status(200).send(pontuacao)

    } else {
        database.query = `UPDATE pontuacao SET vitoria = vitoria + 1 WHERE time=${novaPartida.time_2}`
        database.query = `UPDATE pontuacao SET derrotas = derrotas + 1 WHERE time=${novaPartida.time_1}`
        database.query = `UPDATE pontuacao SET pontuacao = pontuacao + 3 WHERE time=${novaPartida.time_2}`
        res.status(200).send(pontuacao)
    }
    

    database.query(query, values).then(() => {
        res.status(200).send({ mensagem: 'nova partida' })
        database.query = 'SELECT * FROM Placares'
    }, (erro) => {
        res.status(500).send({ erro: erro })
    })
}


