import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | null = null;

/**
 * Get or create Redis client instance
 * Uses singleton pattern to reuse connection
 */
export async function getRedisClient() {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  const url = process.env.REDIS_URL || 'redis://localhost:6379';
  
  redisClient = createClient({
    url,
  });

  redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
  });

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  return redisClient;
}

/**
 * Check if a fingerprint hash exists in Redis
 * @param fingerprintHash - SHA-256 hash of the fingerprint
 * @returns true if exists, false otherwise
 */
export async function checkFingerprintExists(fingerprintHash: string): Promise<boolean> {
  try {
    const client = await getRedisClient();
    const exists = await client.exists(`vote:${fingerprintHash}`);
    return exists === 1;
  } catch (error) {
    console.error('Error checking fingerprint in Redis:', error);
    // If Redis fails, we'll check in database instead
    return false;
  }
}

/**
 * Store fingerprint hash in Redis with expiration
 * @param fingerprintHash - SHA-256 hash of the fingerprint
 * @param expirationSeconds - TTL in seconds (default: 30 days)
 */
export async function storeFingerprint(
  fingerprintHash: string,
  expirationSeconds: number = 30 * 24 * 60 * 60 // 30 days
): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.setEx(`vote:${fingerprintHash}`, expirationSeconds, '1');
  } catch (error) {
    console.error('Error storing fingerprint in Redis:', error);
    // Continue even if Redis fails - database will be the source of truth
  }
}

/**
 * Close Redis connection (useful for cleanup)
 */
export async function closeRedisConnection(): Promise<void> {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit();
    redisClient = null;
  }
}
