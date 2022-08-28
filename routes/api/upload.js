const upload = require("../../middleware/upload");
const express = require("express");
const router = express.Router();
const UploadsController = require('../../controllers/uploadsController');

router.post("/upload", upload.array("file",10),UploadsController.uploadFiles);

router.get("/:filename",UploadsController.getFile);

router.get("/getFiles",UploadsController.getAllFiles);

router.delete("/:filename", UploadsController.deleteFile);

module.exports = router;
