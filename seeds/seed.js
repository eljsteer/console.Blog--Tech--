const sequelize = require('../config/connection');

const seedUsers = require('./userData.json');
const seedPosts = require('./postsData.json');
const seedComments = require('./commentsData.json');
const { User, Posts, Comments }  = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });

  for (const post of seedPosts) {
    await Posts.create({
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