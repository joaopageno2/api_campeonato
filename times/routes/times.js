const express = require('express');
const router = express.Router();
const controller = require('./../controllers/times')

router.get('/times', controller.retornaTimes);
router.get('/partidas', controller.retornaPartidas);
router.get('/partidas/time', controller.retornaPartidasTime);
router.get('/pontuacao', controller.retornaPontuacao);
router.get('/placar', controller.retornaPartidasPlacar);
router.post('/insert', controller.inserirTimeEquipePontuacao);
router.delete('/delete/:id', controller.deletarPartida);
router.put('/atualizar', controller.atualizarPlacar);
router.post('/insert/partida', controller.insertPartida);

module.exports = router;