const sequelize = require('../config/connection');

const seedUsers = require('./userData.json');
const seedPosts = require('./postsData.json');
const seedComments = require('./commentsData.json');
const { User, BlogPosts, Comments }  = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });

  for (const post of seedPosts) {
    await BlogPosts.create({
      ...post,
    });
  }
  for (const comment of seedComments) {
    await Comments.create({
      ...comment,
    })
  }

  process.exit(0);
};

seedDatabase();