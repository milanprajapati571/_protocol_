// databaseOperations.js
import pool from './db.js'; // Or however you import your pool

async function getUserByEmail(email) {
  try {
    const result = await pool.query(
      'SELECT user_id, fullname, email, password, profile_pic FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

// ... other database operation functions ...

// Check for the export statement
export { getUserByEmail }; // This is the key line!

// Or if it's the default export:
// export default getUserByEmail;
// import pool from './db.js';

// async function getUserByUsername(username) {
//   try {
//     const result = await pool.query(
//       'SELECT user_id, username, password, role FROM employees WHERE username = $1', // Assuming your hashed password is in the 'password' column
//       [username]
//     );
//     return result.rows[0];
//   } catch (error) {
//     console.error('Error fetching user by username:', error);
//     throw error;
//   }
// }

// export { getUserByUsername };