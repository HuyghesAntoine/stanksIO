const express = require('express');
const path = require('path');

const __public = path.join(__dirname, '../../public');

/**
 * Router.
 */

const router = express.Router();

const userController = require('../../controller/userController.js');

// GET home.html page.
router.get('/', function(req, res, next) {
  res.sendFile('html/index.html', { root: __public });
});
// GET game.html page.
router.get('/game', function(req, res, next) {
  res.sendFile('html/game.html', { root: __public });
});
// GET controls.html page.
router.get('/controls', function(req, res, next) {
  res.sendFile('html/controls.html', { root: __public });
});
// GET controls.html page.
router.get('/shop', function(req, res, next) {
  res.sendFile('html/shop.html', { root: __public });
});
// GET connexion.html page
router.post('/connexion', userController.sign_in)
router.get('/connexion', function(req, res, next) {
  res.sendFile('html/connexion.html', { root: __public });
});
// Get inscription.html page
router.post('/inscription', userController.register)
router.get('/inscription', function(req, res, next) {
  res.sendFile('html/inscription.html', { root: __public });
});
module.exports = router;
