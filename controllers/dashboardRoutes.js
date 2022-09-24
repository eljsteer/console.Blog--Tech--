const router = require('express').Router();
const { User, Posts } = require('../models');
const withAuth = require('../utils/auth');


// <<--Dashboard Routes-->>
router.get('/', withAuth, async (req, res) => {
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

// redirecting users to Dashboard once they sign up
router.get('/new', (req, res) => {
  res.render('new-post');
});

module.exports = router