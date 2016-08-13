import Post from '../models/post_model';
import sortByCreatedAt from '../includes/quicksort_posts.js';

const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags, content: post.content, author: post.author };
  });
};

const cleanPost = (post) => {
  return { id: post._id, title: post.title, tags: post.tags, content: post.content, author: post.author };
};

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.author = req.user._id;
  post.save()
    .then(result => {
      res.json({ message: 'Post Created!' });
    })
    .catch(error => {
      res.json({ error });
    });
};

export const getPosts = (req, res) => {
  Post.find()
    .then(posts => {
      sortByCreatedAt(posts, 0, posts.length - 1);

      res.json(cleanPosts(posts));
    });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
    .populate('author')
    .then(post => {
      console.log(post.author);
      res.json(cleanPost(post));
    });
};

export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id })
    .then(() => {
      res.json('Deleted');
    });
};

export const updatePost = (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id }, { title: req.body.title, tags: req.body.tags, content: req.body.content })
    .then(() => {
      res.json('Updated');
    });
};
