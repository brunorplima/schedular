import reminderModel from '../models/reminderModel.js';


export const getReminders = async (req, res) => {
   try {
      const reminders = await reminderModel.find();
      res.status(200).json(reminders);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message });
   }
}

export const getReminder = async (req, res) => {
   const { id } = req.params;

   try {
      const reminder = await reminderModel.findById(id);
      res.status(200).json(reminder);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message });
   }
}

export const addReminder = async (req, res) => {
   const reminder = new reminderModel(req.body);

   try {
      const addedReminder = await reminder.save();
      res.status(200).json(addedReminder);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message });
   }
}

export const updateReminder = async (req, res) => {
   const { id } = req.params;

   try {
      const updatedReminder = await reminderModel.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedReminder);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message });
   }
}

export const deleteReminder = async (req, res) => {
   const { id } = req.params;

   try {
      const deletedReminder = await reminderModel.findByIdAndDelete(id);
      res.status(200).json(deletedReminder);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message });
   }
}