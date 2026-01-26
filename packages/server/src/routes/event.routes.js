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

router.post(
  '/create',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('event_time').notEmpty().withMessage('Event time is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  eventController.createEvent
);

router.delete('/:id', eventController.deleteEvent);

module.exports = router;
