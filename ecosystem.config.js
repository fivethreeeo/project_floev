module.exports = {
    apps: [{
        name: "FLOEV_CUSTOMER",
        script: "npm",
        args: "run start -- -p 3001",
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }]
}