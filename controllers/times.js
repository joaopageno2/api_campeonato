const database = require('./../data/database')

exports.inserirTimeEquipePontuacao = (req, res, next) => {    
    const novoQuarto = req.body
    const query = 'INSERT INTO Quartos(Num, num_vagas, disponivel, total_hospedes) VALUES ($1, $2, $3, $4)'
    const values = [novoQuarto.Num, novoQuarto.num_vagas, novoQuarto.disponivel, novoQuarto.total_hospedes]

    database.query(query, values).then(() => {
        res.status(200).send({ mensagem: 'Quarto cadastrado' })
        database.query = 'SELECT * FROM Quartos'
    }, (erro) => {
        res.status(500).send({ erro: erro })
    })
}