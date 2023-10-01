import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URI,
  saltRound: process.env.SALTROUNDS,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  access_token_expirein: process.env.ACCESS_TOKEN_EXPIRE_IN,
  refresh_token_secret: process.env.REFREASH_TOKEN_SECRET,
  refresh_token_expirein: process.env.REFRESH_TOKEN_EXPIRE_IN,
};
