// dinh tuyen 

const express = require('express');
const router = express.Router();
const profileController = require('../app/controllers/ProfileController');
const checkRegister = require('../services/checkRegister');

router.get('/create', profileController.create);
router.post('/store', checkRegister.checkRegister, profileController.store);
router.get('/information/:id', profileController.information)
router.post('/:id/delete', profileController.delete)

router.get('/:id/edit', profileController.edit);
router.post('/:id/edited', profileController.update);

router.get('/show', profileController.show);



module.exports = router;

