const express = require('express');
const db = require('../db/model.js');
const router = express.Router();

router
  .route('/:userid')
  .get((req, res, next) => {
    db.findOne(+req.params.userid)
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(500);
      });
  })
  .post((req, res, next) => {
    db.insertOne(req.body)
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(500);
      });
  })
  .put((req, res, next) => {
    db.updateOne(req.body)
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(500);
      });
  })
  .options((req, res) => {
    res.sendStatus(200);
  });

module.exports = router;
