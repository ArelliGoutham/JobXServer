import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 5432,
    name: process.env.DATABASE_NAME || 'jxb',
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    ssl: process.env.DATABASE_SSL_VERIFY === 'true' ? true : false,
    synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
    autoLoadEntities:
      process.env.DATABASE_AUTO_LOAD_ENTITIES === 'true' ? true : false,
  };
});
