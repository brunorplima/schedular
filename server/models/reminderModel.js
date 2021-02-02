import mongoose from 'mongoose';

const { Schema } = mongoose;

const reminderSchema = new Schema({
   dateTime: { 
      type: Date,
      required: true
   },
   subject: {
      type: String,
      required: true
   },
   description: String,
   repeat: {
      type: [String],
      enum: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
   }
})

const reminderModel = mongoose.model('reminders', reminderSchema);

export default reminderModel;