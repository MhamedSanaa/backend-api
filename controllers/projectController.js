const Project = require('../model/Project')

const getAllProjects = async (req, res) => {
    const projects = await Project.find({});
    if (!projects) return res.status(204).json({ 'message': 'no platform projects found' });
    res.json(projects);
}

const deleteProject = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'Project ID required' });
    const project = await Project.findOne({ _id: req.body.id }).exec();
    if (!project) {
        return res.status(204).json({ 'message': `Project ID ${req.body.id} not found` });
    }
    const result = await Project.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getProject = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Project ID required' });
    const project = await Project.findOne({ _id: req.params.id }).exec();
    if (!project) {
        return res.status(204).json({ 'message': `Project ID ${req.params.id} not found` });
    }
    res.json(project);
}

const handleNewProject = async (req, res)=>{

    const data=req.body;
    // console.log('req', req);
    // console.log('req body : ',req.body);

    try{
     const project = await Project.create({
        owner:'changeMe',
        title:data.projectTitle,
        type:data.projectType,
        files:data.projectFiles,
        collabs:data.projectUsers,
     })
    //  console.log(project);
     return project
    }
    catch(err){
        console.log(err);
        return undefined;
    }
}

module.exports = {
    handleNewProject,
    getAllProjects,
    deleteProject,
    getProject
}

// module.exports = {
//     getAllProjects,
//     deleteProject,
//     getProject
// }