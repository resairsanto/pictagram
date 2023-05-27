'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
    }

    get greeting() {
      const currentTime = new Date()
      const currentHour = currentTime.getHours()

      if (currentHour >= 0 && currentHour < 12) {
        return "Good morning! " + this.fullName
      } else if (currentHour >= 12 && currentHour < 18) {
        return "Good afternoon! " + this.fullName
      } else {
        return "Good evening! " + this.fullName
      }
    }

  }
  UserProfile.init({
    fullName: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    bio: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};