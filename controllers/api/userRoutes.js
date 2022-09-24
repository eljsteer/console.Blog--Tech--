const router = require('express').Router();
const { User } = require('../../models');

// GET route for all users
router.get('/', async (req, res) => {
  try {
    const usersAll = await User.findAll({
        attributes: { exclude: [ 'password' ] }
    })

    const userData = usersAll.map((users) => users.get({ plain: true }));
    res.status(200).json(userData);

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// GET route for a retrieving a single user
router.get('/:id', async (req, res) => {
  try {
    const userbyID = await User.findOne({
      attributes: { exclude: [ 'password' ] },
      where: { id: req.params.id },
      include: [
          {
              model: PermissionStatus, 
              attributes: ['id', 'title', 'content', 'date_created']
          },
          {
              model: Comments, 
              attributes: ['id', 'comment_text', 'date_created'],
              include: {
                  model: Posts, 
                  attributes: ['title'],
              }
          }, 
          {
              model: Posts, 
              attributes: ['title']
          }
      ]
  })
    if (!userbyID) {
        res.status(404).json({ message: 'No user found with this Id'});
        return;
    }

    res.status(200).json(deleteComment);
  
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});


// POST route for creating user on Signup
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.name,
      password: req.body.password
    });

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// PUT route for updating single user 
router.put('/:id', async (req, res) => {
  try {
    const userUpdate = await User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    });

    if (!userUpdate[0]) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const userData  = userUpdate.map((user) => user.get({ plain: true }));

    res.status(200).json(userData);
    
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// DELETE route for deleting single user
router.delete('/:id', async (req, res) => {
  try {
    const userDelete = await User.destroy({
      where: { id: req.params.id }
    })
  
    if (!userDelete) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(dbUserData);

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// POST route for user Login
router.post('/login', async (req, res) => {
    try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.email = userData.email;
    req.session.logged_in = true;

    res.json({ user: userData, message: 'You are now logged in!' });
    });

    } catch (err) {
    res.status(400).json(err);
    }
});

// POST route for User Logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
        res.render("homepage");
    });
    } else {
    res.status(404).end();
    }
});

module.exports = router;