const express = require('express');
const db = require('./data/helpers/actionModel');
const router = express.Router();

router.use(express.json());

router.get('/actions', (req, res) => {
  db.get()
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      res.status(500).json({error: 'The data could not be retrieved!'});
    });
});

router.post('/actions/:project_id', (req, res) => {
  const { project_id } = req.params;
  const { description, notes, completed } = req.body;

  if(!description || !notes){
    res.status(400).json({errorMessage: 'Please provide a description and additional notes for the action'});
  } else {
    db.insert({ project_id, description, notes, completed})
      .then(actions => {
        res.status(201).json(actions);
      }).catch(err => {
        res.status(500).json({error: 'There was an error while saving to the database.'});
      });
  }
});

router.put('/actions/:id', (req, res) => {
  const { id } = req.params;
  const { description, notes, completed } = req.body;

  if(!description || !notes) {
    res.status(400).json({errorMessage: 'Please provide a description and additional notes for the action'});
  } else {
    db.update(id, { description, notes, completed})
      .then(actions => {
        if(actions){
          res.status(200).json(actions);
        }else{
          res.status(404).json(null)
        }
      }).catch(err => {
        res.status(500).json({error: 'The post information could not be modified.'})
      });
  }
});

router.delete('/actions/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(actions =>{
      if(actions){
        res.json(actions);
      }else{
        res.status(404).json({message: 'The action with the specified ID does not exist.'})
      }
    }).catch(err => {
      res.status(500).json({error: 'The action could not be removed'})
    });
});

module.exports = router;
