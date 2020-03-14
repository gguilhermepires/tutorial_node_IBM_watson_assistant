const express = require('express');
const controller = require('../controllers/usuario');
const router = express.Router();

router.get('/',controller.getIndex);
router.post('/entrar',controller.entrar);
router.get('/entrar',controller.entrar);
router.get('/principal',controller.principal);

module.exports = router;