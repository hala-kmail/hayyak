import { Pool } from 'pg';

let pool: Pool | null = null;

/**
 * Get or create PostgreSQL connection pool
 * Uses singleton pattern to reuse connections
 */
export function getDbPool(): Pool {
  if (pool) {
    return pool;
  }

  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'hayyak',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
  });

  return pool;
}

/**
 * Initialize database schema (create tables if they don't exist)
 * Should be called once at application startup
 */
export async function initializeDatabase(): Promise<void> {
  const pool = getDbPool();

  try {
    // Create votes table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        town_id VARCHAR(255) NOT NULL,
        fingerprint_hash VARCHAR(64) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes if they don't exist
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_fingerprint_hash ON votes(fingerprint_hash)
    `).catch(() => {
      // Index might already exist, ignore error
    });

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_town_id ON votes(town_id)
    `).catch(() => {
      // Index might already exist, ignore error
    });

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_created_at ON votes(created_at)
    `).catch(() => {
      // Index might already exist, ignore error
    });

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

/**
 * Check if a fingerprint hash exists in the database
 * @param fingerprintHash - SHA-256 hash of the fingerprint
 * @returns true if exists, false otherwise
 */
export async function checkFingerprintInDb(fingerprintHash: string): Promise<boolean> {
  const pool = getDbPool();

  try {
    const result = await pool.query(
      'SELECT 1 FROM votes WHERE fingerprint_hash = $1 LIMIT 1',
      [fingerprintHash]
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error checking fingerprint in database:', error);
    throw error;
  }
}

/**
 * Store a vote in the database
 * @param townId - ID of the town/neighborhood being voted for
 * @param fingerprintHash - SHA-256 hash of the fingerprint
 */
export async function storeVote(townId: string, fingerprintHash: string): Promise<void> {
  const pool = getDbPool();

  try {
    await pool.query(
      'INSERT INTO votes (town_id, fingerprint_hash) VALUES ($1, $2)',
      [townId, fingerprintHash]
    );
  } catch (error: any) {
    // Check if it's a unique constraint violation
    if (error.code === '23505') {
      // PostgreSQL unique violation error code
      throw new Error('DUPLICATE_VOTE');
    }
    console.error('Error storing vote in database:', error);
    throw error;
  }
}

/**
 * Get vote count for a specific town
 * @param townId - ID of the town/neighborhood
 * @returns vote count
 */
export async function getVoteCount(townId: string): Promise<number> {
  const pool = getDbPool();

  try {
    const result = await pool.query(
      'SELECT COUNT(*) as count FROM votes WHERE town_id = $1',
      [townId]
    );
    return parseInt(result.rows[0].count, 10);
  } catch (error) {
    console.error('Error getting vote count:', error);
    throw error;
  }
}

/**
 * Get total vote count across all towns
 * @returns total vote count
 */
export async function getTotalVoteCount(): Promise<number> {
  const pool = getDbPool();

  try {
    const result = await pool.query('SELECT COUNT(*) as count FROM votes');
    return parseInt(result.rows[0].count, 10);
  } catch (error) {
    console.error('Error getting total vote count:', error);
    throw error;
  }
}
