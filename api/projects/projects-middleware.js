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

//VALIDATE BODY
async function validateBody(req, res, next) {
    const { name, description, completed } = req.body
    if (!name) {
        res.status(400).json({
        message: 'Missing required name field.'
})}
    else if (!description) {
        res.status(400).json({
        message: 'Missing required description field.'
})}
    else {
        req.name = name
        req.description = description
        req.completed = completed
        next()
        }

    }


module.exports = { validateID, validateBody}