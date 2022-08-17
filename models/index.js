// import models
const User = require('./user');
const BlogPosts = require('./blogPosts');
const Comments = require('./comments');
const BlogPostComments = require('./blogPostComments');


// BlogPosts belongsTo User
BlogPosts.belongsTo(User, {
  foreignKey: "user_id",
});

Comments.belongsTo(User, {
  foreignKey: "user_id",
})

// BlogPosts belongToMany Comments (through BlogPostComments)
BlogPosts.hasMany(Comments, {
    foreignKey: "blogPost_id",
});

module.exports = {
  User,
  BlogPosts,
  Comments,
  BlogPostComments,
};
