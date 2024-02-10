import config from "../config/config";
import { Sequelize, DataTypes, Op } from "sequelize";

// Create Sequelize instance
const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: 'postgres',
    pool: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle
    }
  }
);

// Define types for the db object
interface Db {
  Sequelize: typeof Sequelize;
  Op: typeof Op;
  sequelize: Sequelize;
  books: any; // Replace 'any' with the type of your book model
  user: any; // Replace 'any' with the type of your user model
  role: any; // Replace 'any' with the type of your role model
  ROLES: string[];
  userID: any; // Define the type for userID if necessary
}

// Define and export db object
export const db: Db = {
  Sequelize,
  Op,
  sequelize,
  books: require("./book.model")(sequelize, Sequelize, DataTypes),
  user: require("./user.model")(sequelize, Sequelize, DataTypes),
  role: require("./role.model")(sequelize, Sequelize, DataTypes),
  ROLES: ["user", "admin", "moderator"],
  userID: null // Initialize userID if necessary
};

// Define associations between user and role models
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id"
});

export default db;
