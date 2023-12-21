const express = require('express');
const register = require('../controllers/authentification/register');
const login = require('../controllers/authentification/login');
const logout = require('../controllers/authentification/logout');
const refresh = require('../controllers/authentification/refresh');
const user = require('../controllers/authentification/user');
const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/logout').post(logout);

router.route('/refresh').post(refresh);

router.route('/user').get(user);

module.exports = router;