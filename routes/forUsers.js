

const express = require('express');

const userController = require('../controllers/forUsers');

const router = express.Router();

router.post('/add-users', userController.postAddUser )

router.get('/get-users', userController.getUser )

router.delete('/delete-users/:id', userController.deleteUser)

module.exports = router;