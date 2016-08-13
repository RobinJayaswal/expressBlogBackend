import User from '../models/user_model';
import jwt from 'jwt-simple';
// import config from '../config.js';
import dotenv from 'dotenv';


dotenv.config({ silent: true });


// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.API_SECRET);
}

export const signin = (req, res, next) => {
  console.log('signing in!');
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => { // eslint-disable-line consistent-return
  console.log('in signup');
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password || !username) {
    return res.status(422).send('You must provide email, username and password');
  }

  // 🚀 TODO:
  // here you should do a mongo query to find if a user already exists with this email.
  // if user exists then return an error. If not, use the User model to create a new user.
  // Save the new User object
  // this is similar to how you created a Post
  // and then return a token same as you did in in signin

  let userExists = false;
  User.findOne({ email })
    .then((post) => {
      if (post) {
        console.log('user exists!');
        userExists = true;
      }
    });

  if (userExists) {
    console.log('Sending 422');
    return res.status(422).send('User with email already exists');
  }

  const user = new User();
  user.email = email;
  user.password = password;
  user.username = username;
  user.save()
    .then(() => {
      res.send({ token: tokenForUser(user) });
    });
};
