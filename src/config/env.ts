function getEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) throw new Error(`Missing "${key}" environment variable`);

    return value;
}

function getEnvArray(key: string) {
    return getEnvVar(key).split(',').map((el) => el.trim());
}

/* function getOptEnvVar(key: string, fallback = null) {
    return process.env[key] || fallback;
} */

const envConfig = () => ({
    env: getEnvVar('NODE_ENV'),

    app: {
        port: parseInt(getEnvVar('APP_PORT'), 10),
        prefix: getEnvVar('APP_PREFIX'),
        cors: {
            origins: getEnvArray('APP_CORS_ORIGINS'),
            methods: getEnvArray('APP_CORS_METHODS'),
        }
    },

    db: {
        host: getEnvVar('PG_HOST'),
        port: parseInt(getEnvVar('PG_HOST'), 10),
        user: getEnvVar('PG_USER'),
        pass: getEnvVar('PG_PASS'),
        dbName: getEnvVar('PG_DBNAME')
    }
});

export type EnvConfig = ReturnType<typeof envConfig>;
export default envConfig;
