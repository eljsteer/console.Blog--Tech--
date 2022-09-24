const router = require("express").Router();
const { Posts, User, Comments } = require("../../models");
const withAuth = require("../../utils/auth");


// GET route to find all posts
router.get('/', async (req, res) => {
  try {
  const postsAll = await Posts.findAll({
    attributes: ['id', 'title', 'content', 'date_created'],
    order: [ ['created_at', 'DESC'] ],
    include: [
      {
          model: User, 
          attributes: ['username']
      },
      {
          model: Comment,
          attributes: ['id', 'comment_body', 'user_id', 'post_id', 'date_created'],
          include: {
              model: User,
              attributes: ['username']
          }
      }
    ]
  })

  const postData = postsAll.map((posts) => posts.get({ plain: true }));

  res.status(200).json(postData)

  } catch (err) {
    res.status(400||500).json(err);
  }
});

// GET route to comments with specific id
router.get('/:id', async (req, res) => {
  try {
    const postsbyID = await Posts.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'content', 'created_at'], 
      include: [
          {
              model: User, 
              attributes: ['username']
          }, 
          {
              model: Comment, 
              attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
              include: {
                  model: User, 
                  attributes: ['username']
              }
          }
      ]
    });

    if (!postsbyID) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    };
    
    const postData = postsbyID.map((posts) => posts.get({ plain: true }));

    res.status(200).json(postData);

  } catch (err) {
    res.status(400||500).json(err);
  }
});

//  POST route to create new Console.Blog(Post)
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Posts.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//  PUT route to update existing Console.Blog(Post)
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Posts.update({
      title: req.body.title,
      content: req.body.content,
        where: {
          id: req.params.id,
        },
    });

    if (!updatePost) {
      res.status(404).json({ message: 'No post found with this Id' });
      return;
    }

    res.status(200).json(updatePost);
  } catch (err) {
      res.status(400).json(err);
  }
});


router.delete('/:id', withAuth,async (req, res) => {
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