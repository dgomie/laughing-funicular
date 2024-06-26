const connection = require('../config/connection');
const { User } = require('../models');
const { getRandomName } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thought' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thought');
    }

    let userCheck = await connection.db.listCollections({ name: 'user' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('user');
    }
  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {

    const username = getRandomName();
    const email = `${username}@gmail.com`

    users.push({
      username,
      email,
    });
  }

  // Add users to the collection and await the results
  const userData = await User.insertMany(users);


  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
