const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class BlogPostComments extends Model {}

BlogPostComments.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    blogPost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "blogPosts",
        key: "id",
        unique: false
      }
    },
    comments_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "comments",
        key: "id",
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = BlogPostComments;
