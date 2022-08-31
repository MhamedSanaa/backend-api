const Project = require('../model/Project');
const User = require('../model/User');

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


const addUserToProject = async(projectId,userId,userRole) =>{
    
   
    return Project.findByIdAndUpdate(
        projectId,
        // {$push : {collabs : userId}},
        
        // {$push : {collabs : userId,role:'userRole'}},
        {$push : {collabs : {user : userId,role : userRole}}},
        {new : true, useFindAndModify: false}
    )

}

const handleNewProject = async (req, res)=>{

    const data=req.body;
    console.log('hereeeeee');
    console.log(data);
    // console.log('req', req);
    // console.log('req body : ',req.body);

    try{
     const project = await Project.create({
        owner:data.owner,
        title:data.title,
        type:data.type,
        files:data.files,
        // collabs:data.collabs,
     })

     data.collabs.map((user)=> { addUserToProject(project.id,user.id,user.role)});
   
    //  console.log('project id : ',project.id);

    // addUserToProject(project.id,)

        // const project = new Project();
        // project.owner=req.body.owner;
        // project.title=req.body.title;
        // project.type=req.body.type;
        // project.files=req.body.files;
        // project.collabs=req.body.collabs;

        // console.log(project);

        
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