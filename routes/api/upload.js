const express = require('express');
const router = express.Router();
const uploadsController = require('../../controllers/uploadsController');
const fileUpload = require('express');

router.route('/')
    .post(/*fileUpload({createParentPath: true}),*/uploadsController.uploadFiles);

module.exports = router;