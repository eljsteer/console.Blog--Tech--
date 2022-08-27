const sequelize = require('../config/connection');

const seedPosts = require('./postsData.json');

const Posts = require('../models/blogPosts');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const post = await Posts.bulkCreate(seedPosts, {
    returning: true,
  });

  for (const post of seedPosts) {
    await Posts.create({
      ...post,
    });
  }

  process.exit(0);
};

seedDatabase();