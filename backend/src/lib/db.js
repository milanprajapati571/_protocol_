// import  pkg  from 'pg';
// const {Pool} = pkg;

// const pool = new Pool({
//   host: '192.168.204.1',
//   port: 5432,
//   database: 'Employee',
//   user: 'postgres',
//   password: 'Prabhu',
//   max: 20,
//   idleTimeoutMillis: 30000,
// });

// export default pool;
import { Pool } from 'pg';

const pool = new Pool({
  host: '10.1.18.7',
  port: 5432,
  database: 'Employee',
  user: 'postgres',
  password: 'Prabhu',
  max: 20,
  idleTimeoutMillis: 30000,
});

export default pool;