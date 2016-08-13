import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  username: { type: String, unique: true },
  password: String,
});

// create model class
UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.pre('save', function preSave(next) { // eslint-disable-line consistent-return
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;

  // if password has not been changed or is not new, then do nothing
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => { // eslint-disable-line consistent-return
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      return next();
    });
  });

  // when done run the next callback with no arguments
  // call next with an error if you encounter one
  // return next();
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => { // eslint-disable-line consistent-return
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
