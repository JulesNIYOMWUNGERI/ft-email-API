module.exports = {
    HOST: "localhost",
    USER: "nshutip",
    PASSWORD: "password",
    DB: "users",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};