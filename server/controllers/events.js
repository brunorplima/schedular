import eventModel from '../models/eventModel.js';

/**
 * Requests and returns all events in the events collection
 * 
 * @param {*} req The request object
 * @param {*} res The response object
 */
export async function getEvents(req, res) {
   try {
      const events = await eventModel.find();
      events.forEach(event => event.dateTime = new Date(event.dateTime));
      res.status(200).json(events);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message })
   }
}


/**
 * Requests and returns a specific event in the events collection
 * 
 * @param {*} req The request object
 * @param {*} res The response object
 */
export async function getEvent(req, res) {
   const { id } = req.params;
   try {
      const event = await eventModel.findById(id);
      res.status(202).json(event);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message })
   }
}


/**
 * Adds and returns a new event into the events collection
 * 
 * @param {*} req The request object
 * @param {*} res The response object
 */
export async function addEvent(req, res) {
   const event = req.body;
   const newEvent = new eventModel(event);
   try {
      const savedEvent = await newEvent.save();
      res.status(200).json(savedEvent);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message })
   }
}


/**
 * Updates a specific event in the events collection and returns its previous value
 * 
 * @param {*} req The request object
 * @param {*} res The response object
 */
export async function updateEvent(req, res) {
   const { id } = req.params;
   const updatedEventInfo = req.body;

   try {
      const event = await eventModel.findByIdAndUpdate(id, updatedEventInfo, { new: true });
      res.status(200).json(event);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message });
   }
}


/**
 * Deletes and returns an existing event in the events collection
 * 
 * @param {*} req The request object
 * @param {*} res The response object
 */
export async function deleteEvent(req, res) {
   const { id } = req.params;
   
   try {
      const deletedEvent = await eventModel.findByIdAndDelete(id);
      res.status(200).json(deletedEvent);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message });
   }
}