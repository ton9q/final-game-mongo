const express = require('express');

const router = express.Router();

const userController = require('./user.controller');

router.route('/getUsers').get(userController.getUsers);
router.route('/addUser').post(userController.addUser);
router.route('/updateUser').patch(userController.updateUser);

module.exports = router;
