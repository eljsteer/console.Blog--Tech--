const router = require("express").Router();
const { Comments } = require("../../models");
const withAuth = require("../../utils/auth");

// GET route to find all comments
router.get('/', async (req, res) => {
  try {
  const commentsAll = await Comments.findAll({})

  const commentData = commentsAll.map((comments) => comments.get({ plain: true }));

  res.status(200).json(commentData)

  } catch (err) {
    res.status(400||500).json(err);
  }
});

// GET route to comments with specific id
router.get('/:id', async (req, res) => {
  try {
    const commentbyID = await Comments.findAll({
      where: { id: req.params.id }
    });
    const commentData = await commentbyID(commentData => res.json(commentData));

    return commentData;

  } catch (err) {
    res.status(400||500).json(err);
  }
});

// GET route to post comments
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
      comment_body: req.body.comment_body,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400||500).json(err);
  }
});

// Put route to update comment text
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updateComment = await Comments.update({
      comment_body: req.body.comment_body,
    }, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updateComment);
  } catch (err) {
    res.status(400||500).json(err);
  }
});

// Delete route to destroy comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteComment = await Comments.destroy({
      comment_body: req.body.comment_body,
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(commentData => {
      if (!commentData) {
          res.status(404).json({ message: 'No comment found with this id' });
          return;
      }
    })
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400||500).json(err);
  }
});

module.exports = router;