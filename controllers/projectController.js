const Project = require('../model/Project');
const { listenerCount } = require('../model/User');
const User = require('../model/User');


const getAllProjects = async (req, res) => {
    const projects = await Project.find({});
    if (!projects) return res.status(204).json({ 'message': 'no platform projects found' });
    res.json(projects);
}
const getProjectUsers = async (req, res) => {
    console.log('tesssssssssss',req.query.projecID);
    const response = await Project.findById(req?.query?.projecID).populate("collabs.user");
    console.log(response);
    if (!response) return res.status(204).json({ 'message': 'no platform projects found' });
    res.json(response);
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
  
    // console.log( (new Date()).toLocaleDateString());
//    Project.update
try{
if(data.annotation){

    var query = {
        "_id":data.projectId,
        "files._id":data.fileId,

        // "files" : {"$elemMatch": {_id:mongoose.Types.ObjectId(data.fileId)}}
      };
      var updateBlock = {
        "$set": {
          "files.$.annotation": data.annotation,
          "files.$.annotatedBy": data.annotatedBy,
          "files.$.annotatedOn": (new Date()).toLocaleDateString()+" at "+(new Date()).toLocaleTimeString()
        }
      };
      await Project.findOneAndUpdate(query,updateBlock,{new : true});
      await Project.findOneAndUpdate({"_id":data.projectId,},{$inc:{na:1}},{new : true});
      res.json({"state":"success"});
}
else{
    var query = {
        "_id":data.projectId,
        "files._id":data.fileId,

        // "files" : {"$elemMatch": {_id:mongoose.Types.ObjectId(data.fileId)}}
      };
      var updateBlock = {
        "$set": {
          "files.$.validation": data.validation,
          "files.$.validatedBy": data.validatedBy,
          "files.$.validatedOn": (new Date()).toLocaleDateString()+" at "+(new Date()).toLocaleTimeString()
        }
      };
      await Project.findOneAndUpdate(query,updateBlock,{new : true});
      await Project.findOneAndUpdate({"_id":data.projectId,},{$inc:{nv:1}},{new : true});
      res.json({"state":"success"});
}
}
catch(err){
    console.log(err)
    res.json({"state":"error"});
}
    
}

const getProject = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Project ID required' });
    const project = await Project.findOne({ _id: req.params.id }).exec();
    if (!project) {
        return res.status(204).json({ 'message': `Project ID ${req.params.id} not found` });
    }
    res.json(project);
}
const getProjectWithRole = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Project ID required' });
    const project = await Project.findOne({ _id: req.params.id }).exec();
    if (!project) {
        return res.status(204).json({ 'message': `Project ID ${req.params.id} not found` });
    }
    res.json(project,req.params.userRole);
}
const getProjectFiles = async (req, res) => {
    const projects = await Project.findById(req.query.projecID).select('files');
    const files = projects.files.filter((file)=>file.validation);
    if (!projects) return res.status(204).json({ 'message': 'no platform projects found' });
    res.json(files);
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

    let data = req.body;
    // console.log(data.contentType)
    // console.log('hereeeeee');
    // console.log('data', data);
    data.files.forEach( line => {
        const ext=line.name.split('.').pop()
        console.log('ext',ext)
        if(ext==="docx"){
            line.contentType='docx'
        }
        
    });


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

        res.json(project._id);
        return project
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}

module.exports = {
    getProjectFiles,
    handleNewProject,
    getProjectUsers,
    getAllProjects,
    deleteProject,
    getProject,
    addingAnnotation,
    getProjectWithRole
}

