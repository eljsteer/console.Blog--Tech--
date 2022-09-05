const router = require("express").Router();
const { Posts } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
  try {
      const newPost = await Posts.create({
          ...req.body,
          user_id: req.session.user_id
      });

      res.status(200).json(newPost);
  } catch (err) {
      res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
      const newPost = await Posts.update({
        title: req.body.title,
        content: req.body.content,
          where: {
            id: req.params.id,
          },
      });

      res.status(200).json(newPost);
  } catch (err) {
      res.status(400).json(err);
  }
});

router.delete('/:id', withAuth,async (req, res) => {
  // delete post by its `id` value
  try {
    const postData = await Posts.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!postData) {
      res.status(404).json({ message: "No Product found with this id!"});
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;