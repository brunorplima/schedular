import { Action } from "redux";
import { Note } from "../../interfaces/interfaces";


const notesReducer = (notes = [], action: Action): Note[] => {
   switch (action.type) {

      default:
         return notes;
   }
}

export default notesReducer;