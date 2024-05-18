var express = require('express');
const router = express.Router();

const chatController = require('../app/controllers/chatController');

router.get('/:id', chatController.chat); // tinh chat cua route la match tu tren xuong match den dau thi dung o do

module.exports = router;