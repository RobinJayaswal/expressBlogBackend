import Tag from '../models/tag_model';

export const searchTags = (req, res) => {
  console.log('Searching for ' + req.query.query);
  Tag.find({ title: { $regex: `.*${req.query.query}.*` } })
    .limit(15)
    .select('title')
    .then(tags => {
      console.log('found tags' + tags[0]);

      res.json(tags);
    });
};
