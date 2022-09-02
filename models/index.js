// import models
const User = require('./user');
const BlogPosts = require('./blogPosts');
const Comments = require('./comments');

// <-- BlogPosts Relationships -->
User.hasMany(BlogPosts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

BlogPosts.belongsTo(User, {
  foreignKey: 'user_id',
});

BlogPosts.hasOne(User, {
  foreignKey: 'user_id',
});

// Comments Relationships
User.hasMany(Comments, {
  foreignKey: 'user_id'
});

Comments.belongsTo(User, {
  foreignKey: "user_id",
})

// BlogPosts belongToMany Comments (through BlogPostComments)
BlogPosts.hasMany(Comments, {
  foreignKey: "blogPost_id"
});

Comments.belongsTo(BlogPosts, {
  foreignKey: "blogPost_id"
});

module.exports = {
  User,
  BlogPosts,
  Comments,
};
