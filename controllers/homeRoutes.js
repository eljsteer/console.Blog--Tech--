const router = require('express').Router();
const { User, Posts } = require('../models');

// <<--HomePage Routes-->>
router.get('/', async (req, res) => {
  try {
    // Get all Posts
    const postData = await Posts.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'created_at'
      ],
      include: [
        {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ],
    });

   // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.status(200).render('homepage', { 
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//rendering one post to the single-post page
router.get('/post/:id', async (req, res) => {
  
  try {
  const postData = await Posts.findOne({
    where: { id: req.params.id },
    attributes: [ 'id', 'content', 'title', 'created_at' ],
    include: [
      {
        model: User,
        attributes: ['username']
      }, {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  });

  if (!postData) {
    res.status(404).json({ message: 'No post found with this id' });
    return;
  }

  // serialize the data
  const post = await postData.get({ plain: true });

  // pass data to template
  console.log(post);
  res.status(200).render('single-post', { post, loggedIn: req.session.loggedIn});

  } catch (err) {
    res.status(500).json(err);
  }
});

// redirect to SignUp route if user navigates to signup
router.get('/signup', (req, res) => {
  res.status(200).render('signup');
});

// redirect to login route if not logged in
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router