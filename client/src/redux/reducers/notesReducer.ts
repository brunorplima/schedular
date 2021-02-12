import { Action, Note } from "../../interfaces/interfaces";
import { GET_NOTES, ADD_NOTE } from '../constants';


const notesReducer = (notes = [], action: Action): Note[] => {
   switch (action.type) {
      case GET_NOTES:
         return action.payload;
      case ADD_NOTE:
         return [...notes, action.payload]
      default:
         return notes;
   }
}

export default notesReducer;