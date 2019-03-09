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

module.exports = router;
