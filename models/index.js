// import models
const User = require('./user');
const BlogPosts = require('./blogPosts');
const Comments = require('./comments');
const BlogPostComments = require('./blogPostComments');


// BlogPosts belongsTo User
BlogPosts.belongsTo(User, {
  foreignKey: "user_id",
});

// Users have many BlogPosts
User.hasMany(BlogPosts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Comments belongToMany BlogPosts (through BlogPostComments)
Comments.belongsToMany(BlogPosts, {
  through: {
    model: BlogPostComments,
    unique: true
  }
});

// BlogPosts belongToMany Comments (through BlogPostComments)
BlogPosts.belongsToMany(Comments, {
  through: {
    model: BlogPostComments,
    unique: true
  }
});

module.exports = {
  User,
  BlogPosts,
  Comments,
  BlogPostComments,
};
