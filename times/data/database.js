const pg = require('pg')

const database = new pg.Client('postgres://piahmcsm:QlwmYc_BpRcZf8QmgfSbmlTmuwfiH5RI@babar.db.elephantsql.com/piahmcsm')

database.connect((erro) => {
    if (erro) {
        return console.log('Não foi possível se conectar ao ElephantSQL')
    } else {
        return console.log('Conectado ao ElephantSQL')
    }
})

module.exports = database