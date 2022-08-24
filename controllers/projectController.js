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

module.exports = {
    getAllProjects,
    deleteProject,
    getProject
}

module.exports = {
    getAllProjects,
    deleteProject,
    getProject
}