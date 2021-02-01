import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventSchema = new Schema({
   dateTime: {
      type: Date,
      required: true
   },
   reminder: {
      type: new Schema({
         dateTime: {
            type: Date,
            required: true
         },
         description: String
      }),
      required: false
   },
   name: {
      type: String,
      required: true
   },
   guests: String,
   location: String,
   description: String
});

const eventModel = mongoose.model('events', eventSchema);

export default eventModel;