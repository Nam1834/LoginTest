import Redis from "ioredis";

const redisURL = process.env.REDIS_URL || "localhost:6379";

const redisInstance = new Redis(redisURL);

export default redisInstance;
