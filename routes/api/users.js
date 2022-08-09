const express = require('express');
const router = express.Router();
const UsersController = require('../../controllers/usersController');
/* const ROLES_LIST  = require('../../config/roles_liste')
const verifyRoles = require('../../middleware/verifyRoles') */

router.route('/')
    .get(UsersController.getAllUsers)
    .delete(UsersController.deleteUser);

router.route('/:id')
    .get(UsersController.getUser);

module.exports = router;