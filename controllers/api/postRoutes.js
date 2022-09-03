const router = require("express").Router();
const { BlogPosts } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
  try {
      const newPost = await BlogPosts.create({
          ...req.body,
          user_id: req.session.user_id,
          blogPost_id: req.body.id
      });

      res.status(200).json(newPost);
  } catch (err) {
      res.status(400).json(err);
  }
});

module.exports = router;