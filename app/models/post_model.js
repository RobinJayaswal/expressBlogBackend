import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  tags: String,
  content: String,
}, {
  timestamps: true,
});

// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
