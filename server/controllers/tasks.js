import taskModel from '../models/taskModel.js';


/**
 * Requests and returns all tasks in the tasks collection
 * 
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const getTasks = async (req, res) => {
   try {
      const tasks = await taskModel.find();
      res.status(200).json(tasks);
   } catch (error) {
      console.log(error.message);
      res.status(404).json({ error: error.message });
   }
}


/**
 * Requests and returns a specific task in the tasks collection
 * 
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const getTask = async (req, res) => {
   const { id } = req.params;

   try {
      const task = await taskModel.findById(id);
      res.status(200).json(task);
   } catch (error) {
      console.log(error.message);
      res.status(404).json({ error: error.message });
   }
}


/**
 * Adds and returns a new task into the tasks collection
 * 
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const addTask = async (req, res) => {
   const task = new taskModel(req.body);

   try {
      const newTask = await task.save();
      res.status(200).json(newTask);
   } catch (error) {
      console.log(error.message);
      res.status(404).json({ error: error.message });
   }
}


/**
 * Updates a specific task in the tasks collection and returns the its previous value
 * 
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const updateTask = async (req, res) => {
   const toBeUpdated = req.body;
   const { id } = req.params;
   
   try {
      const task = await taskModel.findByIdAndUpdate(id, toBeUpdated);
      res.status(200).json(task);
   } catch (error) {
      console.log(error.message);
      res.status(404).json({ error: error.message });
   }
}


/**
 * Deletes and returns an existing task in the tasks collection
 * 
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const deleteTask = async (req, res) => {
   const { id } = req.params;
   
   try {
      const deletedTask = await taskModel.findByIdAndDelete(id);
      res.status(200).json(deletedTask);      
   } catch (error) {
      console.log(error.message);
      res.status(404).json({ error: error.message });
   }
}