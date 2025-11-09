const config = {
    appDetails: {
        name: "Flow Ledger",
        supportEmail: "hello@flowledger.com",
    },
    env: {
        clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
        clerkSecretKey: process.env.CLERK_SECRET_KEY!,
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        databaseUrl: process.env.DATABASE_URL!,
        upstashRedisUrl: process.env.UPSTASH_REDIS_REST_URL!,
        upstashRedisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
    },

}

export default config;