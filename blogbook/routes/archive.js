const express = require('express');
const router = express.Router();
const config = require('../config');
const modelPost = require('./../models/post');

/* GET archive. */
router.get('/:page', function (req, res, next) {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const perPage = config.PER_PAGE;
  const page = req.params.page || 1;

  modelPost.find({}).skip(perPage*page - perPage)
  .limit(perPage)
  .then(posts => {
    modelPost
  })
  
});

module.exports = router;
