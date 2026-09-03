const { Sequelize } = require('sequelize');
require('dotenv').config();

// Automatically switches between your cloud database string or fallback local variables
const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Required for hosted databases like Render Postgres
        }
      },
      logging: false
    })
  : new Sequelize(
      process.env.DB_NAME || 'employee_db',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || '',
      {
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
        logging: false
      }
    );

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully! 🎉');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
