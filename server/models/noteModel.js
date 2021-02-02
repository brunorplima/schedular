import mongoose from 'mongoose';

const { Schema } = mongoose;

const noteSchema = new Schema({
   date: {
      type: Date,
      required: true
   },
   title: String,
   text: {
      type: String,
      required: true
   }
});

const noteModel = mongoose.model('notes', noteSchema);

export default noteModel;