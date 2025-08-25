const express=require('express')
const router=express.Router();
const eventController=require('../controllers/event.controller')
const { body,validationResult } = require('express-validator')
router.post(
  '/',
  [
    body('email')
      .optional() 
      .isEmail()
      .withMessage('Must be a valid email'),
  ],
  eventController.getEvents
);

module.exports = router;
