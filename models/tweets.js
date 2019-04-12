module.exports = function(sequelize, DataTypes) {
  var Tweet = sequelize.define("Example", {
    text: DataTypes.TEXT,
    replies: DataTypes.INTEGER,
    profile: DataTypes.STRING,
    username: DataTypes.STRING,
    trend: DataTypes.STRING,
    location: DataTypes.STRING,
    retweets: DataTypes.INTEGER,
    favorites: DataTypes.INTEGER
  });
  return Tweet;
};
