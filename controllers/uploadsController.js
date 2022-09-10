const uploadFiles =  async (req, res) => {
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

const getAllFiles =  async (req, res) => {
    try {
        const files = await gfs.files.find();
        const readStream = gfs.createReadStream(files.filename);
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
    getAllFiles,
    deleteFile
}