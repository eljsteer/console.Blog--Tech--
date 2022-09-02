// const router = require('express').Router();
// const { User, BlogPosts ,Comments } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//   try {
//     // Get all Movies that have the attribute upcoming or newRelease, also JOIN with user data
//     const { Op } = require("sequelize")
//     const postsData = await BlogPosts.findAll({
//       where: {
//         [Op.or]: [
//           { display: "upcoming" }, 
//           { display: "newRelease" }
//         ],
//       }
//     });

//    // Serialize data so the template can read it
//     const movies = movieData.map((movie) => movie.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       movies, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });