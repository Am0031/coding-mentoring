const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../config/connection");

const { hashPassword } = require("../hooks");

class Mentor extends Model {
  getUser() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      email: this.email,
      location: this.location,
      availability: this.availability,
      teachingFormat: this.teachingFormat,
      personalGoal: this.personalGoal,
      profileImageUrl: this.profileImageUrl,
      gitHubUrl: this.gitHubUrl,
      linkedInUrl: this.linkedInUrl,
      portfolioUrl: this.portfolioUrl,
    };
  }

  async checkPassword(password) {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  }
}

Mentor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
        unique: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        unique: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teachingFormat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personalGoal: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profileImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    gitHubUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "mentor",
    hooks: {
      beforeCreate: hashPassword,
    },
  }
);

module.exports = Mentor;
