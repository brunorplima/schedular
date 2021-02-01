import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
   dateTime: {
      type: Date,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   description: String
})

const taskModel = mongoose.model('tasks', taskSchema);

export default taskModel;