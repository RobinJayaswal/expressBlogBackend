import mongoose, { Schema } from 'mongoose';

const TagSchema = new Schema({
  title: { type: String, unique: true },
});

// create model class
const TagModel = mongoose.model('Tag', TagSchema);

export default TagModel;
