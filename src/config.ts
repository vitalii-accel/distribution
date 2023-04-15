export const config = () => ({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
  mysqlPort: Number(process.env.MYSQL_PORT),
  mysqlUsername: process.env.MYSQL_USERNAME,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  mysqlDatabase: process.env.MYSQL_DATABASE,
  mysqlHost: process.env.MYSQL_HOST,
  mongodbUri: process.env.MONGODB_URI,
});
