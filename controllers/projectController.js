const Project = require('../model/Project');
const { listenerCount } = require('../model/User');
const User = require('../model/User');


const getAllProjects = async (req, res) => {
    const projects = await Project.find({});
    if (!projects) return res.status(204).json({ 'message': 'no platform projects found' });
    res.json(projects);
}
const getProjectByOwner = async (req, res) => {
    const projects = await Project.find({ owner: req });
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


const addingAnnotation = async (req, res) => {
    const data = req.body
  
    console.log( (new Date()).toLocaleDateString());
//    Project.update

    var query = {
        "_id":data.projectId,
        "files._id":data.fileId,

        // "files" : {"$elemMatch": {_id:mongoose.Types.ObjectId(data.fileId)}}
      };
      var updateBlock = {
        "$set": {
          "files.$.annotation": data.annotation,
          "files.$.annotatedBy": data.annotator,
          "files.$.annotatedOn": (new Date()).toLocaleDateString()
        }
      };
      await Project.findOneAndUpdate(query,updateBlock,{new : true});
    
}

const getProject = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Project ID required' });
    const project = await Project.findOne({ _id: req.params.id }).exec();
    if (!project) {
        return res.status(204).json({ 'message': `Project ID ${req.params.id} not found` });
    }
    res.json(project);
}


const addUserToProject = async (projectId, userId, userRole) => {


    return Project.findByIdAndUpdate(
        projectId,
        // {$push : {collabs : userId}},

        // {$push : {collabs : userId,role:'userRole'}},
        { $push: { collabs: { user: userId, role: userRole } } },
        { new: true, useFindAndModify: false }
    )

}
const addProjectToUser = async (projectId, userId, userRole) => {


    return User.findByIdAndUpdate(
        userId,
        // {$push : {projects :  projectId}},
        { $push: { projects: { project: projectId, role: userRole } } },
        { new: true, useFindAndModify: false }
    )

}

const handleNewProject = async (req, res) => {

    const data = req.body;
    console.log('hereeeeee');
    console.log('data', data);


    try {

        const project = await Project.create({
            owner: data.owner,
            title: data.title,
            type: data.type,
            files: data.files,
            // collabs:data.collabs,
        })

        data.collabs.map((user) => {
            addUserToProject(project.id, user.id, user.role);
            addProjectToUser(project.id, user.id, user.role);

        });
        addUserToProject(project.id, data.owner, "supervisor");
        addProjectToUser(project.id, data.owner, "supervisor");

        res.json(project);
        return project
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}

module.exports = {
    handleNewProject,
    getAllProjects,
    deleteProject,
    getProject,
    addingAnnotation
}

