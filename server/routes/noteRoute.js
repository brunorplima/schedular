import express from 'express';
import {
   addNote,
   deleteNote,
   getNote,
   getNotes,
   updateNote
} from '../controllers/notes.js';

const noteRoute = express.Router();

noteRoute.get('/', getNotes);
noteRoute.get('/:id', getNote);
noteRoute.post('/', addNote);
noteRoute.patch('/:id', updateNote);
noteRoute.delete('/:id', deleteNote);

export default noteRoute;