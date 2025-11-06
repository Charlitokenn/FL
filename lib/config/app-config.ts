const config = {
    appDetails: {
        name: "Flow Ledger",
        supportEmail: "hello@flowledger.com",
    },
    env: {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        databaseUrl: process.env.DATABASE_URL!,
    },

}

export default config;