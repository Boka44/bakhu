const env = process.env;;

module.exports = {
    APP_NAME: 'Bakhu',
    mongoDb: {
        db: env.db,
        connectionString: env.connectionString,
        user: env.user,
        password: env.password
    },
    client: 'http://localhost:3000/',
    sessionTokenExpiry: 604800 // 7 days * 24 hours * 60 mins * 60 secs.,
};