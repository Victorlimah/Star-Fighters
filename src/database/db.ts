import pg from 'pg';

const { Pool } = pg;

const connectionsConfig: any = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/postgres',
});

if (process.env.MODE === 'PROD') {
  connectionsConfig.ssl = {
    rejectUnauthorized: false,
  }
}

const connection = connectionsConfig;
export default connection;
