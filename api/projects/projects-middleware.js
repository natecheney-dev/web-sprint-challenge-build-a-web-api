//MIDDLEWARE
const yup = require('yup');
const Project = require('./projects-model');

//VALIDATE PROJECT ID
async function validateID(req, res, next) {
    try{
        const { id } = req.params
        const project = await Project.get(id)
        if(!project){
            next({status:404, message: 'User not found.'})
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
          message: 'Project not found.',
      })
}}

//VALIDATE BODY TEST 10 NOT PASSING FROM HERE
async function validateBody(req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !description) {
        res.status(400).json({
        message: 'Missing name or description.'
})}
    else {
        req.name = name
        req.description = description
        req.completed = completed
        next()
        }

    }


module.exports = { validateID, validateBody}