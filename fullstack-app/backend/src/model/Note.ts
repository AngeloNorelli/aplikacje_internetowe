import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/database";

interface NoteAttributes {
  id: number;
  userID: number;
  title: string;
  note: string;
};

interface NoteCreationAttributes extends Optional<NoteAttributes, "id"> {}

class Note extends Model<NoteAttributes, NoteCreationAttributes> implements NoteAttributes {
  public id!: number;
  public userID!: number;
  public title!: string;
  public note!: string;
};

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Note",
    tableName: "notes",
    timestamps: false,
  }
);
  
export { Note };
