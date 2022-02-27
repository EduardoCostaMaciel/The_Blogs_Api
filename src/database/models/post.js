module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
    tableName: 'Posts',
  });

  Post.associate = (models) => {
    models.Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Post;
};