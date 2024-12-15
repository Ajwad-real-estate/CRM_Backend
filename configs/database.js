module.exports = {
    dialect: 'postgres',
    host: 'pg-13a033c1-crm-6fbf.k.aivencloud.com',
    port: 11859,
    username: 'avnadmin',
    password: 'AVNS_28gRRMfmLN3GKeun51e',
    database: 'defaultdb',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  };
  