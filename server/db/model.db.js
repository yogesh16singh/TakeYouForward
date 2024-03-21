import { Sequelize } from "sequelize";

import dotenv from "dotenv";
dotenv.config();

// Create a new Sequelize instance to connect to ElephantSQL
export const sequelize = new Sequelize(
  process.env.ELEPHANT_SQL_USERNAME,
  process.env.ELEPHANT_SQL_USERNAME,
  process.env.ELEPHANT_SQL_PASSWORD,
  {
    host: "flora.db.elephantsql.com", // Replace with your actual ElephantSQL host
    dialect: "postgres" // Specify the dialect as 'postgres' for PostgreSQL
  }
);

// Define a Sequelize model representing the "data" table
const Data = sequelize.define("data", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING
  },
  preferredLanguage: {
    type: Sequelize.ENUM("cpp", "java", "javascript", "python")
  },
  sourceCode: {
    type: Sequelize.TEXT
  },
  stdin: {
    type: Sequelize.TEXT
  }
});

// (async () => {
//   try {
//     await sequelize.sync();
//     console.log("Table created successfully!");
//   } catch (error) {
//     console.error("Error creating table:", error);
//   }
// })();

export default Data;
