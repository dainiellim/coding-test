'use strict';

const express = require('express');
const router = express.Router();
const userProfileController = require('../src/controllers/userProfile.controller');
const { showUserProfileValidation, updateUserProfileValidation, createUserProfileValidation } = require('../src/requests/userProfile.validation');
const handleValidationErrors = require('../src/middleware/validationHandler');

const profiles = [
  {
    "id": 1,
    "name": "A Martinez",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png",
  }
];

module.exports = function () {

  router.get('/', function (req, res, next) {
    res.render('profile_template', {
      profile: profiles[0],
    });
  });


  router.post('/api/users',
    createUserProfileValidation,
    handleValidationErrors,
    userProfileController.store
  );
  router.get('/api/users',
    userProfileController.index
  );
  router.get('/api/users/:id',
    showUserProfileValidation,
    handleValidationErrors,
    userProfileController.show
  );
  router.put('/api/users/:id',
    updateUserProfileValidation,
    handleValidationErrors,
    userProfileController.update
  );

  return router;
}

