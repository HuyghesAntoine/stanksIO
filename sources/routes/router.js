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
// Waiting the action /connexion from connexion.html to call the function sign_in
router.post('/connexion', userController.sign_in)
// GET connexion.html page
router.get('/connexion', function(req, res, next) {
  res.sendFile('html/connexion.html', { root: __public });
});
// Waiting the action /inscription from inscription.html to call the function register
router.post('/inscription', userController.register)
// Get inscription.html page
router.get('/inscription', function(req, res, next) {
  res.sendFile('html/inscription.html', { root: __public });
});
module.exports = router;
