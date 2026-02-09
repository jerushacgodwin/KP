const events=require('../services/event.services')
const {validationResult,body}=require('express-validator')
module.exports.getEvents=async(req,res,next)=>{
     
     const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

    const { email, role, user_id } = req.body || {};
        const result= await events.getEventList(email || null, role, user_id);
    res.status(200).json({
      message: 'Event fetched successfully',
      events: result,
    });
  
  
}

module.exports.createEvent = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const eventData = req.body;
  // 
  try {
    const result = await events.createEvent(eventData);
    res.status(201).json({
      message: 'Event created successfully',
      event: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteEvent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await events.deleteEvent(id);
    if (!result) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({
      message: 'Event deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};