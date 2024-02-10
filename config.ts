export default {
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: parseInt(process.env.PORT as string, 10),
  
   
    db: {
      DB_HOST: process.env.postgres as string,
      DB_USER: process.env.postgres as string,
      DB_PASS: process.env.Annu as any,
      DB_NAME: process.env.library as string,
      dialect: "postgres",
  
     
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },

    auth: {
      secret: "our-secret-key" as string
    }
  };
  