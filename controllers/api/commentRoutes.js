const router = require("express").Router();
const { Comments } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
  try {
      const newPost = await Comments.create({
          ...req.body,
          user_id: req.session.user_id,
          post_id: req.body.id
      });

      res.status(200).json(newPost);
  } catch (err) {
      res.status(400).json(err);
  }
});

module.exports = router;