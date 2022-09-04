const router = require('express').Router();
const { User, Posts ,Comments } = require('../models');
const withAuth = require('../utils/auth');

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

// <<--Dashboard Routes-->>
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const user = userData.get({ plain: true });

    const postData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: { exlude: ['password'] },
        },
      ],
      where: {
        user_id: req.session.user_id,
      },
      order: [
        ["date_created","DESC"]
      ],
    });
    
  // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)
  // display data to Dashboard
    res.status(200).render('dashboard', {
      user,
      posts,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    console.log(err)
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