const router = require('express').Router();
const { User, Posts } = require('../models');

// <<--HomePage Routes-->>
router.get('/', async (req, res) => {
  try {
    // Get all Movies that have the attribute upcoming or newRelease, also JOIN with user data
    const postData = await Posts.findAll({
      include: [User],
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