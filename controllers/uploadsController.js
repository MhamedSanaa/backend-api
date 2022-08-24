const uploadFiles =  async (req, res) => {
    // console.log(req);
    console.log(req.files);
    if (req.files === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8080/file/${req.files.filename}`;
    return res.send(imgUrl);
}

const getFile =  async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
}

const deleteFile = async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
}

module.exports = {
    uploadFiles,
    getFile,
    deleteFile
}