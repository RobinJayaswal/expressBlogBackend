import Post from '../models/post_model';
import Tag from '../models/tag_model';
import sortByCreatedAt from '../includes/quicksort_posts.js';

const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags, content: post.content, author: post.author };
  });
};

const cleanPost = (post) => {
  return { id: post._id, title: post.title, tags: post.tags, content: post.content, author: post.author };
};

const updateTags = (tags) => {
  tags.forEach(tag => {
    Tag.findOne({ title: tag })
      .then((foundTag) => {
        if (!foundTag) {
          const newTag = new Tag();
          newTag.title = tag;
          newTag.save()
            .then(result => {
            });
        }
      });
  });
};

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags.toLowerCase().split(' ');
  post.content = req.body.content;
  post.author = req.user._id;
  post.save()
    .then(result => {
      updateTags(post.tags);
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

      if (req.query.tagsFilter) {
        posts = posts.filter(post => { // eslint-disable-line no-param-reassign
          return post.tags.indexOf(req.query.tagsFilter) > -1;
        });
      }

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
  Post.findOneAndUpdate({ _id: req.params.id }, { title: req.body.title, tags: req.body.tags.toLowerCase().split(' '), content: req.body.content })
    .then(() => {
      updateTags(req.body.tags.toLowerCase().split(' '));
      res.json('Updated');
    });
};
