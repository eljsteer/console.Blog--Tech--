// import models
const User = require('./user');
const Posts = require('./posts');
const Comments = require('./comments');

// <-- Posts Relationships -->
User.hasMany(Posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Posts.belongsTo(User, {
  foreignKey: 'user_id',
});

// Comments Relationships
User.hasMany(Comments, {
  foreignKey: 'user_id'
});

Comments.belongsTo(User, {
  foreignKey: "user_id",
})

// Posts belongToMany Comments (through BlogPostComments)
Posts.hasMany(Comments, {
  foreignKey: "post_id"
});

Comments.belongsTo(Posts, {
  foreignKey: "post_id"
});

module.exports = {
  User,
  Posts,
  Comments,
};
