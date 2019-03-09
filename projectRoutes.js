const express = require('express');
const db = require('./data/helpers/projectModel');
const router = express.Router();

router.use(express.json());

router.get('/projects', (req, res) => {
  db.get()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({error: 'The data could not be retrieved!'});
    });
});

router.get('/projects/:project_id', (req, res) => {
  const { project_id } = req.params;

  db.getProjectActions(project_id)
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({error: 'The data could not be retrieved!'});
    });
});

router.post('/projects', (req, res) => {
  const { name, description } = req.body;

  if(!name || !description){
    res.status(400).json({errorMessage: 'Please provide a description and name for the project'});
  } else {
    db.insert({ name, description })
      .then(projects => {
        res.status(201).json(projects);
      }).catch(err => {
        res.status(500).json({error: 'There was an error while saving to the database.'});
      });
  }
});

router.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if(!name || !description) {
    res.status(400).json({errorMessage: 'Please provide a description and name for the project'});
  } else {
    db.update(id, { name, description })
      .then(projects => {
        if(projects){
          res.status(200).json(projects);
        }else{
          res.status(404).json(null)
        }
      }).catch(err => {
        res.status(500).json({error: 'The projects information could not be modified.'})
      });
  }
});

router.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(projects =>{
      if(projects){
        res.json(projects);
      }else{
        res.status(404).json({message: 'The project with the specified ID does not exist.'})
      }
    }).catch(err => {
      res.status(500).json({error: 'The project could not be removed'})
    });
});


module.exports = router;
