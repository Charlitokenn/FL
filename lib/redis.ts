import { Redis } from '@upstash/redis';
import config from './config/app-config';

const redisUrl = config.env.upstashRedisUrl;
const redisToken = config.env.upstashRedisToken;

if (!redisUrl || !redisToken) {
  throw new Error('Missing Upstash Redis configuration');
}

export const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});

// Cache TTL in seconds (24 hours)
export const TENANT_CACHE_TTL = 86400;
