import noteModel from '../models/noteModel.js';

export const getNotes = async (req, res) => {
   try {
      const notes = await noteModel.find();
      res.status(200).json(notes);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message });
   }
}

export const getNote = async(req, res) => {
   const { id } = req.params;

   try {
      const note = await noteModel.findById(id);
      res.status(200).json(note);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message });
   }
}

export const addNote = async (req, res) => {
   const note = new noteModel(req.body);

   try {
      const newNote = await note.save();
      res.status(200).json(newNote);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message });
   }
}

export const updateNote = async (req, res) => {
   const { id } = req.params;
   const note = req.body;

   try {
      const updatedNote = await noteModel.findByIdAndUpdate(id, note, { new: true });
      res.status(200).json(updatedNote);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message });
   }
}

export const deleteNote = async (req, res) => {
   const { id } = req.params;

   try {
      const deletedNote = await noteModel.findByIdAndDelete(id);
      res.status(200).json(deletedNote);
   } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: error.message });
   }
}