const database = require('./../data/database')

exports.retornaTimes = (req, res, next) => {

    database.query('SELECT * FROM times').then((resultado) => {
        res.status(200).send({ times: resultado.rows })
    }, (erro) => {
        res.status(500).send({ erro: erro })
    })
}

exports.retornaPartidas = (req, res, next) => {    
    database.query('SELECT * FROM placares').then((resultado) => {
        res.status(200).send({ placares: resultado.rows })
    }, (erro) => {
        res.status(500).send({ erro: erro })
    })
}

exports.retornaPartidasTime = (req, res, next) => {  
    const nomeTime = req.body
    const query = `SELECT * FROM placares WHERE id=${nomeTime}`

    database.query(query, [nomeTime]).then(() => {
        res.status(200).send({ placares: resultado.rows })
    }, (erro) => {
        res.status(500).send({ erro: erro })
    })
}

exports.retornaPontuacao = (req, res, next) => {  
    const Pontu = req.body  
    const query = `SELECT * FROM pontuacao ORDER BY pontuacao= ${Pontu} DESC`

    database.query(query, [Pontu]).then(() => {
        res.status(200).send({ pontuacao: resultado.rows  })
    }, (erro) => {
        res.status(500).send({ erro: erro })
    })
}

exports.retornaPartidasPlacar = (req, res, next) => {    
    const placaDec = req.body
    const timeNom = req.body    
    const query = `SELECT * FROM placares ORDER BY ${timeNom}= ${placaDec} DESC`

    database.query(query, [placaDec]).then(() => {
        res.status(200).send({ placar: resultado.rows  })
    }, (erro) => {
        res.status(500).send({ erro: erro })
    })
}

exports.inserirTimeEquipePontuacao = (req, res, next) => {    
    const novoTime = req.body
    const query = 'INSERT INTO Times(id, nome) VALUES ($1, $2); INSERT INTO pontuacao(nome, vitorias, empates, derrotas, pontuacao) VALUES ($1, $3, $4, $5, $6)'
    const values = [novoTime.id, novoTime.nome, novoTime.vitorias, novoTime.empates, novoTime.derrotas, novoTime.pontuacao]

    database.query(query, values).then(() => {
        res.status(200).send({ mensagem: 'Time inserido!' })
        database.query = 'SELECT * FROM times'
        database.query = 'SELECT * FROM pontuacao'
    }, (erro) => {
        res.status(500).send({ erro: erro })
    })
}

exports.atualizarPlacar = (req, res, next) => {    
    const altPlacar = req.body
    const placarnome = req.body
    const newPlacar = req.body  
    const query = `UPDATE placares SET ${placarnome} = ${newPlacar} WHERE id_partida=${altPlacar}`

    database.query(query, [altPlacar]).then(() => {
        res.status(200).send({ placar: resultado.rows  })
    }, (erro) => {
        res.status(500).send({ erro: erro })
    })
}

exports.deletarPartida = (req, res, next) => {    
    const deletePart = req.params.id  
    const query = 'DELETE FROM placares WHERE placares_id=$1'

    database.query(query, [deletePart]).then(() => {
        res.status(200).send({ placar: resultado.rows  })
    }, (erro) => {
        res.status(500).send({ erro: erro })
    })
}

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


