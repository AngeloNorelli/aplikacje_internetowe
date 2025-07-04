import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/database";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  theme?: "dark" | "light";
  font_size?: "small" | "medium" | "large";
  language?: "pl" | "en";
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public theme?: "dark" | "light";
  public font_size?: "small" | "medium" | "large";
  public language?: "pl" | "en";
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    theme: {
      type: DataTypes.ENUM("dark", "light"),
      defaultValue: "dark",
    },
    font_size: {
      type: DataTypes.ENUM("small", "medium", "large"),
      defaultValue: "large",
    },
    language: {
      type: DataTypes.ENUM("pl", "en"),
      defaultValue: "en",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: false,
  }
);

export { User };