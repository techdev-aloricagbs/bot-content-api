const debug = require('debug')('sql');
const chalk = require('chalk');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
var config = require('./config/database')[env];

console.log(chalk.yellow(`Opening database connection to ${config.database}`));
config['logging'] = debug;

// create the database instance
const db = module.exports = new Sequelize(config.database, config.username, config.password, config);

// pull in our models
require('./models');

// sync the db, creating it if necessary
function sync(retries=0, maxRetries=5) {
  return db.sync({force:false})
    .then(ok => console.log(`Synced models to db`))
    .catch(fail => {
      console.log(fail)
    })
}

db.didSync = sync();