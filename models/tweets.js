module.exports = function(sequelize, DataTypes) {
  var Tweet = sequelize.define("Tweet", {
    text: DataTypes.TEXT,
    followers: DataTypes.INTEGER,
    profile: DataTypes.STRING,
    username: DataTypes.STRING,
    trend: DataTypes.STRING,
    location: DataTypes.STRING,
    retweets: DataTypes.INTEGER,
    favorites: DataTypes.INTEGER
  });
  return Tweet;
};
