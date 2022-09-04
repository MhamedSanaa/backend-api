const express = require('express');
const router = express.Router();
const ProjectController = require('../../controllers/projectController');
/* const ROLES_LIST  = require('../../config/roles_liste')
const verifyRoles = require('../../middleware/verifyRoles') */

router.route('/')
    .get(ProjectController.getAllProjects)
    .delete(ProjectController.deleteProject)
    .post(ProjectController.handleNewProject)
    .put(ProjectController.addingAnnotation)

router.route('/:id')
    .get(ProjectController.getProject);
// router.route('/:userId/:projectId')
//     .get(ProjectController.getProjectWithRole);

module.exports = router;