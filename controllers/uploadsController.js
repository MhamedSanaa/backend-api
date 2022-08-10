const uploadFiles = async (req, res) => {
    
    const files = req.files;
    console.log(files);
    return res.json("file uploaded");
}

module.exports = {
    uploadFiles
}